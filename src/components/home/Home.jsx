import { styled } from "styled-components";
import mainImg from "assets/mainImg.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const movedInterviewPage = () => {
    navigate("/interview");
  };

  return (
    <Ctn>
      <DiscriptionCtn>
        <MainText>
          어떤 면접이든 연습을 통해 대비해 보세요
          <br />
          <span>"떨면 뭐하니"</span>가 도와드립니다
        </MainText>
        <SubText>
          떨면뭐하니의 신뢰할 수 있는 비디오 미팅 솔루션을 사용하여 <br />
          소통하고, 협업하고, 함께 더욱 많은 것을 해내세요.
        </SubText>
        <InterviewBtn onClick={movedInterviewPage}>모의면접</InterviewBtn>
      </DiscriptionCtn>
      <MainImg src={mainImg} alt="mainImg" />
    </Ctn>
  );
};

const Ctn = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
  margin-top: 110px;
  gap: 100px;
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 0;
  }
  @media (max-height: 600px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 0;
  }
`;

const DiscriptionCtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled.h2`
  font-size: 24px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 15px;
  color: #fff;
  text-align: center;
  > span {
    color: #fff9c1;
  }
`;

const SubText = styled.p`
  font-size: 16px;
  color: #fff;
  text-align: center;
`;

const InterviewBtn = styled.button`
  background-color: rgb(255, 249, 193);
  color: rgb(2, 87, 41);
  border: none;
  font-weight: 600;
  margin: 20px auto 10px;
  max-width: 240px;
  width: 100%;
  padding: 10px 30px;
  border-radius: 30px;
  cursor: pointer;
  font-size: 24px;
`;

const MainImg = styled.img`
  width: 450px;
  height: 356px;
`;

export default Home;
