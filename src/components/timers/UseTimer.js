import { useState, useRef, useEffect } from "react";
import * as h from "../../utils/helpers.js";

export const useTimer = (opt) => {
  // Props that should cause component rerender.
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [reset, setReset] = useState(true);
  const [fastForward, setFastForward] = useState(false);
  const [secsLeft, setSecsLeft] = useState(0); 
  const [minsLeft, setMinsLeft] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);

  // Props that shouldn't cause rerender.
  const msLeft = useRef(0);
  const timerFrequency = 250;

  // The Intervals that progress the timer.
  const roundIntervalRef = useRef(null);

  // Set default values for the timer, or use the provided ones.
  const defaultOpts = {
    minutesPerRound: opt.minutesPerRound || 0,
    secondsPerRound: opt.secondsPerRound || 0,
    minutesRest: opt.minutesRest || 0,
    secondsRest: opt.secondsRest || 0,
    roundsTotal: opt.roundsTotal || 1,
  };

  const options = useRef(defaultOpts);
  // TODO Why does calling setOptions({...x}) here lead to infinite loop/render with useState(defaultOpts)?

  // Logic for rounds.
  useEffect(() => {
    if (reset) {
      resetFn();
      setReset(false);
    }
    if (fastForward) {
      fastForwardFn();
      setFastForward(false);
    }
    // If the timer isn't running or it's a rest period.
    if (!isRunning) {
      // cleanup the Interval
      roundIntervalRef.current && clearInterval(roundIntervalRef.current);
    } else {
      // setup new Interval.
      roundIntervalRef.current = setInterval(() => {
        if (!roundNumber) {
          setRoundNumber(1);
        }
        if (!msLeft.current) {
          // get the total number of ms for the round.
          msLeft.current = h.msFromMinsSecs(
            options.current.minutesPerRound,
            options.current.secondsPerRound
          );
        } else {
          msLeft.current -= timerFrequency;
        }
        // Update the displayed time left.
        if (msLeft.current >= timerFrequency) {
          let [minsLeft, secsLeft] = h.minsSecsFromMs(msLeft.current);
            setMinsLeft(minsLeft);
            setSecsLeft(secsLeft);
        } else {
          // Are there still rounds left?
          if (roundNumber < options.current.roundsTotal) {
            // Is there a rest period?
            if ((options.current.minutesRest || options.current.secondsRest ) && !isRest) {
              // Initiate the rest period.
              setSecsLeft(options.current.secondsRest);
              setMinsLeft(options.current.minutesRest);
              msLeft.current = h.msFromMinsSecs(
                options.current.minutesRest,
                options.current.secondsRest
              );
              setIsRest(true);
            }else{
              // Go to the next round.
              setRoundNumber((prev) => prev + 1);
              msLeft.current = h.msFromMinsSecs(
                options.current.minutesPerRound,
                options.current.secondsPerRound
              );
              setIsRest(false);
            }
          } else {
            // No more rounds left.
            setIsRunning(false);
          }
        }
      }, timerFrequency);
    }
    return () => {
      // cleanup the Interval.
      if (roundIntervalRef.current) {
        clearInterval(roundIntervalRef.current);
      }
    };
  }, [
    isRunning,
    isRest,
    reset,
    fastForward,
    roundNumber,
  ]);

  return {
    isRest: isRest,
    isRunning: isRunning,
    minsLeft: minsLeft,
    secsLeft: secsLeft,
    roundNumber: roundNumber,
    optionsRef: options,
    setReset: setReset,
    setIsRunning: setIsRunning,
    setFastForward: setFastForward,
  };

  // Reset the timer.
  function resetFn() {
    setIsRunning(false);
    setIsRest(false);
    setFastForward(false);
    setRoundNumber(1);
    msLeft.current = 0;
    setSecsLeft(options.current.secondsPerRound);
    setMinsLeft(options.current.minutesPerRound);
  }
  // Fast forward the timer.
  function fastForwardFn() {
    setIsRunning(false);
    setFastForward(false);
    setIsRest(false);
    msLeft.current = 0;
    setRoundNumber(options.current.roundsTotal);
    setSecsLeft(0);
    setMinsLeft(0);
  }
};
