import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTemplate } from "../builderSlice";
import DesktopTopBar from "./DesktopTopBar";
import Iframe from "@molecules/Iframe";
import Button from "@molecules/Button";
import { VIRFICE_APP_PREFIX } from "@conf";
import { LaptopIcon, MobileIcon, CloseIcon } from "@svg-icons";

const VirficeEmailPreview = ({ template_id, onClose }) => {
  const dispatch = useDispatch();
  const preview_url = useSelector((state) => state.builder.preview_url);
  const global_style = useSelector((state) => state.builder.global_style);
  const html = useSelector((state) => state.builder.html);
  const [activeDevice, setActiveDevice] = useState("desktop");
  useEffect(() => {
    if (template_id) {
      console.log("get template html", template_id);
      dispatch(getSingleTemplate(template_id));
      //   dispatch(virficeBrandSettingsAsync());
    }
  }, [template_id]);

  const changeIframeWidth = (device) => {
    console.log(device);
    setActiveDevice(device);
  };
  return (
    <div className={`${VIRFICE_APP_PREFIX}-template-preview-wrapper`}>
      <div
        className={`${VIRFICE_APP_PREFIX}-desktop`}
        style={{ width: activeDevice === "desktop" ? 600 : 400 }}
      >
        {activeDevice === "desktop" && <DesktopTopBar />}
        <Iframe
          //   srcDoc={global_style + html}
          src={preview_url}
          style={{ width: activeDevice === "desktop" ? 600 : 400 }}
        />
      </div>

      <div className={`${VIRFICE_APP_PREFIX}-actions`}>
        <div className={`${VIRFICE_APP_PREFIX}-flex`}>
          <Button
            type={"tertiary"}
            icon={<LaptopIcon />}
            isActive={activeDevice === "desktop"}
            onClick={() => {
              changeIframeWidth("desktop");
            }}
          />
          <Button
            type={"tertiary"}
            icon={<MobileIcon />}
            isActive={activeDevice === "mobile"}
            onClick={() => {
              changeIframeWidth("mobile");
            }}
          />
          <Button type={"tertiary"} icon={<CloseIcon />} onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

export default VirficeEmailPreview;
