import React from "react";
import Tab from "../../../../../Components/Tab";
import TabHeader from "../../../../../Components/Tab/TabHeader";
import TabContent from "../../../../../Components/Tab/TabContent";
import TabHead from "../../../../../Components/Tab/TabHead";
import Divider from "../../../../../Molecules/Divider";
import TextField from "../../../../../Molecules/TextField";
import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import PaintField from "../../../../../Molecules/Paintfield";
import { getElementComputedStyle } from "./utils";

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
            <PaintField
              label={"Background color"}
              value={getElementComputedStyle(element, "background-color")}
              onChange={(v) => {
                element.style.backgroundColor = v;
              }}
            />
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default LinkSettings;
