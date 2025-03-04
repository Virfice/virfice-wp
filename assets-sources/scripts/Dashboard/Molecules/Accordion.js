import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "@conf";
import { UpIcon, DownIcon } from "@svg-icons";

const Accordion = ({ open, title, className = false, children, onOpen }) => {
  const [stateOpen, setStateOpen] = useState(open);

  useEffect(() => {
    setStateOpen(open);
  }, [open]);

  useEffect(() => {
    if (stateOpen && onOpen) {
      onOpen();
    }
  }, [stateOpen]);
  const cn = classnames(
    {
      [VIRFICE_APP_PREFIX + "-accordion"]: true,
    },
    className
  );

  return (
    <div className={cn}>
      <div
        className={`${VIRFICE_APP_PREFIX}-accordion-header ${
          stateOpen ? ` ${VIRFICE_APP_PREFIX}-active` : ""
        }`}
        onClick={() => {
          setStateOpen(!stateOpen);
        }}
      >
        <div>{title}</div>
        {stateOpen ? <UpIcon /> : <DownIcon />}
      </div>

      {stateOpen && (
        <div className={VIRFICE_APP_PREFIX + "-accordion-content"}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
