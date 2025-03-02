import React from "react";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "../utils";
import PaintField from "@molecules/Paintfield";
import RangeField from "@molecules/Rangefield";
import Border from "./Border";

const Background = ({ element, disableTitle = false }) => {
  return (
    <>
      {!disableTitle && <div className="title__medium">Background</div>}

      <PaintField
        label={"Fill color"}
        value={getElementComputedStyle(element, "background-color")}
        onChange={(v) => {
          element.style.backgroundColor = v;
        }}
      />

      <Border element={element} />
    </>
  );
};

export default Background;
