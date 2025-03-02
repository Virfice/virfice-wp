import { cloneElement, getVirficeAttr } from "../../../utils";

export const duplicateElement = (element) => {
  // Check if the element is passed and exists
  if (!element || !element.parentNode) {
    console.error("Element not found or has no parent");
    return;
  }

  // Clone the element (and its children)
  const clone = cloneElement(element);

  // Insert the cloned element right after the original element
  element.parentNode.insertBefore(clone, element.nextSibling);

  // Retrieve and return the virtual ID (assuming `getVirficeAttr` is defined elsewhere)
  let vID = getVirficeAttr(clone, "id");
  return vID;
};
