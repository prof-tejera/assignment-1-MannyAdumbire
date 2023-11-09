import React, { useEffect, useState } from "react";
import { useTimer } from "./UseTimer";
import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import * as h from "../../utils/helpers.js";
import "../../Timer.css";

const timerType = "stopwatch";

const Stopwatch = () => {
  // The displayed amount of time left in minutes & seconds.
  const [minutesShown, setMinutesShown] = useState("00");
  const [secondsShown, setSecondsShown] = useState("00");

  const [minutesPerRound, setMinutesPerRound] = useState(0);
  const [secondsPerRound, setSecondsPerRound] = useState(5);

  const {
    setFastForward,
    setIsRunning,
    isRunning,
    setReset,
    minsLeft,
    secsLeft,
    optionsRef,
  } = useTimer({
    minutesPerRound,
    secondsPerRound,
  });

  useEffect(() => {
    const mins = h.minsPartFromSecs(getPassedSeconds());
    const secs = h.secsPartFromSecs(getPassedSeconds());
    setSecondsShown(h.formatSeconds(secs));
    setMinutesShown(h.formatSeconds(mins));

    // Calculate elapsed seconds.
    function getPassedSeconds() {
      const totalSecsPerRound = h.secsFromMinsSecs(
        optionsRef.current.minutesPerRound,
        optionsRef.current.secondsPerRound
      );
      const totalSecsLeftRound = h.secsFromMinsSecs(minsLeft, secsLeft);
      return totalSecsPerRound - totalSecsLeftRound;
    }
  }, [minsLeft, secsLeft, optionsRef]);

  // Update timer options.
  useEffect(() => {
    optionsRef.current = {
      ...optionsRef.current,
      minutesPerRound: minutesPerRound,
      secondsPerRound: secondsPerRound,
    };
  }, [minutesPerRound, secondsPerRound, optionsRef]);

  const handleFastForward = () => {
    setFastForward(true);
  };
  const handleReset = () => {
    setReset(true);
  };

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
  ];

  return (
    <Panel className="timer-panel" timers={timerInputs} buttons={buttonTypes}>
      <DisplayTime type={timerType} mins={minutesShown} secs={secondsShown} />
    </Panel>
  );
};

export default Stopwatch;
