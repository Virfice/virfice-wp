import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import HelpText from "./HelpText";

const TextField = ({
  placeholder,
  label,
  value,
  helpText,
  error = false,
  onChange = () => {},
  multiline = false,
}) => {
  const [v, setV] = useState(value);

  useEffect(() => {
    setV(value);
  }, [value]);
  const handleOnChange = (e) => {
    setV(e.target.value);
    onChange(e.target.value);
  };

  const handleKeyDown = (e) => {
    let v = value * 1;
    if (!Number.isInteger(v)) {
      console.error("The value is not an integer.", v);
      return;
    }
    if (e.key === "ArrowUp") {
      v += 1; // Increment the v
    } else if (e.key === "ArrowDown") {
      v -= 1; // Decrement the v
    }
    setV(v);
    onChange(v);
  };

  return (
    <div className={`${VIRFICE_APP_PREFIX}-textfileld-wrapper`}>
      {label && <label className="body__medium">{label}</label>}
      {!multiline && (
        <input
          placeholder={placeholder || label}
          value={v}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
      )}
      {multiline && (
        <textarea
          placeholder={placeholder || label}
          value={v}
          onChange={handleOnChange}
          rows={multiline}
        ></textarea>
      )}
      {error && (
        <span
          style={{
            color: "var(--text-text-error)",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
              stroke="#CC0A00"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 8.5V5"
              stroke="#CC0A00"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 11.25C8.27614 11.25 8.5 11.0261 8.5 10.75C8.5 10.4739 8.27614 10.25 8 10.25C7.72386 10.25 7.5 10.4739 7.5 10.75C7.5 11.0261 7.72386 11.25 8 11.25Z"
              fill="#CC0A00"
            />
          </svg>
          {error}
        </span>
      )}
      {helpText && <HelpText text={helpText} />}
    </div>
  );
};

export default TextField;
