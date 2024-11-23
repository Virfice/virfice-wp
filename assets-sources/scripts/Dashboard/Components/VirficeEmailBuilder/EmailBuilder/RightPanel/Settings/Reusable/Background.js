import React from "react";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "../utils";
import PaintField from "../../../../../../Molecules/Paintfield";
import RangeField from "../../../../../../Molecules/Rangefield";

const Background = ({ element }) => {
  return (
    <>
      <div className="title__medium">Background</div>

      <PaintField
        label={"Background color"}
        value={getElementComputedStyle(element, "background-color")}
        onChange={(v) => {
          element.style.backgroundColor = v;
        }}
      />

      <RangeField
        label={"Border Width"}
        value={getElementComputedStylePixelValue(element, "border-width")}
        onChange={(v) => {
          element.style.borderWidth = `${v}px`;
          element.style.borderStyle = `solid`;
        }}
        min={0}
        max={50}
        step={1}
      />
      <PaintField
        label={"Border color"}
        value={getElementComputedStyle(element, "border-color")}
        onChange={(v) => {
          element.style.borderColor = v;
        }}
      />
    </>
  );
};

export default Background;
