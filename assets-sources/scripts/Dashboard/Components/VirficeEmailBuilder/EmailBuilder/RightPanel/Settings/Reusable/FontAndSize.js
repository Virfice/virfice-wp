import React from "react";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "../utils";
import RangeField from "@molecules/Rangefield";
import SelectField from "@molecules/SelectField";
import { getSelectOptionsValueFromOptions } from "@functions";

// Arial
// Helvetica
// Verdana
// Georgia
// Times New Roman
// Tahoma
// Gill Sans
// Trebuchet MS
// Lucida Grande
// Montserrat
// Source Sans
// Garamond
// Futura
// Palatino
// Rockwell

const FONT_FAMILY_LIST = [
  { value: "", title: "Select" },
  { value: "arial", title: "Arial" },
  { value: "helvetica", title: "Helvetica" },
  { value: "verdana", title: "Verdana" },
  { value: "georgia", title: "Georgia" },
  { value: "times new roman", title: "Times New Roman" },
  { value: "tahoma", title: "Tahoma" },
  { value: "gill sans", title: "Gill Sans" },
  { value: "trebuchet ms", title: "Trebuchet MS" },
  { value: "lucida grande", title: "Lucida Grande" },
  { value: "montserrat", title: "Montserrat" },
  { value: "source sans", title: "Source Sans" },
  { value: "garamond", title: "Garamond" },
  { value: "futura", title: "Futura" },
  { value: "palatino", title: "Palatino" },
  { value: "rockwell", title: "Rockwell" },
];
const FontAndSize = ({ element, eleArr }) => {
  return (
    <>
      <SelectField
        label={"Font"}
        value={getSelectOptionsValueFromOptions(
          FONT_FAMILY_LIST,
          getElementComputedStyle(element, "font-family")
        )}
        options={FONT_FAMILY_LIST}
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
