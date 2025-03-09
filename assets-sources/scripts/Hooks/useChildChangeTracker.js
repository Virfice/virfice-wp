import { useState, useEffect } from "react";

const useChildChangeTracker = (element) => {
  const [childElements, setChildElements] = useState([]);

  useEffect(() => {
    if (!element) return;

    // Function to update child elements
    const updateChildren = () => {
      setChildElements(Array.from(element.children)); // Convert HTMLCollection to Array
    };

    // Initial population of child elements
    updateChildren();

    // Set up MutationObserver to track child changes
    const observer = new MutationObserver(updateChildren);
    observer.observe(element, { childList: true });

    return () => observer.disconnect(); // Cleanup on unmount
  }, [element]); // Runs when parentElement changes

  return childElements; // Return the updated child list
};

export default useChildChangeTracker;
