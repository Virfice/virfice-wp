import React from "react";
import Tab from "../../../../Tab";
import TabHeader from "../../../../Tab/TabHeader";
import TabContent from "../../../../Tab/TabContent";
import TabHead from "../../../../Tab/TabHead";
import Divider from "@molecules/Divider";
import TextField from "@molecules/TextField";
import { VIRFICE_APP_PREFIX } from "@conf";
import PaintField from "@molecules/Paintfield";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "./utils";
import RangeField from "@molecules/Rangefield";
import Reusable from "./Reusable";
import ToggleButton from "@molecules/ToggleButton";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@svg-icons";
import DisabledParentSettings from "./DisabledParentSettings";

const TextSettings = ({ element }) => {
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
            <TextField
              label={"Text"}
              value={element.innerText}
              onChange={(v) => {
                element.innerText = v;
              }}
              multiline={6}
            />
            <Reusable element={element} type="font-and-size" />
            <ToggleButton
              label={"Alignment"}
              value={getElementComputedStyle(element, "text-align")}
              options={[
                { value: "left", component: <AlignLeftIcon /> },
                { value: "center", component: <AlignCenterIcon /> },
                { value: "right", component: <AlignRightIcon /> },
              ]}
              onChange={(v) => {
                element.style.textAlign = v;
              }}
            />
          </div>
        </TabContent>
        <TabContent index={1}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <PaintField
              label={"Text color"}
              value={getElementComputedStyle(element, "color")}
              onChange={(v) => {
                element.style.color = v;
              }}
            />

            <Reusable element={element} type="background" />
            <Reusable element={element} type="padding" />

            {/* <DisabledParentSettings element={element} /> */}
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default TextSettings;
