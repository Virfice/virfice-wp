import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import { getVirficeAttr } from "../../utils";
import SingleChild from "./Components/SingleChild";
import ChildList from "./Components/ChildList";

const ColumnSettings = ({ element }) => {
  return (
    <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
      <ChildList element={element} />
    </div>
  );
};

export default ColumnSettings;
