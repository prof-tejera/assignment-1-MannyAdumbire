import React, { useEffect, useState } from "react";
import { useStopWatch } from "./UseStopWatch";
import DisplayTime from "../generic/DisplayTime";
import Panel from "../generic/Panel";
import * as h from "../../utils/helpers.js";
import "../../Timer.css";

const timerType = "tabata";

const Tabata = () => {
  // The displayed amount of time left in minutes & seconds.
  const [minutesShown, setMinutesShown] = useState("00");
  const [secondsShown, setSecondsShown] = useState("00");

  const [minutesPerRound, setMinutesPerRound] = useState(0);
  const [secondsPerRound, setSecondsPerRound] = useState(5);

  const [minutesRest, setMinutesRest] = useState(0);
  const [secondsRest, setSecondsRest] = useState(5);

  const [roundsTotal, setRoundsTotal] = useState(2);

  const {
    setFastForward,
    setIsRunning,
    roundNumber,
    isRunning,
    setReset,
    minsLeft,
    secsLeft,
    isRest,
    optionsRef,
  } = useStopWatch({
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
      minutesRest: minutesRest,
      secondsRest: secondsRest,
    };
  }, [
    minutesPerRound,
    secondsPerRound,
    minutesRest,
    secondsRest,
    roundsTotal,
    optionsRef,
  ]);

  const handleReset = () => {
    setReset(true);
  };
  
  const handleFastForward = () => {
    setFastForward(true);
  };

  // Start/Stop.
  function handleStartStop() {
    setIsRunning((prev) => {
      return !prev;
    });
  }

  const buttonTypes = [
    {
      type: isRunning ? "stop" : "start",
      label: isRunning ? "STOP" : "START",
      onClick: handleStartStop,
    },
    { type: "reset", onClick: handleReset, label: "RESET" },
    { type: "fast-forward", onClick: handleFastForward, label: "FF" },
  ];
  const timerInputs = [
    {
      label: "Mins",
      value: minutesPerRound,
      propSetter: setMinutesPerRound,
      disabled: isRunning
    },
    {
      label: "Secs",
      value: secondsPerRound,
      propSetter: setSecondsPerRound,
      disabled: isRunning
    },
    {
      label: "Rounds",
      value: roundsTotal,
      propSetter: setRoundsTotal,
      disabled: isRunning,
      required: true
    },
    {
      label: "Rest(Mins)",
      value: minutesRest,
      propSetter: setMinutesRest,
      disabled: isRunning
    },
    {
      label: "Rest(Secs)",
      value: secondsRest,
      propSetter: setSecondsRest,
      disabled: isRunning
    }
  ];
  
  return (
      <Panel className="timer-panel" timers={timerInputs} buttons={buttonTypes} >
      <DisplayTime
        type={timerType}
        rest={isRest}
        round={roundNumber}
        mins={minutesShown}
        secs={secondsShown}
      />
    </Panel>
  );
};

export default Tabata;
