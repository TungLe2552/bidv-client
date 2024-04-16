import { handleError } from "@/constant/handle-error";
import { setUser } from "@/stores/features/user";
import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let faceioInstance: any = null;
  const faceIoScriptLoaded = () => {
    if (faceIO && !faceioInstance) {
      faceioInstance = new faceIO("fioa4c05");
    }
  };
  const faceSignIn = async () => {
    try {
      console.log(faceioInstance);
      const userData = await faceioInstance.authenticate({
        locale: "auto",
      });
      dispatch(setUser(userData.payload));
      navigate("/business");
    } catch (errorCode) {
      console.log(errorCode);
      handleError(errorCode);
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
  return (
    <div className="w-full h-full flex items-center login">
      <div className="w-[400px] h-fit border rounded-lg p-4 mx-auto bg-white">
        <h2 className="text-center font-semibold text-[20px]">
          Chào mừng Quý khách đến với SmartBanking
        </h2>

        <ul className="bg-blue-200 rounded-lg p-2 text-[14px] my-2">
          <li className="pb-2">
            Với khách hàng đã có tài khoản SmartBanking: đăng nhập bằng khuôn
            mặt
          </li>
          <li>
            Với khách hàng chưa có tài khoản SmartBanking: đăng kí khuôn mặt
          </li>
        </ul>

        <Button className="my-4 w-full" type="primary" onClick={faceSignIn}>
          Đăng nhập
        </Button>
        <p className="flex justify-center items-center">
          <span>Chưa có tài khoản? </span>
          <Button
            className="inline w-fit px-1"
            type="link"
            onClick={() => navigate("/register")}
          >
            Đăng kí
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
