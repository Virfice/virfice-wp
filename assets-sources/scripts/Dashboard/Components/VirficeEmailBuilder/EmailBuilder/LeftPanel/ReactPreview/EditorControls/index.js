import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { VIRFICE_APP_PREFIX } from "@conf";
import { useSelector } from "react-redux";
import {
  getVirficeElementFromId,
  isBrandSettingsElementSelected,
} from "../../../utils";
import Border from "./Border";
import { hasQueryParamValue } from "@functions";
import AddSectionButton from "./AddSectionButton";
import HoveredSection from "./HoveredSection";

const EditorControls = () => {
  const selectedSectionId = useSelector(
    (state) => state.builder?.selectedSectionId
  );
  const selectedElementId = useSelector(
    (state) => state.builder?.selectedElementId
  );

  const [element, setElement] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(false);
  const templateWrapper = document.getElementById("virfice-email-preview");
  useEffect(() => {
    if (selectedSectionId) {
      setElement(getVirficeElementFromId(selectedSectionId));
    }
  }, [selectedSectionId]);

  useEffect(() => {
    if (templateWrapper) {
      const childs = templateWrapper.querySelector(
        '[virfice-ele_type="section"]'
      );
      if (childs) {
        setIsCanvasEmpty(false);
      } else {
        setIsCanvasEmpty(true);
      }
    }
  }, [selectedElementId]);

  if (
    !element ||
    isBrandSettingsElementSelected(
      getVirficeElementFromId(selectedElementId)
    ) ||
    hasQueryParamValue("menu", "virfice-brand-settings")
  ) {
    return null;
  }

  return (
    <div className={VIRFICE_APP_PREFIX + "-element-controls"}>
      {!isCanvasEmpty && (selectedElementId || selectedSectionId) && (
        <Border element={element} />
      )}
      {!isCanvasEmpty && <HoveredSection />}
      {templateWrapper &&
        isCanvasEmpty &&
        !selectedElementId &&
        createPortal(
          <div className={VIRFICE_APP_PREFIX + "-empty-add-button"}>
            <AddSectionButton />
          </div>,
          templateWrapper
        )}
    </div>
  );
};

export default EditorControls;
