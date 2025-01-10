import React from "react";
import { getParentElement, isSettingsEnabled } from "../../utils";
import Reusable from "./Reusable";
import Divider from "@molecules/Divider";

const DisabledParentSettings = ({ element }) => {
  const parent = getParentElement(element);
  if (isSettingsEnabled(parent)) return null;
  return (
    <>
      <Reusable element={parent} type="background" />

      <Divider
        style={{ marginLeft: -20, marginTop: 8, marginBottom: 8 }}
        extraWidth={"40px"}
      />
      <Reusable
        element={parent}
        type="border-radius"
        title={"Background radius"}
      />
      <Divider
        style={{ marginLeft: -20, marginTop: 8, marginBottom: 8 }}
        extraWidth={"40px"}
      />
      <Reusable element={parent} type="padding" title={"Background padding"} />
    </>
  );
};

export default DisabledParentSettings;
