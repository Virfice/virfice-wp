import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "@conf";
import { UpIcon, DownIcon } from "@svg-icons";

const Accordion = ({ open, title, className = false, children }) => {
  const [stateOpen, setStateOpen] = useState(open);

  useEffect(() => {
    setStateOpen(open);
  }, [open]);
  const cn = classnames(
    {
      [VIRFICE_APP_PREFIX + "-accordion"]: true,
    },
    className
  );

  console.log(children);

  return (
    <div className={cn}>
      <div
        className={VIRFICE_APP_PREFIX + "-accordion-header"}
        onClick={() => {
          setStateOpen(!stateOpen);
        }}
      >
        <div>{title}</div>
        {stateOpen ? <UpIcon /> : <DownIcon />}
      </div>

      {stateOpen && (
        <div classNames={VIRFICE_APP_PREFIX + "-accordion-content"}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
