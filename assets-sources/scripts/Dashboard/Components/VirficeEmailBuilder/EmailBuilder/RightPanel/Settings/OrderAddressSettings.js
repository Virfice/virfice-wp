import React from "react";
import Tab from "../../../../Tab";
import TabHeader from "../../../../Tab/TabHeader";
import TabContent from "../../../../Tab/TabContent";
import TabHead from "../../../../Tab/TabHead";
import Divider from "@molecules/Divider";
import { VIRFICE_APP_PREFIX } from "@conf";
import PaintField from "@molecules/Paintfield";
import ToggleButton from "@molecules/ToggleButton";
import { getElementComputedStyle } from "./utils";
import Reusable from "./Reusable";
import { getParentSection } from "../../utils";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "@svg-icons";

const OrderAddressSettings = ({ element }) => {
  const parentSection = getParentSection(element);
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
          <div className="title__medium">Colors</div>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <PaintField
              label={"Text color"}
              value={getElementComputedStyle(element, "color")}
              onChange={(v) => {
                element.style.color = v;
              }}
            />

            <Reusable element={parentSection} type="background" />
            <Reusable element={parentSection} type="border-radius" />
            <Reusable element={parentSection} type="padding" />
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default OrderAddressSettings;
