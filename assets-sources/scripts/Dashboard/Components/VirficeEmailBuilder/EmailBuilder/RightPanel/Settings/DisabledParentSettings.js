import React from "react";
import { getParentElement, isSettingsEnabled } from "../../utils";
import Reusable from "./Reusable";

const DisabledParentSettings = ({ element }) => {
  const parent = getParentElement(element);
  if (isSettingsEnabled(parent)) return null;
  return (
    <>
      <Reusable element={parent} type="background" />
      <Reusable element={parent} type="border-radius" />
      <Reusable element={parent} type="padding" />
    </>
  );
};

export default DisabledParentSettings;
