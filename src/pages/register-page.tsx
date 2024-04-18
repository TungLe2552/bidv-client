/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBackEndUrl } from "@/constant";
import { handleError } from "@/constant/handle-error";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  let faceioInstance: any = null;
  const backEndUrl = getBackEndUrl();
  const navigate = useNavigate();
  const [isFaceId, setIsFaceId] = useState(false);
  const [form] = Form.useForm();
  const faceRegistration = useCallback(async () => {
    const dataSubmit = form.getFieldsValue();
    const validate = await form.validateFields();
    if (!validate) {
      return;
    }
    try {
      await faceioInstance.enroll({
        locale: "auto",
        payload: {
          email: dataSubmit.email,
        },
      });
      await axios.post(`${backEndUrl}/api/register`, dataSubmit);
      form.resetFields();
      navigate("/login");
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  }, [faceioInstance]);
  const createUser = async () => {
    const dataSubmit = form.getFieldsValue();
    const validate = await form.validateFields();
    if (!validate) {
      return;
    }
    try {
      await axios.post(`${backEndUrl}/api/register`, dataSubmit);
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const faceIoScript = document.createElement("script");
    faceIoScript.src = "//cdn.faceio.net/fio.js";
    faceIoScript.async = true;
    faceIoScript.onload = () => faceIoScriptLoaded();
    document.body.appendChild(faceIoScript);
    return () => {
      document.body.removeChild(faceIoScript);
    };
  }, []);
  const faceIoScriptLoaded = () => {
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO("fioa4c05");
    }
  };

  return (
    <div className="w-full h-full flex items-center registed">
      <div className="w-[500px] h-fit border rounded-lg p-4 mx-auto bg-white">
        <h2 className="text-center font-semibold text-[20px]">
          Chào mừng Quý khách đến với dịch vụ đăng ký SmartBanking
        </h2>
        <Form form={form} layout="vertical">
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            name="user_name"
            label="Tên"
            className="!mb-4"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            name="email"
            label="Email"
            className="!mb-4"
          >
            <Input type="email"></Input>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            hasFeedback
            name="password"
            label="Mật khẩu"
            className="!mb-4"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            className="!mb-4"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("mật khẩu xác nhận không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item className="!mb-4">
            <Checkbox
              defaultChecked={isFaceId}
              onChange={(e) => {
                setIsFaceId(e.target.checked);
              }}
            >
              Đăng ký nhận diện khuôn mặt
            </Checkbox>
          </Form.Item>
          {/* <Form.Item tooltip="Vui lòng nhớ  mã bảo mật, sẽ cần thiết khi xác nhận giao dịch" name="pin" label="Mã bảo mật" rules={[{ required: true, message: 'Vui lòng nhập mã bảo mật'}]}>
            <InputNumber min={4} max={4}></InputNumber>
          </Form.Item> */}
          <div className="flex gap-4 w-full">
            <Form.Item className="w-full !mb-0">
              <Button className="w-full" color="error">
                Huỷ
              </Button>
            </Form.Item>
            <Form.Item className="w-full !mb-0">
              <Button
                type="primary"
                className="w-full"
                onClick={() => {
                  isFaceId ? faceRegistration() : createUser();
                }}
              >
                Xác nhận
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
