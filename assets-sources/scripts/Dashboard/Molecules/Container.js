import React from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "@conf";

const Container = ({ children }) => {
  const className = classnames({
    [VIRFICE_APP_PREFIX + "-container"]: true,
  });
  return <div className={className}>{children}</div>;
};

export default Container;
