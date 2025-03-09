import { useEffect, useState, useCallback } from "react";
import { getIframe } from "../../../utils";

const useElementPositionTracker = (element) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  // Function to get all parent elements that might have scrolling
  const getScrollParents = (node) => {
    if (!node) return [];

    const scrollParents = [];
    let currentNode = node;

    while (currentNode && currentNode !== document.body) {
      const overflow = window.getComputedStyle(currentNode).overflow;
      if (
        overflow === "auto" ||
        overflow === "scroll" ||
        overflow === "overlay"
      ) {
        scrollParents.push(currentNode);
      }
      currentNode = currentNode.parentNode;
    }

    return scrollParents;
  };

  // Function to update position considering all scroll offsets
  const updatePosition = useCallback(() => {
    if (!element) return;

    const { iframe, document: iframeDoc } = getIframe();
    if (!iframe) return;

    // Get bounding box of the element inside the iframe
    const rect = element.getBoundingClientRect();
    // Get all scroll parents in the main document that might affect the iframe
    const scrollParents = getScrollParents(iframe);

    // Calculate cumulative scroll offset from all parent scrollable elements
    let cumulativeScrollLeft = 0;
    let cumulativeScrollTop = 0;
    scrollParents.forEach((parent) => {
      cumulativeScrollLeft += parent.scrollLeft;
      cumulativeScrollTop += parent.scrollTop;
    });

    const obj = {
      left: rect.left + cumulativeScrollLeft,
      top: rect.top + cumulativeScrollTop,
      width: rect.width,
      height: rect.height,
    };

    setPosition(obj);
  }, [element]);

  useEffect(() => {
    if (!element) return;

    const iframeData = getIframe();
    if (!iframeData || !iframeData.iframe || !iframeData.document) return;

    const { iframe, document: iframeDoc, window: iframeWin } = iframeData;

    // Find all scrollable parents that might affect positioning
    const scrollParents = getScrollParents(iframe);

    // Ensure position updates on mount and after a short delay
    updatePosition();
    const initialUpdateTimeout = setTimeout(updatePosition, 100);

    // Track scroll events on both main window and iframe
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition, { passive: true });
    iframeWin.addEventListener("scroll", updatePosition, { passive: true });
    iframeWin.addEventListener("resize", updatePosition, { passive: true });

    // Add scroll listeners to all parent scrollable elements
    scrollParents.forEach((parent) => {
      parent.addEventListener("scroll", updatePosition, { passive: true });
    });

    // Track content changes that might affect layout
    const contentObserver = new MutationObserver(updatePosition);
    contentObserver.observe(iframeDoc.body, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    // Observe element size changes
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(element);

    // Also observe the iframe itself for size changes
    resizeObserver.observe(iframe);

    // Cleanup event listeners on unmount
    return () => {
      clearTimeout(initialUpdateTimeout);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
      iframeWin.removeEventListener("scroll", updatePosition);
      iframeWin.removeEventListener("resize", updatePosition);

      scrollParents.forEach((parent) => {
        parent.removeEventListener("scroll", updatePosition);
      });

      contentObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [element, updatePosition]);

  return position;
};

export default useElementPositionTracker;
