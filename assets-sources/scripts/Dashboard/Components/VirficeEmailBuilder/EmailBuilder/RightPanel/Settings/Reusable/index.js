import React from "react";
import Background from "./Background";
import Padding from "./Padding";
import BorderRadius from "./BorderRadius";
import FontAndSize from "./FontAndSize";
import Border from "./Border";
import BorderType from "./BorderType";

const Reusable = ({
  element,
  type,
  eleArr,
  disableTitle,
  borderRadiusConf,
  borderConf,
  title,
}) => {
  switch (type) {
    case "background": {
      return <Background element={element} disableTitle={disableTitle} />;
    }

    case "border": {
      return <Border element={element} borderConf={borderConf} />;
    }

    case "padding": {
      return <Padding element={element} title={title} />;
    }

    case "border-radius": {
      return (
        <BorderRadius
          element={element}
          borderRadiusConf={borderRadiusConf}
          title={title}
        />
      );
    }

    case "font-and-size": {
      return <FontAndSize element={element} eleArr={eleArr} />;
    }

    case "border-type": {
      return <BorderType element={element} eleArr={eleArr} />;
    }

    default:
      return <>Not implemented</>;
  }
};

export default Reusable;
