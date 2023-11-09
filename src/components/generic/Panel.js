import React from "react";
import TimerInput from "./TimerInput";
import Button from "./Button";

const Panel = ({ timers, buttons, children }) => {
  return (
    <div className={`timer-panel`}>
      <div className="timer-inputs">
        {timers.map((timer, idx) => (
          <TimerInput
            key={`timer-${idx}`}
            label={timer.label}
            value={timer.value}
            propSetter={timer.propSetter}
            disabled={timer.disabled}
          ></TimerInput>
        ))}
      </div>

      <div className="timer-actions">
        {buttons.map((bType, idx) => (
          <Button
            key={`button-${idx}`}
            type={bType.type}
            onClick={bType.onClick}
            label={bType.label}
          />
        ))}
      </div>
      <div className="timer-display">{children}</div>
    </div>
  );
};

export default Panel;
