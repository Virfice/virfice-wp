import React from "react";
import Tab from "../../../../Tab";
import TabHeader from "../../../../Tab/TabHeader";
import TabContent from "../../../../Tab/TabContent";
import TabHead from "../../../../Tab/TabHead";
import Divider from "@molecules/Divider";
import { VIRFICE_APP_PREFIX } from "@conf";
import RangeField from "@molecules/Rangefield";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "./utils";
import PaintField from "@molecules/Paintfield";
import DisabledParentSettings from "./DisabledParentSettings";
import Reusable from "./Reusable";

const DividerSettings = ({ element }) => {
  return (
    <>
      <Tab>
        <TabHead>
          <TabHeader index={0}>Type</TabHeader>
          <TabHeader index={1}>Design</TabHeader>
        </TabHead>
        <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
        <TabContent index={0}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <Reusable element={element} type="border-type" />
          </div>
        </TabContent>
        <TabContent index={1}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <PaintField
              label={"Divider color"}
              value={getElementComputedStyle(element, "color")}
              onChange={(v) => {
                element.style.color = v;
              }}
            />

            <DisabledParentSettings element={element} />
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default DividerSettings;
