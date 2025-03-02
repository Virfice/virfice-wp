import React, { useState } from "react";
import { getElementComputedStylePixelValue } from "../utils";
import RangeField from "@molecules/Rangefield";
import Button from "@molecules/Button";
import {
  PaddingFull,
  PaddingIcon,
  PaddingTopIcon,
  PaddingBottomIcon,
  PaddingLeftIcon,
  PaddingRightIcon,
} from "@svg-icons";
import { VIRFICE_APP_PREFIX } from "@conf";

const Padding = ({ element, title }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={VIRFICE_APP_PREFIX + "-flex-space-between"}>
        <div className="title__medium">{title || "Padding"}</div>
        <Button
          icon={<PaddingFull />}
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
            label={"Top"}
            icon={<PaddingTopIcon />}
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
            icon={<PaddingBottomIcon />}
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
            icon={<PaddingLeftIcon />}
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
            icon={<PaddingRightIcon />}
            value={getElementComputedStylePixelValue(element, "padding-right")}
            onChange={(v) => {
              element.style.paddingRight = `${v}px`;
            }}
            min={0}
            max={150}
            step={1}
          />
        </>
      ) : (
        <>
          <RangeField
            label={"Top-Bottom"}
            icon={<PaddingIcon />}
            value={getElementComputedStylePixelValue(element, "padding-top")}
            onChange={(v) => {
              element.style.paddingTop = `${v}px`;
              element.style.paddingBottom = `${v}px`;
            }}
            min={0}
            max={150}
            step={1}
          />
          <RangeField
            label={"Left-Right"}
            icon={
              <span style={{ transform: "rotate(90deg)" }}>
                <PaddingIcon />
              </span>
            }
            value={getElementComputedStylePixelValue(element, "padding-left")}
            onChange={(v) => {
              element.style.paddingLeft = `${v}px`;
              element.style.paddingRight = `${v}px`;
            }}
            min={0}
            max={150}
            step={1}
          />
        </>
      )}
    </>
  );
};

export default Padding;
