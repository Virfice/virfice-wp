import React from "react";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "../utils";
import RangeField from "@molecules/Rangefield";
import SelectField from "@molecules/SelectField";
import { getSelectOptionsValueFromOptions } from "@functions";

const FontAndSize = ({ element, eleArr }) => {
  return (
    <>
      <SelectField
        label={"Font family"}
        value={getSelectOptionsValueFromOptions(
          [
            { value: "", title: "Select" },
            { value: "inter", title: "Inter" },
          ],
          getElementComputedStyle(element, "font-family")
        )}
        options={[
          { value: "", title: "Select" },
          { value: "inter", title: "Inter" },
        ]}
        onChange={(v) => {
          if (eleArr) {
            eleArr.forEach((ele) => {
              ele.style.fontFamily = v.value;
            });
          } else {
            element.style.fontFamily = v.value;
          }
        }}
      />
      <RangeField
        label={"Size"}
        value={getElementComputedStylePixelValue(element, "font-size")}
        onChange={(v) => {
          if (eleArr) {
            eleArr.forEach((ele) => {
              ele.style.fontSize = `${v}px`;
            });
          } else {
            element.style.fontSize = `${v}px`;
          }
        }}
        min={6}
        max={200}
        step={1}
      />
    </>
  );
};

export default FontAndSize;
