import React from "react";

const TimerInput = ({ label, value, propSetter, disabled}) => {

    // create random id for input so that label can be associated with input.
    const id = Math.floor(Math.random() * 10000);

    const disabledAttr = disabled ? {"disabled":true} : {};

    function handleChange(e) {
        propSetter(parseInt(e.target.value));
    }
    return(
        <span className="timer-input-group">
        <input {...disabledAttr} className='timer-input' id={id} type="number" value={value} onChange={handleChange} max="60" min="0" />
        <label htmlFor={id}>{label}</label>
        </span>
    );

}

export default TimerInput;