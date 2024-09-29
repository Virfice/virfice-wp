import { VIRFICE_APP_PREFIX } from "../../../../conf";
import {
  dispatchDashboardAction,
  generateRandomId,
} from "../../../../functions";
import { onSelectElement, setBuilderData } from "../builderSlice";

export const initEmailBuilder = () => {
  const wrapper = document.getElementById(
    VIRFICE_APP_PREFIX + "-email-preview"
  );
  setTimeout(() => {
    initClickEvents(wrapper);
    initHoverEvenets(wrapper);
  }, 100);
};

const initClickEvents = (wrapper) => {
  let allEle = wrapper.querySelectorAll(`[${VIRFICE_APP_PREFIX}-ele_type]`);

  allEle.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.stopPropagation();
      dispatchDashboardAction(onSelectElement, getVirficeAttr(e.target, "id"));
    });
  });
};

const initHoverEvenets = (wrapper) => {
  let allEle = wrapper.querySelectorAll(`[${VIRFICE_APP_PREFIX}-ele_type]`);

  allEle.forEach((ele) => {
    ele.addEventListener("mouseover", (e) => {
      e.stopPropagation();
      e.target.classList.add(`${VIRFICE_APP_PREFIX}-hover-border`);
    });
    ele.addEventListener("mouseleave", (e) => {
      e.stopPropagation();
      e.target.classList.remove(`${VIRFICE_APP_PREFIX}-hover-border`);
    });
  });
};

export const getVirficeElementFromId = (elementId) => {
  const wrapper = document.getElementById(
    VIRFICE_APP_PREFIX + "-email-preview"
  );
  return wrapper.querySelector(`[${VIRFICE_APP_PREFIX}-id="${elementId}"]`);
};

export const getVirficeAttr = (element, attr) => {
  if (!element) return;
  return element.getAttribute(VIRFICE_APP_PREFIX + "-" + attr);
};

export const updateVirficeAttr = (element, attr, value) => {
  element.setAttribute(VIRFICE_APP_PREFIX + "-" + attr, value);
};

export const cloneElement = (element) => {
  let clone = element.cloneNode(true);

  updateVirficeAttr(clone, "id", generateRandomId());
  clone.classList.remove(`${VIRFICE_APP_PREFIX}-hover-border`);

  let allEle = clone.querySelectorAll(`[${VIRFICE_APP_PREFIX}-ele_type]`);
  console.log(allEle);
  allEle.forEach((ele) => {
    updateVirficeAttr(ele, "id", generateRandomId());
    ele.classList.remove(`${VIRFICE_APP_PREFIX}-hover-border`);
  });

  return clone;
};

export const getParentElement = (element) => {
  let parent = element;
  let flag = true;
  while (flag) {
    parent = parent.parentNode;
    let parent_atr = getVirficeAttr(parent, "ele_type");
    if (parent_atr) {
      return parent;
    }

    if (parent.id === VIRFICE_APP_PREFIX + "-email-preview") {
      return false;
    }
  }

  return false;
};

export const saveBuilderDataToRedux = (element) => {
  const wrapper = document.getElementById(
    VIRFICE_APP_PREFIX + "-email-preview"
  );
  dispatchDashboardAction(setBuilderData, {
    key: "html",
    value: wrapper.innerHTML,
  });
};
