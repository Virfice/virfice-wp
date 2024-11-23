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

const LinkSettings = ({ element }) => {
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
            <PaintField
              label={"Text color"}
              value={getElementComputedStyle(element, "color")}
              onChange={(v) => {
                element.style.color = v;
              }}
            />

            <Reusable element={element} type="background" />
            <Reusable element={element} type="border-radius" />
            <Reusable element={element} type="padding" />
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default LinkSettings;
