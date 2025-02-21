import React from "react";

const CurrentLocationIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-ping"
    >
      <circle
        cx="23.8806"
        cy="23.8196"
        r="23.15"
        transform="rotate(-5 23.8806 23.8196)"
        fill="#255AFF"
        fillOpacity="0.1"
        stroke="#95BCE1"
        strokeWidth="0.3"
        className="animate-ping"
      />
      <circle
        cx="23.8804"
        cy="23.8196"
        r="9"
        transform="rotate(-5 23.8804 23.8196)"
        fill="#255AFF"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CurrentLocationIcon;
