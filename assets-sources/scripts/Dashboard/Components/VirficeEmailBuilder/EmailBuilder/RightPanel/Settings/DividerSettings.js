import React from "react";
import Tab from "../../../../Tab";
import TabHeader from "../../../../Tab/TabHeader";
import TabContent from "../../../../Tab/TabContent";
import TabHead from "../../../../Tab/TabHead";
import Divider from "@molecules/Divider";
import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import RangeField from "@molecules/Rangefield";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "./utils";
import PaintField from "@molecules/Paintfield";

const DividerSettings = ({ element }) => {
  return (
    <>
      <Tab>
        <TabHead>
          <TabHeader index={0}>Format</TabHeader>
          <TabHeader index={1}>Design</TabHeader>
        </TabHead>
        <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
        <TabContent index={0}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            content settings
          </div>
        </TabContent>
        <TabContent index={1}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <PaintField
              label={"Fill"}
              value={getElementComputedStyle(element, "background-color")}
              onChange={(v) => {
                element.style.backgroundColor = v;
              }}
            />
            <RangeField
              label={"Size"}
              value={getElementComputedStylePixelValue(element, "height")}
              onChange={(v) => {
                element.style.height = `${v}px`;
              }}
              min={0}
              max={300}
              step={1}
            />
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default DividerSettings;
