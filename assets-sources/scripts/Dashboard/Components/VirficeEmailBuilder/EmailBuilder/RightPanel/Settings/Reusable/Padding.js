import React from "react";
import { getElementComputedStylePixelValue } from "../utils";
import RangeField from "@molecules/Rangefield";

const Padding = ({ element }) => {
  return (
    <>
      <div className="title__medium">Padding</div>
      <RangeField
        label={"Top"}
        value={getElementComputedStylePixelValue(element, "padding-top")}
        onChange={(v) => {
          element.style.paddingTop = `${v}px`;
        }}
        min={0}
        max={150}
        step={1}
      />
      <RangeField
        label={"Bottom"}
        value={getElementComputedStylePixelValue(element, "padding-bottom")}
        onChange={(v) => {
          element.style.paddingBottom = `${v}px`;
        }}
        min={0}
        max={150}
        step={1}
      />
      <RangeField
        label={"Left"}
        value={getElementComputedStylePixelValue(element, "padding-left")}
        onChange={(v) => {
          element.style.paddingLeft = `${v}px`;
        }}
        min={0}
        max={150}
        step={1}
      />
      <RangeField
        label={"Right"}
        value={getElementComputedStylePixelValue(element, "padding-right")}
        onChange={(v) => {
          element.style.paddingRight = `${v}px`;
        }}
        min={0}
        max={150}
        step={1}
      />
    </>
  );
};

export default Padding;
