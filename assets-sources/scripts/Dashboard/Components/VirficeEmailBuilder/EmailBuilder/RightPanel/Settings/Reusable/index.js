import React from "react";
import PaintField from "../../../../../../Molecules/Paintfield";
import RangeField from "../../../../../../Molecules/Rangefield";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "../utils";

const Reusable = ({ element, type }) => {
  switch (type) {
    case "background": {
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
    }

    case "padding": {
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
    }

    default:
      return <>Not implemented</>;
  }
};

export default Reusable;
