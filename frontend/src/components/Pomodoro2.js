import React, { useState, useEffect } from "react";
import "./Pomodoro2.css"; // Import the CSS file for styling

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
            // Handle Pomodoro completion here
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="pomodoro">
      <div className="timer">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="buttons">
        {!isActive && (
          <button className="start" onClick={startTimer}>
            Start
          </button>
        )}
        {isActive && (
          <button className="stop" onClick={stopTimer}>
            Stop
          </button>
        )}
        <button className="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
