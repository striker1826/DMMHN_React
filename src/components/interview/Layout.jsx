import { styled } from "styled-components";
import Instructions from "./Instructions";
import { useState } from "react";
import Simulation from "./Simulation";

const Layout = () => {
  const [isStart, setIsStart] = useState("false");

  const handleInterviewStart = () => {
    setIsStart("true");
  };

  return (
    <Wrap>
      <SimulationDisplay>
        {isStart === "true" ? (
          <Simulation />
        ) : (
          <Instructions interviewStart={handleInterviewStart} />
        )}
      </SimulationDisplay>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(
    321.46% 126.46% at 86.33% 0%,
    #1b172f 0%,
    #1a1a1a 47.92%,
    #1b172f 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SimulationDisplay = styled.div`
  border-radius: 41px;
  border: 1px solid #5351a5;
  background: #222844;
  width: 70%;
  height: 75%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  // margin-top: -55px;
`;

export default Layout;
