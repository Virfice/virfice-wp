import React from "react";
import PaintField from "../../../../Molecules/Paintfield";

const Color = ({ title, value, onChange }) => {
  return (
    <PaintField
      label={title}
      value={value}
      onChange={(v) => {
        onChange(v);
      }}
    />
  );
};

export default Color;
