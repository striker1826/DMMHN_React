import { useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { persistor } from "index";

const Hamburger = ({ loginModal }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate(loginModal);

  const movedInterview = () => {
    navigate("/simulation");
  };

  const movedMyPage = () => {
    navigate("/test");
  };

  const handleLogout = () => {
    localStorage.removeItem("dmmhn_access_token");
    localStorage.removeItem("dmmhn_refresh_token");
    persistor.purge();
    navigate("/");
  };

  return (
    <Ctn>
      {user.id ? (
        <IsUserCtn>
          <p onClick={movedInterview}>모의면접 입장</p>
          <p onClick={movedMyPage}>마이페이지 / 내 프로필</p>
          <p onClick={handleLogout}>로그아웃</p>
        </IsUserCtn>
      ) : (
        <p onClick={loginModal}>Log in</p>
      )}
    </Ctn>
  );
};

const Ctn = styled.div`
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 35px;
  right: -5px;
  min-width: 200px;
  color: #000;
  padding: 10px 0;
  > p {
    cursor: pointer;
    padding: 10px 20px;
    margin: 0;
    font-size: 100%;
    font-weight: 400;
    &:hover {
      background-color: #e2e2e2;
    }
  }
`;

const IsUserCtn = styled.div`
  > p {
    cursor: pointer;
    padding: 10px 20px;
    margin: 0;
    font-size: 100%;
    font-weight: 400;
    &:hover {
      background-color: #e2e2e2;
    }
  }
`;
export default Hamburger;
