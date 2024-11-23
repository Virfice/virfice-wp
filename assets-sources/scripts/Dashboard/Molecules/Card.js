import React from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "@conf";

const Card = ({
  children,
  className = false,
  style = {},
  zeroPadding = false,
}) => {
  const cn = classnames(
    {
      [VIRFICE_APP_PREFIX + "-card"]: true,
      [VIRFICE_APP_PREFIX + "-padding-0"]: zeroPadding === true,
    },
    className
  );
  return (
    <div className={cn} style={style}>
      {children}
    </div>
  );
};

export default Card;
