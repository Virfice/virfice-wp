import React from "react";
import { getElementComputedStylePixelValue } from "../utils";
import RangeField from "@molecules/Rangefield";
import { VIRFICE_APP_PREFIX } from "@conf";

const BORDER_STYLES = ["none", "solid", "dotted", "dashed", "double"];
const BorderType = ({ element, eleArr }) => {
  const handleBorderStyleChange = (v) => {
    element.style.borderStyle = v;
  };
  return (
    <>
      <div className={VIRFICE_APP_PREFIX + "-border-type-selection"}>
        {BORDER_STYLES.map((v) => (
          <div
            className={VIRFICE_APP_PREFIX + "-border-type-selection-item"}
            onClick={() => {
              handleBorderStyleChange(v);
            }}
            key={v}
          >
            <span style={{ borderTopStyle: v }}></span>
          </div>
        ))}
      </div>
      <RangeField
        label={"Divider width"}
        value={getElementComputedStylePixelValue(element, "border-top-width")}
        onChange={(v) => {
          if (eleArr) {
            eleArr.forEach((ele) => {
              ele.style.borderTopWidth = `${v}px`;
            });
          } else {
            element.style.borderTopWidth = `${v}px`;
          }
        }}
        min={0}
        max={20}
        step={1}
      />
    </>
  );
};

export default BorderType;
