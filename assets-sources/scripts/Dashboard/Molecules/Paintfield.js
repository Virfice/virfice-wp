import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "../../conf";
import { SketchPicker } from "react-color";
import TextField from "./TextField";
import useOutsideClick from "../../Hooks/useOutsideClick";

const getColorCode = (color) =>{

  if(color?.hex)return color.hex;
    return (color?.rgb)
    ? `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`
    : color;
}

const Paintfield = ({ label, value = "#000000", onChange=()=>{} }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState(value);

  const ref = useOutsideClick(() => {
    if (open) setOpen(false);
  });

  useEffect(()=>{
    setColor(value)
  }, [value]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (color) => {
    setColor(color);
    onChange(getColorCode(color));
  };

  const styles = {
    color: {
      width: "100%",
      height: "22px",
      background: getColorCode(color),
    },
    swatch: {
      padding: "5px",
      background: "#fff",
      cursor: "pointer",
      width: '100%'
    },
    popover: {
      position: "absolute",
      zIndex: "2",
    },
    cover: {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  };
  return (
    <div className={`${VIRFICE_APP_PREFIX}-paintfield-wrapper`}>
      {label && <label className="body__medium">{label}</label>}
      <div className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-w-100`}>
        <div className={`${VIRFICE_APP_PREFIX}-color-code`}>
          <div style={styles.swatch} onClick={handleClick}>
            <div style={styles.color} />
          </div>
          {open && (
            <div style={styles.popover} ref={ref}>
              {/* <div style={styles.cover} onClick={handleClose}/> */}
              <SketchPicker color={getColorCode(color)} onChange={handleChange} />
            </div>
          )}
        </div>
        <TextField placeholder={'code'} value={getColorCode(color)}/>
      </div>
    </div>
  );
};

export default Paintfield;
