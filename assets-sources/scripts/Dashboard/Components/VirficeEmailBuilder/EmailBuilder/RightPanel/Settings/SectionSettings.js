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

const SectionSettings = ({ element }) => {
  return (
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
  );
};

export default SectionSettings;
