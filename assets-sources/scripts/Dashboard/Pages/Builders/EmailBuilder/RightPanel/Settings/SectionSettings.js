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
