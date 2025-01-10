import React, { useState } from "react";
import { getElementComputedStylePixelValue } from "../utils";
import RangeField from "@molecules/Rangefield";
import Button from "@molecules/Button";
import {
  RadiusFull,
  RadiusTopRightIcon,
  RadiusTopLeftIcon,
  RadiusBottomLeftIcon,
  RadiusBottomRightIcon,
} from "@svg-icons";
import { VIRFICE_APP_PREFIX } from "@conf";

const BorderRadius = ({ element, borderRadiusConf, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={VIRFICE_APP_PREFIX + "-flex-space-between"}>
        <div className="title__medium">{title || "Border radius"}</div>
        <Button
          icon={<RadiusFull />}
          type="tertiary"
          onClick={() => {
            setOpen(!open);
          }}
          isActive={open}
        />
      </div>

      {open ? (
        <>
          <RangeField
            label={"Top-left"}
            icon={<RadiusTopLeftIcon />}
            value={getElementComputedStylePixelValue(
              element,
              "border-top-left-radius"
            )}
            onChange={(v) => {
              element.style.borderTopLeftRadius = `${v}px`;
            }}
            min={borderRadiusConf?.min || 0}
            max={borderRadiusConf?.max || 150}
            step={1}
          />
          <RangeField
            label={"Top-right"}
            icon={<RadiusTopRightIcon />}
            value={getElementComputedStylePixelValue(
              element,
              "border-top-right-radius"
            )}
            onChange={(v) => {
              element.style.borderTopRightRadius = `${v}px`;
            }}
            min={0}
            max={150}
            step={1}
          />
          <RangeField
            label={"Bottom-left"}
            icon={<RadiusBottomLeftIcon />}
            value={getElementComputedStylePixelValue(
              element,
              "border-bottom-left-radius"
            )}
            onChange={(v) => {
              element.style.borderBottomLeftRadius = `${v}px`;
            }}
            min={0}
            max={150}
            step={1}
          />
          <RangeField
            label={"Bottom-right"}
            icon={<RadiusBottomRightIcon />}
            value={getElementComputedStylePixelValue(
              element,
              "border-bottom-right-radius"
            )}
            onChange={(v) => {
              element.style.borderBottomRightRadius = `${v}px`;
            }}
            min={0}
            max={150}
            step={1}
          />
        </>
      ) : (
        <>
          <RangeField
            label={"Value"}
            value={getElementComputedStylePixelValue(element, "border-radius")}
            onChange={(v) => {
              element.style.borderRadius = `${v}px`;
            }}
            min={borderRadiusConf?.min || 0}
            max={borderRadiusConf?.mix || 150}
            step={1}
          />
        </>
      )}
    </>
  );
};

export default BorderRadius;
