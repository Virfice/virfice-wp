import { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "@conf";

const useElementPositionTracker = (element) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (!element) return;
    const leftPanelWrapper = document.querySelector(
      `#${VIRFICE_APP_PREFIX}-builder-left-panel-wrapper`
    );
    const parentElement = element.parentNode; // Get the parent of the target element
    // Initial update on component mount
    updatePosition();

    const virficeDashboard = document.querySelector("#virfice-dashboard");
    // Safely add scroll and resize listeners
    if (virficeDashboard) {
      virficeDashboard.addEventListener("scroll", updatePosition);
    }

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
    // Get the bounding box of the target element
    const rect = element.getBoundingClientRect();

    setPosition({
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      width: rect.width,
      height: rect.height,
    });
  };
  return position;
};

export default useElementPositionTracker;
