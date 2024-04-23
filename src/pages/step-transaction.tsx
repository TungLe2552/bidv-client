/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBackEndUrl } from "@/constant";
import { Button, Form, Input, InputNumber, Select, Steps, Tag } from "antd";
import axios from "axios";
import { FC, useEffect, useState } from "react";

interface Props {
  onCancel?: () => void;
}
const StepTransaction: FC<Props> = ({ onCancel }) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const backEndUrl = getBackEndUrl();
  const [errMess, setErrMess] = useState(undefined);
  const token = localStorage.getItem('token')
  const [dataSubmit, setDataSubmit] = useState({
    transaction_type: "Chuyen tien",
    bank_name: undefined,
    account_number: undefined,
    value: undefined,
    postage: "Nguoi chuyen tra",
    note: undefined,
  });

  const steps: any = [
    {
      title: "First",
      content: (
        <Step1
          initData={dataSubmit}
          form={form}
          getData={(value: any) =>
            setDataSubmit((prev) => ({ ...prev, ...value }))
          }
        />
      ),
    },
    {
      title: "Second",
      content: (
        <Step2
          form={form}
          initData={dataSubmit}
          getData={(value: any) =>
            setDataSubmit((prev) => ({ ...prev, ...value }))
          }
        />
      ),
    },
    {
      title: "Last",
      content: <Step3 data={dataSubmit} />,
    },
  ];
  const items = steps.map((item: any) => ({
    key: item.title,
    title: item.title,
  }));
  const next = async () => {
    const validate = await form.validateFields();
    if (validate) {
      setCurrent(current + 1);
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const transaction = async () => {
    {
      const res = await axios.post(`${backEndUrl}/api/transaction`, dataSubmit,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
  };
  return (
    <div>
      <Steps current={current} items={items} />
      <div className="pt-6 min-h-[20rem]">
        {steps[current].content}
        <div className=" max-w-[600px] mx-auto mt-4">
          {Object.keys(steps).length - 1 === current ? (
            <Form layout="vertical" className="flex gap-2 items-center">
              <Form.Item
                className="!mb-4 w-full"
                name="otp_code"
                label="Mã OTP"
              >
                <Input></Input>
              </Form.Item>
            </Form>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-2 justify-end">
        <Button type="primary" onClick={() => next()}>
          Huỷ
        </Button>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => transaction()}>
            Xác nhận
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepTransaction;

const Step1: FC<{
  getData: (value: any) => void;
  initData: any;
  form: any;
}> = ({ getData, initData, form }) => {
  useEffect(() => {
    form.setFieldsValue(initData);
  }, []);

  return (
    <>
      <Form layout="vertical" form={form}>
        <Form.Item
          className="!mb-4"
          name="transaction_type"
          label="Loại thanh toán"
        >
          <Select
            onChange={(value) => {
              getData({ transaction_type: value });
            }}
            options={[
              { label: "Chuyển tiền", value: "Chuyen tien" },
              { label: "Thanh toán tiền điện", value: "Thanh toan tien dien" },
              { label: "Mua hàng", value: "Mua hang" },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item
          className="!mb-4"
          name="bank_name"
          label="Ngân hàng"
          rules={[
            { required: true, message: "Vui lòng chọn ngân hàng để tiếp tục" },
          ]}
        >
          <Select
            disabled={initData.transaction_type !== "Chuyen tien"}
            placeholder="Chọn ngân hàng"
            onChange={(value) => {
              getData({ bank_name: value });
            }}
            options={[
              { label: "AGRIBANK", value: "AGRIBANK" },
              { label: "BIDV", value: "BIDV" },
              { label: "VIETINBANK", value: "VIETINBANK" },
              { label: "VIETCOMBANK", value: "VIETCOMBANK" },
              { label: "TPBANK", value: "TPBANK" },
            ]}
          ></Select>
        </Form.Item>
      </Form>
    </>
  );
};
const Step2: FC<{
  getData: (value: any) => void;
  initData: any;
  form: any;
}> = ({ getData, initData, form }) => {
  useEffect(() => {
    form.setFieldsValue(initData);
  }, []);
  return (
    <>
      <Form form={form} layout="vertical">
        <Form.Item
          className="!mb-4"
          name="account_number"
          label="Số tài khoản"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số tài khoản để tiếp tục",
            },
          ]}
        >
          <Input
            type="number"
            onChange={(e) => {
              getData({ account_number: e.target.value });
            }}
            className="w-full"
            placeholder="Nhập số tài khoản hưởng thụ"
          ></Input>
        </Form.Item>
        <Form.Item
          className="!mb-4"
          name="value"
          label="Số tiền"
          
          rules={[
            { required: true, message: "Vui lòng nhập số tiền để tiếp tục" },
          ]}
        >
          <InputNumber
            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            min={1000}
            onChange={(value) => {
              getData({ value: value });
            }}
            placeholder="Nhập số tiền cần chuyển"
            className="w-full"
          ></InputNumber>
        </Form.Item>
        <Form.Item className="!mb-4" name="postage" label="Phí giao dịch">
          <Select
            onChange={(e) => {
              getData({ postage: e.target.value });
            }}
            options={[
              { label: "Người chuyển trả", value: "Nguoi chuyen tra" },
              { label: "Người nhận trả", value: "Nguoi nhan tra" },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item className="!mb-4" name="note" label="Ghi chú">
          <Input.TextArea
            rows={1}
            onChange={(e) => {
              getData({ note: e.target.value });
            }}
          ></Input.TextArea>
        </Form.Item>
      </Form>
    </>
  );
};
const Step3: FC<{ data: any }> = ({ data }) => {
  if (!data) return <></>;
  const name: any = {
    transaction_type: "Loại giao dịch",
    bank_name: "Ngân hàng",
    account_number: "Số tài khoản",
    value: "Số tiền",
    postage: "Phí giao dịch",
    note: "Ghi chú",
  };
  const transaction_type_item: any = {
    "Chuyen tien": "Chuyển tiền",
    "Thanh toan tien dien": "Thanh toán tiền điện",
    "Mua hang": "Mua hang",
  };
  const postage_item: any = {
    "Nguoi chuyen tra": "Người chuyển trả",
    "Nguoi nhan tra": "Người nhận trả",
  };
  return (
    <div className=" flex flex-col gap-4 border-[1px] border-[#bdbdbd] p-4 rounded-lg max-w-[600px] mx-auto">
      {Object.keys(data).map((key: any) => {
        if (key === "postage") {
          return (
            <div className="">
              <span>{name[key]}</span>: <span>{postage_item[data[key]]}</span>
            </div>
          );
        }
        if(key === 'value'){
          return <div className="">
            <span>{name[key]}</span>: <span>{Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.value)}</span>
          </div>
        }
        if (key === "transaction_type") {
          return (
            <div className="">
              <span>{name[key]}</span>:{" "}
              <span>{transaction_type_item[data[key]]}</span>
            </div>
          );
        } else {
          return (
            <div className="">
              <span>{name[key]}</span>: <span>{data[key]}</span>
            </div>
          );
        }
      })}
    </div>
  );
};
