import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Pomodoro.css";

const Pomodoro = ({ workTime, breakTime }) => {
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setIsWorkTime(true);
  }, []);

  const toggleTimer = () => {
    setIsWorkTime((prevIsWorkTime) => !prevIsWorkTime);
    setKey((prevKey) => prevKey + 1);
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      toggleTimer();
    }

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="timer">
        <div className="value">{`${minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`}</div>
        <div className="label">{isWorkTime ? "Work" : "Break"}</div>
      </div>
    );
  };

  return (
    <div className="pomodoro-timer">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          key={key}
          isPlaying={true}
          duration={isWorkTime ? workTime * 60 : breakTime * 60}
          colors={[
            ["#FE6F6B", 0.33],
            ["#FE6F6B", 0.33],
            ["#FE6F6B", 0.33],
          ]}
          onComplete={() => toggleTimer()}
          size={200}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div className="buttons">
        <button onClick={() => toggleTimer()}>
          {isWorkTime ? "Start Break" : "Start Work"}
        </button>
        <button onClick={() => setKey((prevKey) => prevKey + 1)}>Reset</button>
      </div>
    </div>
  );
};

export default Pomodoro;
