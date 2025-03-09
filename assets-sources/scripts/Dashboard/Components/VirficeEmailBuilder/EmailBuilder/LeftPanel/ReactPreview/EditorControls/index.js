import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import { useSelector } from "react-redux";
import {
  getIframe,
  getVirficeAttr,
  getVirficeElementFromId,
  selectElementUsingID,
} from "../../../utils";
import Border from "./Border";
import { hasQueryParamValue } from "@functions";
import AddSectionButton from "./AddSectionButton";
import classNames from "classnames";
import useSiblingNavigation from "../../../../../../../Hooks/useSiblingNavigation";

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
  const templateWrapper = getIframe().templateWrapper;
  const currentElement = useSiblingNavigation(element, getIframe().window);

  useEffect(() => {
    if (selectedSectionId) {
      setElement(getVirficeElementFromId(selectedSectionId));
    } else {
      setElement(false);
    }
  }, [selectedSectionId]);

  useEffect(() => {
    selectElementUsingID(getVirficeAttr(currentElement, "id"));
  }, [currentElement]);

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

  if (hasQueryParamValue("menu", "virfice-brand-settings")) {
    return null;
  }

  const cn = classNames({
    [VIRFICE_APP_PREFIX + "-element-controls"]: true,
    [VIRFICE_APP_PREFIX + "-empty-canvas"]: templateWrapper && isCanvasEmpty,
  });

  if (!selectedElementId) return null;
  return (
    <div className={cn}>
      {!isCanvasEmpty && hoveredSectionId && (
        <Border
          element={getVirficeElementFromId(hoveredSectionId)}
          type="hovered"
        />
      )}

      {!isCanvasEmpty && selectedSectionId && (
        <Border element={element} type="selected" />
      )}

      {templateWrapper && isCanvasEmpty && (
        <div className={VIRFICE_APP_PREFIX + "-empty-add-button"}>
          <AddSectionButton />
        </div>
      )}
    </div>
  );
};

export default EditorControls;
