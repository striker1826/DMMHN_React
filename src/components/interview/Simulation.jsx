import { styled } from "styled-components";
import React, { useRef, useState, useEffect } from "react";
import { questionList } from "config/qustionList";
import { useNavigate } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";

const Simulation = () => {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { video: true }
  );

  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  let [currentQustion, setCurrentQustion] = useState(1);
  let [isEnd, setIsEnd] = useState("false");
  let [minutes, setMinutes] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [currentMinutes, setCurrentMinutes] = useState(0);
  let [currentSeconds, setCurrentSeconds] = useState(0);
  let [exit, setExit] = useState(false);
  const totalTimerId = useRef(null);
  const currentTimerId = useRef(null);
  const videoRef = useRef(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // 웹캠 스트림 가져오기
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("웹캠 스트림을 가져올 수 없습니다:", error);
      }
    };

    startWebcam();

    // 컴포넌트 언마운트 시 웹캠 스트림 해제
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        if (stream instanceof MediaStream) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      }
    };
  }, []);

  useEffect(() => {
    totalTimerId.current = setInterval(() => {
      if (seconds < 59) {
        setSeconds(seconds + 1);
      } else {
        setSeconds(0);
        setMinutes(minutes + 1);
      }
    }, 1000);

    return () => {
      clearInterval(totalTimerId.current);
    };
  }, [minutes, seconds]);

  useEffect(() => {
    currentTimerId.current = setInterval(() => {
      if (currentSeconds < 59) {
        setCurrentSeconds(currentSeconds + 1);
      } else {
        setCurrentSeconds(0);
        setCurrentMinutes(currentMinutes + 1);
      }
    }, 1000);

    return () => {
      clearInterval(currentTimerId.current);
    };
  }, [currentMinutes, currentSeconds]);

  const timerInit = () => {
    setCurrentSeconds(0);
    setCurrentMinutes(0);
  };

  const handleCurrentQustion = () => {
    setHistory([
      ...history,
      {
        qustion: questionList[currentQustion - 1].question,
        time: `${currentMinutes}:${currentSeconds}`,
      },
    ]);

    if (currentQustion <= questionList.length) {
      setCurrentQustion(++currentQustion);
      timerInit();
      if (currentQustion === questionList.length) {
        setIsEnd("true");
      }
    }
  };

  useEffect(() => {
    console.log(history);
  }, [history]);

  const handleInterviewStop = () => {
    setHistory([
      ...history,
      {
        qustion: questionList[currentQustion - 1].question,
        time: `${currentMinutes}:${currentSeconds}`,
      },
    ]);
    if (isRecording) {
      handleStopRecording();
    }
    clearInterval(totalTimerId.current);
    clearInterval(currentTimerId.current);

    setExit(true);
  };

  const handleExit = () => {
    navigate("/simulation/done");
  };

  const handleStartRecording = () => {
    startRecording();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    stopRecording();
    setIsRecording(false);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = mediaBlobUrl;
    a.download = "recorded-video.mp4";
    a.click();
  };

  return (
    <Ctn>
      <TopCtn>
        <Middle>
          <CommonQuestion>공통질문</CommonQuestion>
          <QustionCount>
            Q{currentQustion} / Q{questionList.length}
          </QustionCount>
        </Middle>
        {isRecording ? (
          <RecordBtn onClick={handleStopRecording}>영상 멈추기</RecordBtn>
        ) : (
          <RecordBtn onClick={handleStartRecording}>영상 기록하기</RecordBtn>
        )}
      </TopCtn>
      <QuestionBox>
        <p>Q{currentQustion}.</p>
        <p>{questionList[currentQustion - 1].question}</p>
      </QuestionBox>
      <MiddleCtn>
        <video ref={videoRef} autoPlay muted playsInline width={"50%"} />
        {/* <video ref={videoRef} width={"50%"} /> */}
        <TimerCtn>
          <TotalTimerCtn>
            <p>총 모의면접 답변시간</p>
            <TimerBox>
              {minutes}:{seconds}
            </TimerBox>
          </TotalTimerCtn>

          <CurrentTimerCtn>
            <p>현재 질문 답변시간</p>
            <TimerBox>
              {currentMinutes}:{currentSeconds}
            </TimerBox>
          </CurrentTimerCtn>
        </TimerCtn>
      </MiddleCtn>

      <BottomCtn>
        {mediaBlobUrl && (
          <DownloadBtn onClick={handleDownload}>영상 다운로드</DownloadBtn>
        )}
        {exit ? (
          <NextQuestionBtn onClick={handleExit}>나가기</NextQuestionBtn>
        ) : isEnd === "true" ? (
          <NextQuestionBtn onClick={handleInterviewStop}>
            면접 끝내기
          </NextQuestionBtn>
        ) : (
          <NextQuestionBtn onClick={handleCurrentQustion}>
            {`다음 질문으로 >>`}
          </NextQuestionBtn>
        )}
      </BottomCtn>
    </Ctn>
  );
};

const Ctn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopCtn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;

  margin-top: 22px;
  width: 100%;
  @media (max-width: 900px) {
    margin-left: 20px;
  }
`;

const Middle = styled.div`
  display: flex;
  position: absolute;
  left: 40px;
`;

const MiddleCtn = styled.div`
  margin: 0 100px;
  display: flex;
  justify-content: space-between;
  gap: 60px;
`;

const NavyBox = styled.div`
  border-radius: 5px;
  border: 1px solid #5351a5;
  background: #1b172f;
  width: 102px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 150%; /* 30px */
  letter-spacing: -0.38px;
`;

const TotalTimerCtn = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > p {
    font-size: 12px;
  }
`;

const CurrentTimerCtn = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  > p {
    font-size: 12px;
  }
`;

const TimerCtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 25px;
`;

const TimerBox = styled.div`
  border-radius: 29.5px;
  background: #000;
  width: 100%;
  height: 59px;
  color: #fff;
  display: flex;
  padding-left: 25px;
  align-items: center;
  border-radius: 29.5px;
  background: linear-gradient(
    270deg,
    #5ec2c6 3.17%,
    #59a2ab 47.65%,
    #cb7ff1 102.03%
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
`;

const CommonQuestion = styled(NavyBox)`
  color: #8243d2;
`;

const QustionCount = styled(NavyBox)`
  color: #fff;
`;

const RecordBtn = styled.div`
  width: 193px;
  height: 54px;
  border-radius: 5px;
  position: absolute;
  right: 40px;
  border: 1px solid #5351a5;
  background: #1b172f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
`;

const QuestionBox = styled.div`
  color: #fff;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.684px;
  @media (max-width: 900px) {
    margin-top: 20px;
    display: flex;
  }
`;

const DownloadBtn = styled(NavyBox)`
  color: #8243d2;
  cursor: pointer;
  width: 150px;
  margin-bottom: -20px;
  margin-top: 15px;
`;

const NextQuestionBtn = styled(NavyBox)`
  width: 270px;
  display: flex;
  cursor: pointer;
  margin-bottom: -20px;
  margin-top: 15px;
  color: #fff;
`;

const BottomCtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 55px;
  @media (max-width: 900px) {
    margin-top: 55px;
  }
`;

export default Simulation;
