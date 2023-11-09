import React, { useEffect, useState } from "react";
import { useTimer } from "./UseTimer";
import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import * as h from "../../utils/helpers.js";
import "../../Timer.css";

const timerType = "xy";

const XY = () => {
  // The displayed amount of time left in minutes & seconds.
  const [minutesShown, setMinutesShown] = useState("00");
  const [secondsShown, setSecondsShown] = useState("00");

  const [minutesPerRound, setMinutesPerRound] = useState(0);
  const [secondsPerRound, setSecondsPerRound] = useState(5);

  const [roundsTotal, setRoundsTotal] = useState(2);

  const {
    setFastForward,
    setIsRunning,
    roundNumber,
    isRunning,
    setReset,
    minsLeft,
    secsLeft,
    optionsRef,
  } = useTimer({
    minutesPerRound,
    secondsPerRound,
    roundsTotal,
  });
  useEffect(() => {
    // Update displyed time left for round.
    setSecondsShown(h.formatSeconds(secsLeft));
    setMinutesShown(h.formatSeconds(minsLeft));
  }, [secsLeft, minsLeft]);

  // Update timer options.
  useEffect(() => {
    optionsRef.current = {
      ...optionsRef.current,
      roundsTotal: roundsTotal,
      minutesPerRound: minutesPerRound,
      secondsPerRound: secondsPerRound,
    };
  }, [minutesPerRound, secondsPerRound, roundsTotal, optionsRef]);

  const handleReset = () => {
    setReset(true);
  };
  const handleFastForward = () => {
    setFastForward(true);
  };
  // const handleFastForward = () => {
  //   setFF(true);
  // };

  // Start/Stop.
  function handleStartStop() {
    setIsRunning((prev) => {
      return !prev;
    });
  }
  const buttonTypes = [
    { type: "fast-forward", onClick: handleFastForward, label: "FF" },
    { type: "reset", onClick: handleReset, label: "RESET" },
    {
      type: isRunning ? "stop" : "start",
      label: isRunning ? "STOP" : "START",
      onClick: handleStartStop,
    },
  ];
  const timerInputs = [
    {
      label: "Mins",
      value: minutesPerRound,
      propSetter: setMinutesPerRound,
      disabled: isRunning,
    },
    {
      label: "Secs",
      value: secondsPerRound,
      propSetter: setSecondsPerRound,
      disabled: isRunning,
    },
    {
      label: "Rounds",
      value: roundsTotal,
      propSetter: setRoundsTotal,
      disabled: isRunning,
      required: true,
    },
  ];

  return (
    <Panel className="timer-panel" timers={timerInputs} buttons={buttonTypes}>
      <DisplayTime
        type={timerType}
        round={roundNumber}
        mins={minutesShown}
        secs={secondsShown}
      />
    </Panel>
  );
};

export default XY;
