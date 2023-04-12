// import React, { useState, useEffect } from "react";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import "./Pomodoro.css";

// const Pomodoro = ({ workTime, breakTime }) => {
//   const [isWorkTime, setIsWorkTime] = useState(true);
//   const [key, setKey] = useState(0);

//   useEffect(() => {
//     setIsWorkTime(true);
//   }, []);

//   const toggleTimer = () => {
//     setIsWorkTime((prevIsWorkTime) => !prevIsWorkTime);
//     setKey((prevKey) => prevKey + 1);
//   };

//   const renderTime = ({ remainingTime }) => {
//     if (remainingTime === 0) {
//       toggleTimer();
//     }

//     const minutes = Math.floor(remainingTime / 60);
//     const seconds = remainingTime % 60;

//     return (
//       <div className="timer">
//         <div className="value">{`${minutes}:${
//           seconds < 10 ? `0${seconds}` : seconds
//         }`}</div>
//         <div className="label">{isWorkTime ? "Work" : "Break"}</div>
//       </div>
//     );
//   };

//   return (
//     <div className="pomodoro-timer">
//       <div className="timer-wrapper">
//         <CountdownCircleTimer
//           key={key}
//           isPlaying={true}
//           duration={isWorkTime ? workTime * 60 : breakTime * 60}
//           colors={[
//             ["#FE6F6B", 0.33],
//             ["#FE6F6B", 0.33],
//             ["#FE6F6B", 0.33],
//           ]}
//           onComplete={() => toggleTimer()}
//           size={200}
//         >
//           {renderTime}
//         </CountdownCircleTimer>
//       </div>
//       <div className="buttons">
//         <button onClick={() => toggleTimer()}>
//           {isWorkTime ? "Start Break" : "Start Work"}
//         </button>
//         <button onClick={() => setKey((prevKey) => prevKey + 1)}>Reset</button>
//       </div>
//     </div>
//   );
// };

// export default Pomodoro;

import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./Pomodoro.css";

const Pomodoro = () => {
  const [timerMode, setTimerMode] = useState("pomodoro");
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const handleTimerClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="pomodoro-container">
      <div className="pomodoro-timer">
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={1500}
          colors={[
            ["#FE6F6B", 0.33],
            ["#FE6F6B", 0.33],
            ["#FE6F6B", 0.33],
          ]}
          size={320}
          strokeWidth={20}
          onComplete={() => {
            // Handle timer completion
          }}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            return (
              <div className="pomodoro-timer-display">
                <span className="pomodoro-timer-minutes">
                  {formatTime(minutes)}
                </span>
                <span className="pomodoro-timer-separator">:</span>
                <span className="pomodoro-timer-seconds">
                  {formatTime(seconds)}
                </span>
              </div>
            );
          }}
        </CountdownCircleTimer>
        <div className="pomodoro-timer-mode">{timerMode}</div>
      </div>
      <div className="pomodoro-controls">
        <button
          className={`pomodoro-control-button ${
            isPlaying ? "pomodoro-control-button-pause" : ""
          }`}
          onClick={handleTimerClick}
        >
          {isPlaying ? (
            <i className="fa fa-pause"></i>
          ) : (
            <i className="fa fa-play"></i>
          )}
        </button>
        <button
          className="pomodoro-control-button pomodoro-control-button-reset"
          onClick={() => {
            // Handle reset button click
          }}
        >
          <i className="fa fa-refresh"></i>
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
