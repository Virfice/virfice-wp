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
import CheckboxField from "@molecules/CheckboxField";
import ToggleButton from "@molecules/ToggleButton";
import DisabledParentSettings from "./DisabledParentSettings";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@svg-icons";
import { getParentElement } from "../../utils";

const LinkSettings = ({ element }) => {
  const parent = getParentElement(element);
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
              // multiline={6}
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
            <Reusable element={element} type="font-and-size" />
          </div>
        </TabContent>
        <TabContent index={1}>
          <div className="title__medium">Button</div>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <PaintField
              label={"Text color"}
              value={getElementComputedStyle(element, "color")}
              onChange={(v) => {
                element.style.color = v;
              }}
            />

            <Reusable element={element} type="background" disableTitle />
            <ToggleButton
              label={"Position"}
              value={getElementComputedStyle(parent, "text-align")}
              options={[
                { value: "left", component: <AlignLeftIcon /> },
                { value: "center", component: <AlignCenterIcon /> },
                { value: "right", component: <AlignRightIcon /> },
              ]}
              onChange={(v) => {
                parent.style.textAlign = v;
              }}
            />

            <Divider
              style={{ marginLeft: -20, marginTop: 8, marginBottom: 8 }}
              extraWidth={"40px"}
            />

            <Reusable
              element={element}
              type="border-radius"
              borderRadiusConf={{ min: 0, max: 100 }}
              title="Button radius"
            />
            <Divider
              style={{ marginLeft: -20, marginTop: 8, marginBottom: 8 }}
              extraWidth={"40px"}
            />
            <Reusable element={element} type="padding" title="Button padding" />
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

export default LinkSettings;
