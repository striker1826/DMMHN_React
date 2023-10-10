import humanIcon from "assets/humanIcon.svg";
import { styled } from "styled-components";

const Instructions = ({ interviewStart }) => {
  return (
    <Instruction>
      <img src={humanIcon} />
      <p>
        준비가 완료되면
        <br /> 시작버튼을 클릭해주세요.
      </p>
      <button onClick={interviewStart}>시작</button>
    </Instruction>
  );
};

const Instruction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > img {
    width: 105px;
    height: 119px;
  }
  > p {
    color: #fff;
    text-align: center;
    font-size: 32px;
    font-weight: 500;
  }
  > button {
    width: 303px;
    height: 70px;
    border-radius: 11px;
    border: 1px solid #5351a5;
    background: #1b172f;
    color: #fff;
    font-size: 36px;
    font-weight: 600;
    cursor: pointer;
  }
`;

export default Instructions;
