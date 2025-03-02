import React, { useState } from "react";
import Button from "@molecules/Button";
import { VIRFICE_APP_PREFIX, VIRFICE_RESPONSIVE_BREAKPOINTS } from "@conf";
import { LaptopIcon, MobileIcon } from "@svg-icons";
import SendButtonRecipientsPopup from "./SendButtonRecipientsPopup";
import { useSelector } from "react-redux";
import { getIframe } from "../utils";

const TopActionBar = () => {
  const emailSettings = useSelector(
    (state) => state.wooEmailSingle?.email?.settings
  );
  const [activeDevice, setActiveDevice] = useState("Laptop");

  const changeIframeWidth = (deviceName) => {
    const iframe = getIframe().templateWrapper;

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
      {emailSettings.title && (
        <div
          className={`title__medium`}
          style={{ display: "flex", alignItems: "center" }}
        >
          {emailSettings.title}
        </div>
      )}
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
