import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "@conf";
import classNames from "classnames";

const ToggleButton = ({
  label = "",
  value = "",
  onChange = () => {},
  options = [],
}) => {
  const [v, setV] = useState(value);

  useEffect(() => {
    setV(value);
  }, [value]);
  const _onClick = (value) => {
    // console.log(value);
    setV(value);
    onChange(value);
  };
  const className = classnames({
    [VIRFICE_APP_PREFIX + "-toggle-btn"]: true,
  });
  return (
    <div className={className}>
      {label && <label className="body__medium">{label}</label>}
      <div className={VIRFICE_APP_PREFIX + "-toggle-btn__wrapper"}>
        {options.map((option) => {
          return (
            <div
              key={option.value}
              className={classNames({
                [VIRFICE_APP_PREFIX + "-toggle-btn__option"]: true,
                [VIRFICE_APP_PREFIX + "-toggle-btn__option--active"]:
                  v === option.value,
              })}
              onClick={() => {
                _onClick(option.value);
              }}
            >
              {option.component}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleButton;
