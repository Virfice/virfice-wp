import { VIRFICE_APP_PREFIX } from "../../../../conf";
import {
  dispatchDashboardAction,
  generateRandomId,
} from "../../../../functions";
import {
  onSelectElement,
  onSelectSection,
  setBuilderData,
} from "../builderSlice";

export const initEmailBuilder = () => {
  const wrapper = document.getElementById(
    VIRFICE_APP_PREFIX + "-email-preview"
  );
  setTimeout(() => {
    initAllElementsCommonEvents(wrapper);
  }, 100);
};

const initAllElementsCommonEvents = (wrapper) => {
  let allEle = wrapper.querySelectorAll(`[${VIRFICE_APP_PREFIX}-ele_type]`);
  allEle.forEach((ele) => {
    initClickEvent(ele);
    initHoverEvent(ele);
    // initEmptyElement(ele);//not used
  });
};

const initClickEvent = (ele) => {
  ele.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e.target.tagName);
    dispatchDashboardAction(onSelectElement, getVirficeAttr(e.target, "id"));

    let sectionEle = ele;
    if (sectionEle.tagName !== "TABLE") {
      sectionEle = getParentSection(sectionEle);
    }
    dispatchDashboardAction(onSelectSection, getVirficeAttr(sectionEle, "id"));
  });
};

const initHoverEvent = (ele) => {
  ele.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    e.target.classList.add(`${VIRFICE_APP_PREFIX}-hover-border`);
  });
  ele.addEventListener("mouseleave", (e) => {
    e.stopPropagation();
    e.target.classList.remove(`${VIRFICE_APP_PREFIX}-hover-border`);
  });
};

// export const initEmptyElement = (ele) => {
//   const excludedEle = [
//     "a",
//     "p",
//     "body",
//     "html",
//     "h1",
//     "h2",
//     "h3",
//     "h4",
//     "h5",
//     "h6",
//     "span",
//     "img",
//     "input",
//     "textarea",
//     "label",
//   ];

//   if (excludedEle.includes(ele.tagName.toLowerCase())) return;

//   if (!ele.children.length) {
//     ele.innerHTML = `
//           <span style="font-size: 82px;line-height: 90px;">+</span>
//     `;
//     console.log("added");
//   }
// };

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

export const cloneElementFromString = (elementString) => {
  let div = document.createElement("div");
  div.innerHTML = elementString;
  return cloneElement(div.children[0]);
};

export const cloneElement = (element) => {
  let clone = element.cloneNode(true);

  updateVirficeAttr(clone, "id", generateRandomId());
  clone.classList.remove(`${VIRFICE_APP_PREFIX}-hover-border`);

  let allEle = clone.querySelectorAll(`[${VIRFICE_APP_PREFIX}-ele_type]`);
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

export const getParentSection = (element) => {
  let parent = element;
  let flag = true;
  while (flag) {
    if (parent.tagName === "TABLE") {
      return parent;
    } else {
      parent = parent.parentNode;
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
