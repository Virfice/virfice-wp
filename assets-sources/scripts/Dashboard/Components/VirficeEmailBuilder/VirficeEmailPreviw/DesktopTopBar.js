import React from "react";

const DesktopTopBar = () => {
  return (
    <svg viewBox="0 0 600 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 8C0 3.85786 3.35786 0.5 7.5 0.5H592.5C596.642 0.5 600 3.85786 600 8V19.25H0V8Z"
        fill="#F2F2F5"
      />
      <circle cx={11.25} cy={9.875} r={2.8125} fill="#F3605C" />
      <circle cx={22.5} cy={9.875} r={2.8125} fill="#F8BE39" />
      <circle cx={33.75} cy={9.875} r={2.8125} fill="#50C845" />
    </svg>
  );
};

export default DesktopTopBar;
