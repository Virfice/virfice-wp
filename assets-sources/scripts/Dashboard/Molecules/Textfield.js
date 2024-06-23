import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "../../conf";
import HelpText from "./HelpText";

const Textfield = ({ placeholder, label, value, helpText, onChange = () => {}, multiline=false }) => {
  const [v, setV] = useState(value);

  useEffect(()=>{
    setV(value);
  }, [value]);
  const handleOnChange = (e) => {
    setV(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className={`${VIRFICE_APP_PREFIX}-textfileld-wrapper`}>
      {label && <label className="body__medium">{label}</label>}
      {!multiline && <input placeholder={placeholder || label} value={v} onChange={handleOnChange} />}
      {multiline && <textarea placeholder={placeholder || label} value={v} onChange={handleOnChange} rows={multiline}></textarea>}
      {helpText && <HelpText text={helpText} />}
    </div>
  );
};

export default Textfield;
