import React from "react";

const Button = ({ type, label, onClick }) => {
  // Keep the current mode in sync with the parent component that passed it in.
  const btnClass = 'button-'+ type.toLowerCase();

  // set the Label based on button type.
  return (
    <div className={`${btnClass} button-timer`} onClick={onClick}>
        {label}
    </div>
  );
};
export default Button;
