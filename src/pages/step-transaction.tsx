/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Select, Steps } from "antd";
import { FC, useEffect, useState } from "react";

interface Props {
  onCancel?: () => void;
}
const StepTransaction: FC<Props> = ({ onCancel }) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [dataSubmit, setDataSubmit] = useState({
    transaction_type: "Chuyển tiền",
    bank_name: undefined,
    account_number: undefined,
    value: undefined,
    postage: "Người chuyển trả",
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

  return (
    <div>
      <Steps current={current} items={items} />
      <div className="pt-6">{steps[current].content}</div>
      <div className="mt-8 flex gap-4">
        <Button type="primary" onClick={() => next()}>
          Huỷ
        </Button>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              console.log(1);
            }}
          >
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
              { label: "Chuyển tiền", value: "Chuyển tiền" },
              { label: "thanh toán tiền điện", value: "thanh toán tiền điện" },
              { label: "Mua hàng", value: "Mua hàng" },
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
            disabled={initData.transaction_type !== "Chuyển tiền"}
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
          <Input
            type="number"
            onChange={(e) => {
              getData({ value: e.target.value });
            }}
            placeholder="Nhập số tiền cần chuyển"
            className="w-full"
          ></Input>
        </Form.Item>
        <Form.Item className="!mb-4" name="postage" label="Phí giao dịch">
          <Select
            onChange={(e) => {
              getData({ postage: e.target.value });
            }}
            options={[
              { label: "Người chuyển trả", value: "Người chuyển trả" },
              { label: "Người nhận trả", value: "Người nhận trả" },
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
  console.log(data);
  
  const name: any = {
    transaction_type: "Loại giao dịch",
    bank_name: "Ngân hàng",
    account_number: "Số tài khoản",
    value: "Số tiền",
    postage: "Phí giao dịch",
    note: "Ghi chú",
  };
  return (
    <>
      {Object.keys(data).map((key: any) => {
        return (
          <div>
            <span>{name[key]}</span>: <span>{data[key]}</span>
          </div>
        );
      })}
    </>
  );
};
