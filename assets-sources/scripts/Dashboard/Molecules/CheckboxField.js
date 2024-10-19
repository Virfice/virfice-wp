import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "../../conf";
import HelpText from "./HelpText";

const CheckboxField = ({
  title,
  label,
  value,
  helpText,
  onChange = () => {},
}) => {
  const [v, setV] = useState(value);

  useEffect(() => {
    setV(value);
  }, [value]);
  const handleOnChange = (e) => {
    setV(e.target.checked);
    onChange(e.target.checked);
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
          <input
            type="checkbox"
            checked={v === true || v == true || v == 1}
            onChange={handleOnChange}
          />{" "}
          {label}
        </label>
        <div style={{ paddingLeft: 24 }}>
          {helpText && <HelpText text={helpText} />}
        </div>
      </div>
    </div>
  );
};

export default CheckboxField;
