import React from "react";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "../utils";
import PaintField from "@molecules/Paintfield";
import RangeField from "@molecules/Rangefield";

const Border = ({ element, borderConf }) => {
  return (
    <>
      <PaintField
        label={borderConf?.colorTitle || "Border color"}
        value={getElementComputedStyle(element, "border-color")}
        onChange={(v) => {
          element.style.borderColor = v;
        }}
      />

      <RangeField
        label={borderConf?.widthTitle || "Border width"}
        value={getElementComputedStylePixelValue(element, "border-width")}
        onChange={(v) => {
          element.style.borderWidth = `${v}px`;
          element.style.borderStyle = `solid`;
        }}
        min={0}
        max={50}
        step={1}
      />
    </>
  );
};

export default Border;
