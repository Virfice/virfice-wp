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
import { getElementUsingMySelector } from "../../utils";

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
  const image = getElementUsingMySelector(element, "image");

  if (!image) return null;

  const [position, setPosition] = useState(getPosition(element));
  useEffect(() => {
    setPosition(getPosition(image));
  }, [image]);

  const handleImagePosition = (position) => {
    if (position === "left") {
      image.style.marginLeft = "0px";
    }
    if (position === "right") {
      image.style.marginLeft = "auto";
      image.style.marginRight = "0px";
    }
    if (position === "center") {
      image.style.marginLeft = "auto";
      image.style.marginRight = "auto";
    }
    setPosition(getPosition(image));
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
              value={image.src}
              onDelete={() => {
                // settingsChange("woocommerce_email_header_image", "");
              }}
              onSelect={(media) => {
                // settingsChange("woocommerce_email_header_image", media.url);
                image.src = media.url;
              }}
              info={"An image you want to show in the email header."}
            />

            <TextField
              label={"Alt text"}
              value={image.alt || ""}
              onChange={(v) => {
                console.log(v);
                image.alt = v;
              }}
            />

            <TextField
              label={"URL"}
              value={element.href}
              onChange={(v) => {
                element.href = v;
              }}
            />
            <CheckboxField
              label={"Open in a new tab"}
              value={element.target || false}
              onChange={(v) => {
                element.target = v ? "_blank" : "";
              }}
            />
          </div>
        </TabContent>
        <TabContent index={1}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <div className="title__medium">Layout</div>
            <RangeField
              label={"Image size"}
              value={getElementComputedStylePercentageValue(image, "width")}
              onChange={(v) => {
                image.style.width = `${v}%`;
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
              element={image}
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
              element={image}
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
