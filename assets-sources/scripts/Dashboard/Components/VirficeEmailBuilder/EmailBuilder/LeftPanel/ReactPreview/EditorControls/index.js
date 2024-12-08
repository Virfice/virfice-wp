import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import { useSelector } from "react-redux";
import {
  getVirficeElementFromId,
  isBrandSettingsElementSelected,
} from "../../../utils";
import Border from "./Border";

const EditorControls = () => {
  const selectedSectionId = useSelector(
    (state) => state.builder?.selectedSectionId
  );
  const selectedElementId = useSelector(
    (state) => state.builder?.selectedElementId
  );
  const [element, setElement] = useState(false);

  useEffect(() => {
    if (selectedSectionId) {
      setElement(getVirficeElementFromId(selectedSectionId));
    }
  }, [selectedSectionId]);

  if (
    !element ||
    isBrandSettingsElementSelected(getVirficeElementFromId(selectedElementId))
  ) {
    return null;
  }

  return (
    <div className={VIRFICE_APP_PREFIX + "-element-controls"}>
      <Border element={element} />
    </div>
  );
};

export default EditorControls;
