import { VIRFICE_APP_PREFIX } from "../../../../../../conf";
import { getVirficeAttr } from "../../utils";

export const getElementBasicSettings = (element) => {
  let obj = {};
  const type = getVirficeAttr(element, "ele_type");
  obj.title = getVirficeAttr(element, "title");
  obj.type = type;

  return obj;
};

export const getElementComputedStyle = (element, key) => {
  const computedStyle = window.getComputedStyle(element);
  return computedStyle[key];
};

export const getElementComputedStylePixelValue = (element, key) => {
  return getElementComputedStyle(element, key).replace("px", "");
};
