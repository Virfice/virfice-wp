import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import HelpText from "./HelpText";
import { getTrackBackground, Range } from "react-range";
import TextField from "./TextField";

const RangeField = ({
  label,
  value,
  helpText,
  error = false,
  min = 0,
  max = 100,
  step = 1,
  onChange = () => {},
  icon = null,
}) => {
  // Helper to ensure value is within min and max
  const clampValue = (val) => Math.max(min, Math.min(max, val));
  const [values, setValues] = useState([clampValue(value)]);

  useEffect(() => {
    // Ensure the initial value respects min and max
    setValues([clampValue(value)]);
  }, [value]);

  const handleOnChange = (values) => {
    const clampedValue = clampValue(values[0]);
    setValues([clampedValue]);
    onChange(clampedValue);
  };

  const onInputChange = (value) => {
    const clampedValue = clampValue(value);
    setValues([clampedValue]);
    onChange(clampedValue);
  };

  return (
    <div className={`${VIRFICE_APP_PREFIX}-rangefield-wrapper`}>
      <div
        className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
        style={{ alignItems: "center" }}
      >
        {icon && icon}
        {label && <label className="body__medium">{label}</label>}
      </div>

      <div className={`${VIRFICE_APP_PREFIX}-range-and-input-wrapper`}>
        <Range
          values={values}
          step={step}
          min={min}
          max={max}
          // rtl={rtl}
          onChange={handleOnChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "2px",
                  width: "100%",
                  borderRadius: "0",
                  background: getTrackBackground({
                    values,
                    colors: ["#191700", "rgba(0, 0, 0, 0.10)"],
                    min: min,
                    max: max,
                    // rtl,
                  }),
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "16px",
                width: "16px",
                borderRadius: "100%",
                backgroundColor: isDragged ? "#C8E265" : "#191700",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0.5px 0.5px 0px 0px rgba(0, 0, 0, 0.20)",
                border: "1px solid #C8E265",
              }}
            ></div>
          )}
        />
        <TextField value={values[0]} onChange={onInputChange} />
      </div>

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

export default RangeField;
