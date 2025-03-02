import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import { ToggleDisabledIcon, ToggleEnabledIcon } from "@svg-icons";
import HelpText from "./HelpText";

const CheckboxField = ({
  title,
  label,
  value,
  helpText,
  onChange = () => {},
  type = "checkbox",
}) => {
  const [v, setV] = useState(value);

  useEffect(() => {
    setV(value);
  }, [value]);
  const handleOnChange = (e) => {
    setValue(e.target.checked);
  };

  const setValue = (bool) => {
    setV(bool);
    onChange(bool);
  };

  return (
    <div
      className={`${VIRFICE_APP_PREFIX}-checkbox-wrapper`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {title && <label className="body__medium">{title}</label>}
      <div>
        <label className="body__medium">
          {type === "toggle" && (
            <>
              {v === true || v == true || v == 1 ? (
                <div
                  onClick={() => {
                    setValue(false);
                  }}
                  style={{ cursor: "pointer", width: 38 }}
                >
                  <ToggleEnabledIcon />
                </div>
              ) : (
                <div
                  onClick={() => {
                    setValue(true);
                  }}
                  style={{ cursor: "pointer", width: 38 }}
                >
                  <ToggleDisabledIcon />
                </div>
              )}
            </>
          )}
          {type === "checkbox" && (
            <>
              <input
                type="checkbox"
                checked={v === true || v == true || v == 1}
                onChange={handleOnChange}
              />{" "}
              {label}
            </>
          )}
        </label>
        <div style={{ paddingLeft: 24 }}>
          {helpText && <HelpText text={helpText} />}
        </div>
      </div>
    </div>
  );
};

export default CheckboxField;
