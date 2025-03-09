import React, { useEffect, useState, useRef } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import { SketchPicker } from "react-color";
import TextField from "./TextField";
import useOutsideClick from "../../Hooks/useOutsideClick";

const getColorCode = (color) => {
  return color?.hex ? color.hex : color;
};

export const rgbToHex = (color) => {
  color = "" + color;
  if (!color || color.indexOf("rgb") < 0) {
    return color;
  }

  if (color.charAt(0) == "#") {
    return color;
  }

  var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
    r = parseInt(nums[2], 10).toString(16),
    g = parseInt(nums[3], 10).toString(16),
    b = parseInt(nums[4], 10).toString(16);

  return (
    "#" +
    ((r.length == 1 ? "0" + r : r) +
      (g.length == 1 ? "0" + g : g) +
      (b.length == 1 ? "0" + b : b))
  );
};

const PaintField = ({ label, value = "#000000", onChange = () => {} }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(value);
  const [popoverPosition, setPopoverPosition] = useState("top"); // Track position state
  const ref = useOutsideClick(() => {
    if (open) setOpen(false);
  });

  const swatchRef = useRef(null);

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleClick = () => {
    if (!open) {
      checkPopoverPosition();
    }
    setOpen(!open);
  };

  const handleChange = (color) => {
    setColor(color);
    onChange(getColorCode(color));
  };

  // Check available space and decide whether to open popover above or below
  const checkPopoverPosition = () => {
    if (swatchRef.current) {
      const rect = swatchRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const popoverHeight = 296; // Estimated height of the SketchPicker

      if (spaceBelow < popoverHeight) {
        setPopoverPosition("bottom");
      } else {
        setPopoverPosition("top");
      }
    }
  };
  const styles = {
    color: {
      width: "100%",
      height: "24px",
      background: getColorCode(color),
      borderRadius: "3px",
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      cursor: "pointer",
      width: "100%",
      borderRadius: "4px",
    },
    popover: {
      position: "absolute",
      zIndex: "2",
      [popoverPosition]: `calc(100% ${
        popoverPosition === "top" ? "- 30px" : "+ 36px"
      })`,
    },
  };

  return (
    <div className={`${VIRFICE_APP_PREFIX}-paintfield-wrapper`}>
      {label && <label className="body__medium">{label}</label>}
      <div className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-w-100`}>
        <div className={`${VIRFICE_APP_PREFIX}-color-code`}>
          <div style={styles.swatch} onClick={handleClick} ref={swatchRef}>
            <div style={styles.color} />
          </div>
          {open && (
            <div style={styles.popover} ref={ref}>
              <SketchPicker
                color={getColorCode(color)}
                onChange={handleChange}
                disableAlpha
                presetColors={[
                  { color: "none", title: "None" },
                  "#F47373",
                  "#697689",
                  "#37D67A",
                  "#2CCCE4",
                  "#555555",
                  "#dce775",
                  "#ff8a65",
                  "#ba68c8",
                  "#FF6900",
                  "#FCB900",
                  "#7BDCB5",
                  "#00D084",
                  "#EB144C",
                  "#F78DA7",
                  "#9900EF",
                ]}
              />
              <div
                className={`${VIRFICE_APP_PREFIX}-color-none`}
                onClick={() => {
                  handleChange("");
                }}
              >
                <div></div>
              </div>
            </div>
          )}
        </div>
        <TextField
          placeholder={"No color"}
          value={getColorCode(color)}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default PaintField;
