import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import PaintField from "@molecules/Paintfield";
import {
  getElementComputedStyle,
  getElementComputedStylePixelValue,
} from "./utils";
import ChildList from "./Components/ChildList";
import Divider from "@molecules/Divider";
import RangeField from "@molecules/RangeField";
import Reusable from "./Reusable";
import { getChildElements } from "../../utils";

const RowSettings = ({ element }) => {
  const childs = getChildElements(element);
  return (
    <>
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
        <Reusable element={element} type="background" />

        <Divider
          style={{ marginLeft: -20, marginBottom: 0 }}
          extraWidth={"40px"}
        />

        <div className="title__medium">Spacing</div>
        <RangeField
          label={"Between columns"}
          value={
            getElementComputedStylePixelValue(childs[0], "padding-right") * 2
          }
          onChange={(v) => {
            childs.forEach((ele) => {
              ele.style.paddingLeft = `${v / 2}px`;
              ele.style.paddingRight = `${v / 2}px`;
            });
          }}
          min={0}
          max={150}
          step={1}
        />
        <RangeField
          label={"Between rows"}
          value={
            getElementComputedStylePixelValue(childs[0], "padding-bottom") * 2
          }
          onChange={(v) => {
            childs.forEach((ele) => {
              ele.style.paddingTop = `${v / 2}px`;
              ele.style.paddingBottom = `${v / 2}px`;
            });
          }}
          min={0}
          max={150}
          step={1}
        />
      </div>
    </>
  );
};

export default RowSettings;
