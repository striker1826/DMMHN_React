import Header from "components/header/Header";
import { useState } from "react";
import { styled } from "styled-components";
import interviewMainImg from "assets/interviewMain.png";
import Login from "components/auth/Login";
import { useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useState("false");

  const openLoginModal = () => {
    setIsModal("true");
  };

  const movedSimulationPage = () => {
    navigate("/simulation");
  };

  return (
    <LayoutCtn $ismodal={isModal}>
      <Header loginModal={openLoginModal} />
      <Main>
        {isModal === "true" && <Login setIsModal={setIsModal} />}
        <MainText>
          어떤 면접이든 연습을 통해 대비해보세요 <br />
          <span>"떨면 뭐하니"</span>가 도와드립니다
        </MainText>
        <SubText>
          떨면뭐하니의 신뢰할 수 있는 비디오 미팅 솔루션을 사용하여 <br />
          소통하고, 협업하고, 함께 더욱 많은 것을 해내세요.
        </SubText>
        <InterviewMainImg src={interviewMainImg} />
        <InterviewBtn $ismodal={isModal} onClick={movedSimulationPage}>
          모의면접 시작
        </InterviewBtn>
      </Main>
    </LayoutCtn>
  );
};

export const LayoutCtn = styled.div`
  margin: 0;
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 1;
  &::after {
    margin: 0;
    background: linear-gradient(
      150deg,
      rgb(0, 73, 34) 0%,
      rgb(2, 99, 47) 40%,
      rgb(5, 136, 65) 70%,
      rgb(249, 249, 249) 70%
    );
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: -1;
    opacity: ${(props) => (props.$ismodal === "true" ? "0.5" : "1")};
  }
  @media screen and (max-height: 600px) {
    margin: 0;
    height: 100%;
  }
`;

const MainText = styled.h2`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 15px;
  color: #fff;
  text-align: center;
  margin-top: 70px;
  > span {
    color: #fff9c1;
  }
`;

const SubText = styled.p`
  font-size: 16px;
  color: #fff;
  text-align: center;
  margin-top: 35px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InterviewMainImg = styled.img`
  width: 300px;
  height: 300px;
  margin-top: 20px;
`;

const InterviewBtn = styled.button`
  border-radius: 9px;
  background: #025729;
  color: #fff;
  text-align: center;
  width: 300px;
  height: 50px;
  font-weight: 600;
  font-size: 32px;
  border: none;
  margin-top: 20px;
  cursor: pointer;
`;

export default InterviewPage;
