import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import ChildList from "./Components/ChildList";
import Reusable from "./Reusable";
import Divider from "@molecules/Divider";

const ColumnSettings = ({ element }) => {
  return (
    <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
      <ChildList element={element} />
      <Divider
        style={{ marginLeft: -20, marginBottom: 0 }}
        extraWidth={"40px"}
      />
      <Reusable element={element} type="background" />
      <Reusable element={element} type="padding" />
    </div>
  );
};

export default ColumnSettings;
