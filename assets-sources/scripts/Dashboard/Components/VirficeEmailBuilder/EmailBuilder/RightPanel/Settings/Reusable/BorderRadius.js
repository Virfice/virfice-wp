import React from "react";
import { getElementComputedStylePixelValue } from "../utils";
import RangeField from "@molecules/Rangefield";

const BorderRadius = ({ element }) => {
  return (
    <>
      <RangeField
        label={"Radius"}
        value={getElementComputedStylePixelValue(element, "border-radius")}
        onChange={(v) => {
          element.style.borderRadius = `${v}px`;
        }}
        min={0}
        max={300}
        step={1}
      />
    </>
  );
};

export default BorderRadius;
