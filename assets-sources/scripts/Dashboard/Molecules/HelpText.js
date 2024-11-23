import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";

const HelpText = ({ text }) => {
  // const escapedText = escapedHtmlToOriginal(text);
  return (
    <span
      className={`${VIRFICE_APP_PREFIX}-help-text .body__medium`}
      style={{ color: "var(--Text-text-caption, #616161)" }}
    >
      {text}
    </span>
  );
};

export default HelpText;
