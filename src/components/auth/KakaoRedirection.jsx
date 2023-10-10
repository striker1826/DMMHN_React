import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { changeUser } from "store/userSlice";

const KakaoRedirection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const getDatas = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/auth/kakao/socialLogin/${code}`
      );
      const access_token = res.data.access_token;
      const refresh_token = res.data.refresh_token;
      localStorage.setItem("dmmhn_access_token", access_token);
      localStorage.setItem("dmmhn_refresh_token", refresh_token);
      const user = res.data.user;
      dispatch(changeUser(user));
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    getDatas();

    // navigate("/") 사용 시 margin이 생기는 문제 발생
  }, []);
};

export default KakaoRedirection;
