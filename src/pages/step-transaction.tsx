/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, InputNumber, Select, Steps } from "antd";
import { FC, useEffect, useState } from "react";

interface Props {
  onCancel?: () => void;
}
const StepTransaction: FC<Props> = ({ onCancel }) => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [dataSubmit, setDataSubmit] = useState({
    bank_name: undefined,
    account_number: undefined,
    value: undefined,
    postage: 1,
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
      content: "Last-content",
    },
  ];
  const items = steps.map((item: any) => ({
    key: item.title,
    title: item.title,
  }));
  const next = () => {
    setCurrent(current + 1);
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
        <Form.Item className="!mb-4" name="bank_name" label="Ngân hàng">
          <Select
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
        <Form.Item className="!mb-4" name="account_number" label="Số tài khoản">
          <InputNumber
            onChange={(value) => {
              getData({ account_number: value });
            }}
            className="w-full"
            placeholder="Nhập số tài khoản hưởng thụ"
          ></InputNumber>
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
        <Form.Item className="!mb-4" name="value" label="Số tiền">
          <InputNumber
            onChange={(value) => {
              getData({ value: value });
            }}
            placeholder="Nhập số tiền cần chuyển"
            className="w-full"
          ></InputNumber>
        </Form.Item>
        <Form.Item className="!mb-4" name="postage" label="Phí giao dịch">
          <Select
            onChange={(value) => {
              getData({ postage: value });
            }}
            defaultValue={1}
            options={[
              { label: "Người chuyển trả", value: 1 },
              { label: "Người nhận trả", value: 2 },
            ]}
          ></Select>
        </Form.Item>
        <Form.Item className="!mb-4" name="note" label="Ghi chú">
          <Input.TextArea
            rows={1}
            onChange={(value) => {
              getData({ note: value });
            }}
          ></Input.TextArea>
        </Form.Item>
      </Form>
    </>
  );
};
// const Step3:FC<{data:any}> = ({data})=>{
//     return <></>
// }