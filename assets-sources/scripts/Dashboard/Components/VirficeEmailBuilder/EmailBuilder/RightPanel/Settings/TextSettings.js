import React from "react";
import Tab from "../../../../Tab";
import TabHeader from "../../../../Tab/TabHeader";
import TabContent from "../../../../Tab/TabContent";
import TabHead from "../../../../Tab/TabHead";
import Divider from "@molecules/Divider";
import TextField from "@molecules/TextField";
import { VIRFICE_APP_PREFIX } from "@conf";
import PaintField from "@molecules/Paintfield";
import { getElementComputedStyle } from "./utils";
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
              value={element.innerHTML}
              onChange={(v) => {
                element.innerHTML = v;
              }}
              multiline={6}
              richText
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
            <div className="title__medium">Text</div>
            <PaintField
              label={"Text color"}
              value={getElementComputedStyle(element, "color")}
              onChange={(v) => {
                element.style.color = v;
              }}
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

export default TextSettings;
