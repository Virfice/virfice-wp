import { cloneElement, getVirficeAttr } from "../../../utils";

export const duplicateElement = (element) => {
  // Check if the element is passed and exists
  if (!element) {
    console.error("Element not found");
    return;
  }

  // Clone the element (and its children)
  const clone = cloneElement(element);

  // Append the cloned element to the same parent
  element.parentNode.appendChild(clone);

  let vID = getVirficeAttr(clone, "id");
  return vID;
};
