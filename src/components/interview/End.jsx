import { styled } from "styled-components";
import clapIcon from "assets/clapIcon.svg";
import { useNavigate } from "react-router-dom";

const End = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  return (
    <Ctn>
      <ClapIcon src={clapIcon} />
      <Text>
        면접이 모두 종료되었습니다 <br />
        {`수고하셨습니다 :)`}
      </Text>
      <ExitBtn onClick={handleExit}>종료</ExitBtn>
    </Ctn>
  );
};

const Ctn = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const ClapIcon = styled.img`
  width: 107px;
  height: 106px;
`;

const Text = styled.p`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: 500;
`;

const ExitBtn = styled.div`
  width: 303px;
  height: 70px;
  cursor: pointer;
  border-radius: 11px;
  border: 1px solid #5351a5;
  background: #1b172f;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  font-size: 36px;
  font-weight: 600;
`;

export default End;
