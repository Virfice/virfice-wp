import React from "react";

const Divider = ({ style, extraWidth = "0px" }) => {
  return (
    <div
      style={{
        marginTop: 16,
        marginBottom: 16,
        height: 1,
        width: "calc(100% + " + extraWidth + ")",
        background: "#F0F0F0",
        ...style,
      }}
    ></div>
  );
};

export default Divider;
