import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { VIRFICE_APP_PREFIX } from "@conf";
import { useSelector } from "react-redux";
import { getVirficeElementFromId } from "../../../utils";
import Border from "./Border";
import { hasQueryParamValue } from "@functions";
import AddSectionButton from "./AddSectionButton";

const EditorControls = () => {
  const selectedSectionId = useSelector(
    (state) => state.builder?.selectedSectionId
  );
  const selectedElementId = useSelector(
    (state) => state.builder?.selectedElementId
  );

  const hoveredSectionId = useSelector(
    (state) => state.builder?.hoveredSectionId
  );

  const [element, setElement] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(false);
  const templateWrapper = document.getElementById("virfice-email-preview");
  useEffect(() => {
    if (selectedSectionId) {
      setElement(getVirficeElementFromId(selectedSectionId));
    } else {
      setElement(false);
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

  console.log({ templateWrapper, isCanvasEmpty, selectedElementId });

  if (hasQueryParamValue("menu", "virfice-brand-settings")) {
    return null;
  }

  return (
    <div className={VIRFICE_APP_PREFIX + "-element-controls"}>
      {!isCanvasEmpty && hoveredSectionId && (
        <Border
          element={getVirficeElementFromId(hoveredSectionId)}
          type="hovered"
        />
      )}

      {!isCanvasEmpty && selectedSectionId && (
        <Border element={element} type="selected" />
      )}
      {/* {!isCanvasEmpty && hoveredSectionId && <HoveredSection />} */}

      {templateWrapper &&
        isCanvasEmpty &&
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
