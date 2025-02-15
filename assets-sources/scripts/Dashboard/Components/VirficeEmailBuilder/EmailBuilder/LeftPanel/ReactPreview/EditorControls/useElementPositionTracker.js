import { useEffect, useState, useCallback } from "react";
import { getIframe } from "../../../utils";

const useElementPositionTracker = (element) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // Function to update position considering iframe offset
  const updatePosition = useCallback(() => {
    if (!element) return;
    // Calculate the correct position in the main document
    const { iframe, document: iframeDoc, window: iframeWin } = getIframe();

    // Get bounding box of the element inside the iframe
    const rect = element.getBoundingClientRect();

    // Get iframe's position relative to the main document
    const iframeRect = iframe.getBoundingClientRect();

    // Set the correct position
    setPosition({
      left: rect.left + iframeRect.left, // Add iframe's left offset
      top: rect.top + iframeRect.top, // Add iframe's top offset
      width: rect.width,
      height: rect.height,
    });
  }, [element]);

  useEffect(() => {
    if (!element) return;

    const iframeData = getIframe();
    if (!iframeData || !iframeData.iframe || !iframeData.document) return;

    const { iframe, document: iframeDoc, window: iframeWin } = iframeData;
    const parentElement = element.parentNode; // More specific tracking

    // Ensure position updates on mount
    setTimeout(updatePosition, 100);

    // Add event listeners inside the iframe
    iframeWin.addEventListener("scroll", updatePosition);
    iframeWin.addEventListener("resize", updatePosition);
    iframeDoc.body.addEventListener("scroll", updatePosition);

    // Observe element size changes
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(element);

    // Observe changes in parent element (to track moves)
    const mutationObserver = new MutationObserver(updatePosition);
    if (parentElement) {
      mutationObserver.observe(parentElement, {
        childList: true,
        subtree: false, // No need to track deep changes
      });
    }

    // Cleanup event listeners on unmount
    return () => {
      iframeWin.removeEventListener("scroll", updatePosition);
      iframeWin.removeEventListener("resize", updatePosition);
      iframeDoc.body.removeEventListener("scroll", updatePosition);

      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [element, updatePosition]); // Re-run effect when `element` changes

  return position;
};

export default useElementPositionTracker;
