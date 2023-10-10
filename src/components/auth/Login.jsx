import { useEffect, useRef } from "react";
import styled from "styled-components";
import kakaoLoginImg from "assets/kakaoLoginImg.png";

const Login = ({ setIsModal }) => {
  const loginRef = useRef();

  const clickOutsideModal = (e) => {
    if (loginRef.current && !loginRef.current.contains(e.target)) {
      setIsModal("false");
    }
  };

  const kakaoLogin = () => {
    const link =
      "https://kauth.kakao.com/oauth/authorize?client_id=0e789afb0122a1a5e770cc58fe2de55c&redirect_uri=http://localhost:3000/kakao/callback&response_type=code";
    window.location.href = link;
  };

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsideModal);

    return () => {
      window.removeEventListener("mousedown", clickOutsideModal);
    };
  });

  return (
    <Ctn ref={loginRef}>
      <EmailText>로그인 하기</EmailText>

      <SocialCtn>
        <SocialIcon src={kakaoLoginImg} onClick={() => kakaoLogin()} />
      </SocialCtn>
    </Ctn>
  );
};

const Ctn = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 250px;
  border-radius: 15px;
  border: 1px solid #cfcfcf;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const EmailText = styled.h1`
  color: #000;
  margin-top: 20px;
  font-family: Noto Sans;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const SocialCtn = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialIcon = styled.img`
  cursor: pointer;
`;

export default Login;
