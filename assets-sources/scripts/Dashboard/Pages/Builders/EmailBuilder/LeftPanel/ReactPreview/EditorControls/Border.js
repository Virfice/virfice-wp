import React, { useEffect, useRef } from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../../../conf";
import RightControl from "./RightControls";

const Border = ({ element }) => {
  const borderDiv = useRef(null);
  useEffect(() => {
    const updatePosition = () => {
      if (!element || !borderDiv.current) return;

      // Get the bounding box of the target element
      let rect = element.getBoundingClientRect();

      // Set the borderDiv's position, width, and height to match the target element
      borderDiv.current.style.left = rect.left + window.scrollX + "px";
      borderDiv.current.style.top = rect.top + window.scrollY + "px";
      borderDiv.current.style.width = rect.width + "px";
      borderDiv.current.style.height = rect.height + "px";
      borderDiv.current.style.position = "fixed"; // Use `absolute` or `fixed` based on your requirement
    };

    // Initial update on component mount
    updatePosition();

    const virficeDashboard = document.querySelector("#virfice-dashboard");

    // Add a scroll listener to update the position on scroll
    virficeDashboard.addEventListener("scroll", updatePosition);
    virficeDashboard.addEventListener("resize", updatePosition); // Also update on window resize

    // Cleanup the event listeners on unmount
    return () => {
      virficeDashboard.removeEventListener("scroll", updatePosition);
      virficeDashboard.removeEventListener("resize", updatePosition);
    };
  }, [element]); // Re-run the effect when the `element` changes

  return (
    <div className={VIRFICE_APP_PREFIX + "-element-border"} ref={borderDiv}>
      <RightControl element={element} />
    </div>
  );
};

export default Border;
