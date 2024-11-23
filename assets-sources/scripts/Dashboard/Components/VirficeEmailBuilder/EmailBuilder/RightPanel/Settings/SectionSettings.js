import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import PaintField from "@molecules/Paintfield";
import { getElementComputedStyle } from "./utils";
import ChildList from "./Components/ChildList";
import Divider from "@molecules/Divider";

const SectionSettings = ({ element }) => {
  return (
    <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
      <ChildList element={element} />
      <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
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
