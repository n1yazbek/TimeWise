import React, { useState, useRef, useEffect } from "react";
import "./Pomodoro3.css"; // Import the CSS file for styling

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [initialMinutes, setInitialMinutes] = useState(25);

  const intervalRef = useRef(null);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
            // Handle Pomodoro completion here
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const startTimer = () => {
    console.log("Starting!");
    if (inputMinutes !== "" || inputSeconds !== "") {
      console.log("Starting!!");

      const newMinutes = inputMinutes !== "" ? parseInt(inputMinutes) : minutes;
      const newSeconds = inputSeconds !== "" ? parseInt(inputSeconds) : seconds;

      setInitialMinutes(newMinutes);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
      setInputMinutes("");
      setInputSeconds("");
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
    setInputMinutes("");
    setInputSeconds("");
  };

  const handleMinutesClick = () => {
    if (!isActive) {
      const newMinutes = prompt("Enter minutes:", minutes);
      if (newMinutes !== null && !isNaN(newMinutes) && newMinutes >= 0) {
        setMinutes(parseInt(newMinutes));
      }
    }
  };

  const handleSecondsClick = () => {
    if (!isActive) {
      const newSeconds = prompt("Enter seconds:", seconds);
      if (
        newSeconds !== null &&
        !isNaN(newSeconds) &&
        newSeconds >= 0 &&
        newSeconds < 60
      ) {
        setSeconds(parseInt(newSeconds));
      }
    }
  };

  const calculateProgress = () => {
    const totalSeconds = minutes * 60 + seconds;
    const progress = (totalSeconds / (initialMinutes * 60)) * 100;
    return progress.toFixed(2);
  };

  return (
    <div className="pomodoro">
      <div className="timer" onClick={handleMinutesClick}>
        {minutes < 10 ? `0${minutes}` : minutes}:
        <span className="seconds" onClick={handleSecondsClick}>
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
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
