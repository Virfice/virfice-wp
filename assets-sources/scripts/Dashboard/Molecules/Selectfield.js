import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import useOutsideClick from "../../Hooks/useOutsideClick";
import HelpText from "./HelpText";

const SelectField = ({
  label,
  value,
  options,
  onChange,
  onSearchInputChange,
  helpText,
}) => {
  const [open, setOpen] = useState(false);
  // const [_value, _setValue] = useState(value);
  const [query, setQuery] = useState(false);

  const ref = useOutsideClick(() => {
    if (open) setOpen(false);
  });

  useEffect(() => {
    setQuery(false);
  }, [value]);

  const _onSearchInputChange = (e) => {
    if (onSearchInputChange) {
      setQuery(e.target.value);
      onSearchInputChange(e.target.value);
    }
  };

  return (
    <div className={`${VIRFICE_APP_PREFIX}-selectfileld-wrapper`}>
      {label && <label className="body__medium">{label}</label>}
      <div
        className={`${VIRFICE_APP_PREFIX}-w-100`}
        style={{ position: "relative" }}
      >
        <input
          className={`${VIRFICE_APP_PREFIX}-w-100`}
          placeholder={label}
          onFocus={() => {
            setOpen(true);
          }}
          // defaultValue={_value.title}
          value={query || value.title}
          onChange={_onSearchInputChange}
          disabled={!onSearchInputChange && open}
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 8, right: 12 }}
        >
          <path
            d="M16.25 7.5L10 13.75L3.75 7.5"
            stroke="#666666"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {open && (
          <div ref={ref}>
            {/* <div
              className={`${VIRFICE_APP_PREFIX}-backdrop`}
              onClick={() => {
                setOpen(false);
              }}
            ></div> */}
            <ul>
              {options.map((v) => (
                <li
                  onClick={() => {
                    setQuery(v.title);
                    onChange(v);
                    setOpen(false);
                  }}
                  key={v.value}
                >
                  {v.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {helpText && <HelpText text={helpText} />}
    </div>
  );
};

export default SelectField;
