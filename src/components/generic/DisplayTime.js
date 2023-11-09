import React from "react";

const DisplayTime = ({ mins, secs, type, rest, round }) => {
  const roundTimers = ["xy", "tabata"];
  const isRoundTimer = roundTimers.includes(type);
  return (
    <div className={`timer-display ${rest ? "timer-display-mode-rest" : ""}`}>
      <div
        className={`timer-display-mode  `}
      >
        {isRoundTimer && (rest ? "Rest" : `Round #${round}`)}
      </div>
      <div className="timer-display-time">
        {mins}:{secs}
      </div>
    </div>
  );
};

export default DisplayTime;
