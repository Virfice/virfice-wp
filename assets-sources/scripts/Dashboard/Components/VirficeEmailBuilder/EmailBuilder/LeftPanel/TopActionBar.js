import React, { useState } from "react";
import Button from "@molecules/Button";
import {
  VIRFICE_APP_PREFIX,
  VIRFICE_RESPONSIVE_BREAKPOINTS,
} from "../../../../../conf";
import { LaptopIcon, MobileIcon } from "../../../../icons";
import SendButtonRecipientsPopup from "./SendButtonRecipientsPopup";

const TopActionBar = () => {
  const [activeDevice, setActiveDevice] = useState("Laptop");

  const changeIframeWidth = (deviceName) => {
    let iframe = document.getElementById(VIRFICE_APP_PREFIX + "-email-preview");

    if (deviceName === "Laptop") {
      iframe.style.width = VIRFICE_RESPONSIVE_BREAKPOINTS.desktop;
    } else if (deviceName === "Mobile") {
      iframe.style.width = VIRFICE_RESPONSIVE_BREAKPOINTS.mobile;
      iframe.style.marginLeft = "auto";
      iframe.style.marginRight = "auto";
    }

    setActiveDevice(deviceName);
  };

  return (
    <div
      className={`${VIRFICE_APP_PREFIX}-card-header ${VIRFICE_APP_PREFIX}-flex-space-between ${VIRFICE_APP_PREFIX}-w-100`}
    >
      <div className={`${VIRFICE_APP_PREFIX}-flex`}>
        <Button
          type={"tertiary"}
          icon={<LaptopIcon />}
          isActive={activeDevice === "Laptop"}
          onClick={() => {
            changeIframeWidth("Laptop");
          }}
        />
        <Button
          type={"tertiary"}
          icon={<MobileIcon />}
          isActive={activeDevice === "Mobile"}
          onClick={() => {
            changeIframeWidth("Mobile");
          }}
        />
      </div>
      <SendButtonRecipientsPopup />
    </div>
  );
};

export default TopActionBar;
