import React from "react";
import Paintfield from "../../../../Molecules/Paintfield";

const Color = ({ title, value, onChange }) => {
  return (
    <Paintfield
      label={title}
      value={value}
      onChange={(v) => {
        onChange(v);
      }}
    />
  );
};

export default Color;
