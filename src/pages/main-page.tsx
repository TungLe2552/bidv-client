import { Avatar, Button, Card, Form, Input, InputNumber, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBackEndUrl } from "@/constant";
import StepTransaction from "./step-transaction";
const MainPage = () => {
  const backEndUrl = getBackEndUrl();

  const [show, setShow] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const user = localStorage.getItem("user");

  const getData = async (params: unknown) => {
    const res = await axios.post(`${backEndUrl}/api/info`, params);
    setUserInfo(res.data.data);
  };
  useEffect(() => {
    if (user) {
      getData({ email: user });
    }
  }, [user]);

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
              <span>{userInfo?.user_name || "Admin"}</span>
            </div>
            <Button>Đăng xuất</Button>
          </div>
        </Card>
      </header>
      {!show && (
        <div className="mt-4">
          <Button onClick={() => setShow(true)}>Tạo giao dịch</Button>
        </div>
      )}
      {show && (
        <div className="w-[70%] mx-auto pt-4">
          <p className="font-semibold text-[18px] text-center mb-4">
            Chuyển tiền nhanh 24/7
          </p>
          <StepTransaction />
        </div>
      )}
    </div>
  );
};

export default MainPage;
