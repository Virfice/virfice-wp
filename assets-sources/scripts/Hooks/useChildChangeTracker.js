import { useState, useEffect } from "react";

const useChildChangeTracker = (element) => {
  const [changeDetected, setChangeDetected] = useState(false);

  useEffect(() => {
    if (!element) return;

    // Function to handle mutations
    const handleMutation = () => {
      setChangeDetected((prev) => !prev); // Toggle state to trigger re-render
    };

    // Set up MutationObserver to track ALL changes
    const observer = new MutationObserver(handleMutation);
    observer.observe(element, {
      childList: true, // Detect direct child add/remove
      subtree: true, // Detect nested child changes
      attributes: true, // Detect attribute changes
    });

    return () => observer.disconnect(); // Cleanup on unmount
  }, [element]); // Runs when element changes

  return changeDetected; // Return toggle state indicating change
};

export default useChildChangeTracker;
