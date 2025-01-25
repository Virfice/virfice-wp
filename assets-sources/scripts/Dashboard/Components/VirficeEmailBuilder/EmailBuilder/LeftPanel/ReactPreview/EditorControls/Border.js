import React, { useEffect, useRef } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import RightControl from "./RightControls";
import AddSectionButton from "./AddSectionButton";
import useElementPositionTracker from "./useElementPositionTracker";
import classNames from "classnames";

const Border = ({ element, type }) => {
  const borderDiv = useRef(null);

  const position = useElementPositionTracker(element);

  useEffect(() => {
    updatePosition();
  }, [position]);
  const updatePosition = () => {
    if (!borderDiv.current) return;
    // Set the borderDiv's position, width, and height to match the target element
    borderDiv.current.style.left = position.left + "px";
    borderDiv.current.style.top = position.top + "px";
    borderDiv.current.style.width = position.width + "px";
    borderDiv.current.style.height = position.height + "px";
    borderDiv.current.style.position = "fixed"; // Use `absolute` or `fixed` based on your requirement
    if (type === "hovered") {
      borderDiv.current.style.zIndex = 1;
    }
  };

  const className = classNames({
    [VIRFICE_APP_PREFIX + "-element-border"]: type === "selected",
    [VIRFICE_APP_PREFIX + "-element-hover-border"]: type === "hovered",
  });

  if (!element) return null;
  return (
    <div className={className} ref={borderDiv}>
      {type === "hovered" && (
        <>
          <RightControl element={element} />
          <AddSectionButton element={element} />
        </>
      )}
    </div>
  );
};

export default Border;
