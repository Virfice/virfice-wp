import React, { useEffect, useRef } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import RightControl from "./RightControls";
import AddSectionButton from "./AddSectionButton";

const Border = ({ element }) => {
  const borderDiv = useRef(null);

  useEffect(() => {
    if (!element) return;

    const parentElement = element.parentNode; // Get the parent of the target element
    // Initial update on component mount
    updatePosition();

    const virficeDashboard = document.querySelector("#virfice-dashboard");
    // Safely add scroll and resize listeners
    if (virficeDashboard) {
      virficeDashboard.addEventListener("scroll", updatePosition);
    }

    const leftPanelWrapper = document.querySelector(
      `#${VIRFICE_APP_PREFIX}-builder-left-panel-wrapper`
    );
    // Safely add scroll and resize listeners
    if (leftPanelWrapper) {
      leftPanelWrapper.addEventListener("scroll", updatePosition);
    }

    window.addEventListener("resize", updatePosition);

    // Using ResizeObserver to track element resizing
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(element);

    // Use MutationObserver to track changes in the parent element (e.g., reordering, moving up/down)
    const mutationObserver = new MutationObserver(() => {
      updatePosition();
    });

    // Observe the parent element to detect changes in its child nodes (e.g., element moves)
    if (parentElement) {
      mutationObserver.observe(parentElement, {
        childList: true, // Detect changes in the parent's child elements
        subtree: false, // No need to observe deeper in the DOM tree
      });
    }

    // Cleanup the event listeners and observers on unmount
    return () => {
      if (virficeDashboard) {
        virficeDashboard.removeEventListener("scroll", updatePosition);
      }
      if (leftPanelWrapper) {
        leftPanelWrapper.removeEventListener("scroll", updatePosition);
      }
      window.removeEventListener("resize", updatePosition);

      // Disconnect the observers
      resizeObserver.disconnect();
      if (parentElement) {
        mutationObserver.disconnect();
      }
    };
  }, [element]); // Re-run the effect when the `element` changes

  // Function to update the border's position to match the element
  const updatePosition = () => {
    if (!borderDiv.current) return;

    // Get the bounding box of the target element
    const rect = element.getBoundingClientRect();

    // Set the borderDiv's position, width, and height to match the target element
    borderDiv.current.style.left = rect.left + window.scrollX + "px";
    borderDiv.current.style.top = rect.top + window.scrollY + "px";
    borderDiv.current.style.width = rect.width + "px";
    borderDiv.current.style.height = rect.height + "px";
    borderDiv.current.style.position = "fixed"; // Use `absolute` or `fixed` based on your requirement
  };

  return (
    <div className={VIRFICE_APP_PREFIX + "-element-border"} ref={borderDiv}>
      <RightControl element={element} />
      <AddSectionButton element={element} />
    </div>
  );
};

export default Border;
