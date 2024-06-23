import React from "react";
import Basic from "./Basic";
import { VIRFICE_APP_PREFIX } from "../../../../conf";

const Email = () => {
  return (
    <div className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-20`}>
        <Basic />
        <Basic />
    </div>
  );
};

export default Email;
