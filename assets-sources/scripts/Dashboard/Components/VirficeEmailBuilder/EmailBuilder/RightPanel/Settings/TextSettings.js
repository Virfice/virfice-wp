import React from "react";
import Tab from "../../../../Tab";
import TabHeader from "../../../../Tab/TabHeader";
import TabContent from "../../../../Tab/TabContent";
import TabHead from "../../../../Tab/TabHead";
import Divider from "../../../../../Molecules/Divider";
import TextField from "../../../../../Molecules/TextField";
import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import PaintField from "../../../../../Molecules/Paintfield";
import { getElementComputedStyle } from "./utils";
import RangeField from "../../../../../Molecules/Rangefield";
import Reusable from "./Reusable";

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
            <RangeField
              label={"Font size"}
              value={getElementComputedStyle(element, "font-size").replace(
                "px",
                ""
              )}
              onChange={(v) => {
                element.style.fontSize = `${v}px`;
              }}
              min={8}
              max={100}
              step={1}
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
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default TextSettings;
