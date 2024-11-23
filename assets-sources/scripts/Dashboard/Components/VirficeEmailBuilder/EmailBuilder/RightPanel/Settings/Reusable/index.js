import React from "react";
import Background from "./Background";
import Padding from "./Padding";
import BorderRadius from "./BorderRadius";
import FontAndSize from "./FontAndSize";

const Reusable = ({ element, type }) => {
  switch (type) {
    case "background": {
      return <Background element={element} />;
    }

    case "padding": {
      return <Padding element={element} />;
    }

    case "border-radius": {
      return <BorderRadius element={element} />;
    }

    case "font-and-size": {
      return <FontAndSize element={element} />;
    }

    default:
      return <>Not implemented</>;
  }
};

export default Reusable;
