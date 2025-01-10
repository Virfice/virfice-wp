import React, { useEffect, useState } from "react";
import MediaUploader from "@molecules/MediaUploader";
import RangeField from "@molecules/Rangefield";
import Tab from "../../../../Tab";
import TabHead from "../../../../Tab/TabHead";
import TabHeader from "../../../../Tab/TabHeader";
import Divider from "@molecules/Divider";
import TabContent from "../../../../Tab/TabContent";
import { VIRFICE_APP_PREFIX } from "@conf";
import { getElementComputedStylePercentageValue } from "./utils";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@svg-icons";
import ToggleButton from "@molecules/ToggleButton";
import Reusable from "./Reusable";
import TextField from "@molecules/TextField";
import CheckboxField from "@molecules/CheckboxField";
import DisabledParentSettings from "./DisabledParentSettings";

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

  console.log(element, element.getAttribute("alt"));
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
                element.src = media.url;
              }}
              info={"An image you want to show in the email header."}
            />

            <TextField
              label={"Alt text"}
              value={element.alt || ""}
              onChange={(v) => {
                console.log(v);
                element.alt = v;
              }}
            />

            <TextField
              label={"URL"}
              value={element.parentElement.href}
              onChange={(v) => {
                element.parentElement.href = v;
              }}
            />
            <CheckboxField
              label={"Open in a new tab"}
              value={element.parentElement.target || false}
              onChange={(v) => {
                element.parentElement.target = v ? "_blank" : "";
              }}
            />
          </div>
        </TabContent>
        <TabContent index={1}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <div className="title__medium">Layout</div>
            <RangeField
              label={"Image size"}
              value={getElementComputedStylePercentageValue(element, "width")}
              onChange={(v) => {
                element.style.width = `${v}%`;
              }}
              min={1}
              max={100}
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

            <Reusable
              element={element}
              type="border"
              borderConf={{
                widthTitle: "Image border width",
                colorTitle: "Image border color",
              }}
            />
            <Divider
              style={{ marginLeft: -20, marginTop: 8, marginBottom: 8 }}
              extraWidth={"40px"}
            />
            <Reusable
              element={element}
              type="border-radius"
              title="Image radius"
            />
            <Divider
              style={{ marginLeft: -20, marginTop: 8, marginBottom: 8 }}
              extraWidth={"40px"}
            />

            <DisabledParentSettings element={element} />
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default ImageSettings;
