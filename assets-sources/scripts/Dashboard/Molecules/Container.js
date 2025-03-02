import React from "react";
import classnames from "classnames";
import { VIRFICE_APP_PREFIX } from "@conf";

const Container = ({ children, size1280 }) => {
  const className = classnames({
    [VIRFICE_APP_PREFIX + "-container"]: true,
  });

  let styles = {};

  if (size1280) {
    styles.width = 1280;
  }

  return (
    <div className={className} style={styles}>
      {children}
    </div>
  );
};

export default Container;
