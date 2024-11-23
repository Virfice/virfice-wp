import React from "react";
import Tab from "../../../../Tab";
import TabHeader from "../../../../Tab/TabHeader";
import TabContent from "../../../../Tab/TabContent";
import TabHead from "../../../../Tab/TabHead";
import Divider from "@molecules/Divider";
import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import PaintField from "@molecules/Paintfield";
import { getElementComputedStyle } from "./utils";
import Reusable from "./Reusable";

const OrderTableSettings = ({ element }) => {
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
            <div className="title__medium">Order table item</div>
            <Reusable element={element} type="font-and-size" />
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

export default OrderTableSettings;
