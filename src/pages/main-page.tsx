import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBackEndUrl } from "@/constant";
const MainPage = () => {
  const backEndUrl = getBackEndUrl();

  const [show, setShow] = useState(false);
  const [userInfo,setUserInfo] = useState<any>({})
  const user = localStorage.getItem('user');
  
  const getData = async(params:unknown)=>{
    const res = await axios.post(`${backEndUrl}/api/info`,params)
    setUserInfo(res.data.data)
    
  }
  useEffect(()=>{
    if(user){
      getData({email:user})
    }
  },[user])


  const [form] = Form.useForm();
  const handelCancel = () => {
    setShow(false);
    form.resetFields();
  };
  return (
    <div className="p-4 h-full overflow-hidden">
      <header>
        <Card>
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Avatar size={64} icon={<UserOutlined />} />
              <span>{userInfo?.user_name || 'Admin'}</span>
            </div>
            <Button>Đăng xuất</Button>
          </div>
        </Card>
      </header>
      <div className="mt-4">
        <Button onClick={() => setShow(true)}>Tạo giao dịch</Button>
      </div>
      {show && (
        <div>
          <p className="font-semibold text-[18px] mb-2">
            Chuyển tiền nhanh 24/7
          </p>
          <Form form={form} layout="vertical">
            <Form.Item className="!mb-4" name="bank" label="Ngân hàng">
              <Select
                placeholder="Chọn ngân hàng"
                options={[
                  { label: "AGRIBANK", value: 1 },
                  { label: "BIDV", value: 2 },
                  { label: "VIETINBANK", value: 3 },
                  { label: "VIETCOMBANK", value: 4 },
                  { label: "TPBANK", value: 5 },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item
              className="!mb-4"
              name="account_number"
              label="Số tài khoản"
            >
              <InputNumber
                className="w-full"
                placeholder="Nhập số tài khoản hưởng thụ"
              ></InputNumber>
            </Form.Item>
            <Form.Item className="!mb-4" name="value" label="Số tiền">
              <InputNumber
                placeholder="Nhập số tiền cần chuyển"
                className="w-full"
              ></InputNumber>
            </Form.Item>
            <Form.Item className="!mb-4" name="postage" label="Phí giao dịch">
              <Select
                defaultValue={1}
                options={[
                  { label: "Người chuyển trả", value: 1 },
                  { label: "Người nhận trả", value: 2 },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item className="!mb-4" name="note" label="Ghi chú">
              <Input.TextArea rows={1}></Input.TextArea>
            </Form.Item>
            <div className="flex gap-4 w-full">
              <Form.Item className="w-full !mb-0">
                <Button className="w-full" color="error" onClick={handelCancel}>
                  Huỷ
                </Button>
              </Form.Item>
              <Form.Item className="w-full !mb-0">
                <Button type="primary" className="w-full">
                  Xác nhận
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default MainPage;
