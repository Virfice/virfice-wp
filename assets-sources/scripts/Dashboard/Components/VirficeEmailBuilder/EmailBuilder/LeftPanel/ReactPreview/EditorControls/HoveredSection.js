import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { VIRFICE_APP_PREFIX } from "@conf";
import AddSectionButton from "./AddSectionButton";
import { getVirficeElementFromId } from "../../../utils";
import useElementPositionTracker from "./useElementPositionTracker";

const HoveredSection = () => {
  const borderDiv = useRef(null);
  const hoveredSectionId = useSelector(
    (state) => state.builder?.hoveredSectionId
  );

  const element = getVirficeElementFromId(hoveredSectionId);
  const position = useElementPositionTracker(element);

  useEffect(() => {
    if (!borderDiv.current) return;
    borderDiv.current.style.display = "none";
    setTimeout(() => {
      updatePosition();
    }, 10);
  }, [position]);
  const updatePosition = () => {
    if (!borderDiv.current) return;
    // Set the borderDiv's position, width, and height to match the target element
    borderDiv.current.style.left = position.left + "px";
    borderDiv.current.style.top = position.top + "px";
    borderDiv.current.style.width = position.width + "px";
    borderDiv.current.style.height = position.height + "px";
    borderDiv.current.style.position = "fixed"; // Use `absolute` or `fixed` based on your requirement
    borderDiv.current.style.display = "block";
  };

  if (!element) return null;
  return (
    <div
      className={VIRFICE_APP_PREFIX + "-element-hover-border"}
      ref={borderDiv}
    >
      <AddSectionButton element={element} />
    </div>
  );
};

export default HoveredSection;
