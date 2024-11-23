import { VIRFICE_APP_PREFIX } from "@conf";
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
  let v = computedStyle[key];
  // console.log({ key, value: v });
  return v;
};

export const getElementComputedStylePixelValue = (element, key) => {
  return getElementComputedStyle(element, key).replace("px", "");
};

export const getElementComputedStylePercentageValue = (element, key) => {
  let value = getElementComputedStylePixelValue(element, key);
  const parent = element.parentElement;
  const parentSize = key === "width" ? parent.offsetWidth : parent.offsetHeight;
  value = Math.round(((value * 1) / parentSize) * 100);
  return value;
};
