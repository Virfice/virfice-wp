import React, { useEffect, useState } from "react";
import MediaUploader from "../../../../../Molecules/MediaUploader";
import PaintField from "../../../../../Molecules/Paintfield";
import RangeField from "../../../../../Molecules/Rangefield";
import Tab from "../../../../Tab";
import TabHead from "../../../../Tab/TabHead";
import TabHeader from "../../../../Tab/TabHeader";
import Divider from "../../../../../Molecules/Divider";
import TabContent from "../../../../Tab/TabContent";
import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import { getElementComputedStyle } from "./utils";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from "../../../../../icons";
import ToggleButton from "../../../../../Molecules/ToggleButton";

const getPosition = (element) => {
  if (
    element.style.marginLeft === "auto" &&
    element.style.marginRight === "auto"
  ) {
    return "center";
  }
  if (element.style.marginLeft === "0px") {
    return "left";
  }
  if (element.style.marginLeft === "auto") {
    return "right";
  }

  return "left";
};

const ImageSettings = ({ element }) => {
  const [position, setPosition] = useState(getPosition(element));

  let width = getElementComputedStyle(element, "width").replace("px", "");

  useEffect(() => {
    setPosition(getPosition(element));
  }, [element]);

  const handleImagePosition = (position) => {
    if (position === "left") {
      element.style.marginLeft = "0px";
    }
    if (position === "right") {
      element.style.marginLeft = "auto";
      element.style.marginRight = "0px";
    }
    if (position === "center") {
      element.style.marginLeft = "auto";
      element.style.marginRight = "auto";
    }
    setPosition(getPosition(element));
  };
  return (
    <>
      <Tab>
        <TabHead>
          <TabHeader index={0}>Content</TabHeader>
          <TabHeader index={1}>Design</TabHeader>
        </TabHead>
        <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
        <TabContent index={0}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <MediaUploader
              label={"Change Image"}
              value={element.src}
              onDelete={() => {
                // settingsChange("woocommerce_email_header_image", "");
              }}
              onSelect={(media) => {
                // settingsChange("woocommerce_email_header_image", media.url);
                console.log(media);
                element.src = media.url;
              }}
              info={"An image you want to show in the email header."}
            />
          </div>
        </TabContent>
        <TabContent index={1}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <RangeField
              label={"Width"}
              value={width}
              onChange={(v) => {
                element.style.width = `${v}px`;
              }}
              min={10}
              max={700}
              step={1}
            />
            <ToggleButton
              label={"Position"}
              value={position}
              options={[
                { value: "left", component: <AlignLeftIcon /> },
                { value: "center", component: <AlignCenterIcon /> },
                { value: "right", component: <AlignRightIcon /> },
              ]}
              onChange={handleImagePosition}
            />
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default ImageSettings;
