import React, { useState, useEffect } from "react";
import "./Pomodoro.css"; // Import the CSS file for styling

const Pomodoro = ({
  timeLeft,
  isActive,
  startTimer,
  resetTimer,
  pauseTimer,
  calculateTimerProgress,
}) => {
  const SECOND = 1000;
  const MINUTE = SECOND * 60;
  // const [started, setStarted] = useState(false);
  // const [isActive, setIsActive] = useState(false);
  // const [endTime, setEndTime] = useState(null);
  // const [timeLeft, setTimeLeft] = useState(initialMinutes * MINUTE);
  // const [initialTime, setInitialTime] = useState(initialMinutes * MINUTE);

  // useEffect(() => {
  //   if (isActive) {
  //     setEndTime(Date.now() + timeLeft);
  //   }
  // }, [isActive]);

  // useEffect(() => {
  //   if (isActive) {
  //     const interval = setInterval(() => {
  //       const newTimeLeft = endTime - Date.now();
  //       if (newTimeLeft <= 0) {
  //         clearInterval(interval);
  //         setIsActive(false);
  //         setTimeLeft(initialMinutes * MINUTE);
  //       } else {
  //         setTimeLeft(newTimeLeft);
  //       }
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [isActive, endTime, initialMinutes]);

  // const startTimer = () => {
  //   if (!started) {
  //     setInitialTime(initialMinutes * MINUTE);
  //     setStarted(true);
  //   }
  //   setIsActive(true);
  // };

  // const resetTimer = () => {
  //   setIsActive(false);
  //   setTimeLeft(initialMinutes * MINUTE);
  //   setStarted(false);
  // };

  // const pauseTimer = () => {
  //   setIsActive(false);
  // };

  // const calculateProgress = () => {
  //   const progress = ((initialTime - timeLeft) / initialTime) * 100;
  //   return Math.min(Math.max(progress, 0), 100);
  // };

  const minutes = Math.floor((timeLeft / MINUTE) % 60);
  const seconds = Math.floor((timeLeft / SECOND) % 60);

  return (
    <div className="pomodoro">
      <div className="timer">
        {minutes < 10 ? `0${minutes}` : minutes}:
        <span className="seconds">
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${calculateTimerProgress()}%` }}
        ></div>
      </div>
      <div className="buttons">
        {!isActive && (
          <button className="start" onClick={startTimer}>
            {calculateTimerProgress() === 0 ? "Start" : "Continue"}
          </button>
        )}
        {isActive && (
          <button className="pause" onClick={pauseTimer}>
            Pause
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
