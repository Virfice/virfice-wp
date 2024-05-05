import React from "react";

const HelpText = ({text}) => {
  return (
    <span
      className=".body__medium"
      style={{ color: "var(--Text-text-caption, #616161)" }}
    >
      {text}
    </span>
  );
};

export default HelpText;
