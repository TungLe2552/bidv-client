import { getBackEndUrl } from "@/constant";
import { handleError } from "@/constant/handle-error";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  let faceioInstance: any = null;
  const backEndUrl = getBackEndUrl();
  const navigate = useNavigate();
  
  const [show, setShow] = useState(false);
  const [form] = Form.useForm()
  const faceRegistration = useCallback(async () => {
    const dataSubmit = form.getFieldsValue()
    const validate = await form.validateFields();
    if(!validate){
      return
    }
    try {
      setShow(false)
      await faceioInstance.enroll({
        locale: "auto",
        payload: {
          email: dataSubmit.email,
        },
      });
      await axios.post(`${backEndUrl}/api/register`, dataSubmit);
      form.resetFields()
      navigate('/login')
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
    }
  },[faceioInstance]) 
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
  const handleCancel = ()=>{
    setShow(false)
    form.resetFields()
  }
  const faceIoScriptLoaded = () => {
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO("fioa4c05");
    }
  };

  return (
    <div className="w-full h-full flex items-center">
      <div className="w-[500px] h-fit border rounded-lg p-4 mx-auto">
        <h2 className="text-center">Đăng kí nhận diện</h2>
        <Button type="primary" className="my-4 w-full" onClick={()=>setShow(true)}>
          Đăng kí
        </Button>
      </div>
      <Modal closeIcon={false} centered open={show} footer={<></>} onCancel={handleCancel}>
        <Form form={form} layout="vertical" >
          <Form.Item rules={[{ required: true, message: 'Vui lòng nhập tên!' }]} name="user_name" label="Tên">
            <Input></Input>
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input></Input>
          </Form.Item>
          <Form.Item name="password" label="Mật khẩu">
            <Input></Input>
          </Form.Item>
          <Form.Item name="pin" label="Mã bảo mật">
            <Input></Input>
          </Form.Item>
          <div className="flex gap-4 w-full">
            <Form.Item className="w-full !mb-0">
              <Button className="w-full" color="error" onClick={handleCancel}>
                Huỷ
              </Button>
            </Form.Item>
            <Form.Item className="w-full !mb-0">
              <Button type="primary" className="w-full" onClick={faceRegistration}>Xác nhận</Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterPage;
