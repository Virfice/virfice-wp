import { useState, useEffect } from "react";

const useSiblingNavigation = (selectedElement, context) => {
  const [currentElement, setCurrentElement] = useState(selectedElement);

  useEffect(() => {
    if (!selectedElement) return;

    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" && selectedElement?.previousElementSibling) {
        setCurrentElement(selectedElement.previousElementSibling); // Move to the previous sibling
      } else if (
        event.key === "ArrowDown" &&
        selectedElement?.nextElementSibling
      ) {
        setCurrentElement(selectedElement.nextElementSibling); // Move to the next sibling
      }
    };
    if (context && selectedElement) {
      context.addEventListener("keydown", handleKeyDown);
    }
    return () => context?.removeEventListener("keydown", handleKeyDown); // Cleanup
  }, [selectedElement, context]); // Update when selected element changes

  return currentElement;
};

export default useSiblingNavigation;
