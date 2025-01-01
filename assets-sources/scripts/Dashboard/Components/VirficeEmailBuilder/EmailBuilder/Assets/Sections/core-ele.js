import { VIRFICE_APP_PREFIX, VIRFICE_PLUGIN_BASE } from "@conf";

export const getTextString = ({ title, content, tag = "p", selector = "" }) =>
  `<${tag} ${VIRFICE_APP_PREFIX}-title="${
    title || "Text"
  }" ${VIRFICE_APP_PREFIX}-ele_type="text" ${VIRFICE_APP_PREFIX}-selector="${selector}" contentEditable>${
    content ||
    "Add your text here. Edit to add dynamic values like name, email and more."
  }</${tag}>`;

export const getOnlyEditableTextString = ({
  content,
  tag = "p",
  selector = "",
  mySelector = "",
}) =>
  `<${tag} ${VIRFICE_APP_PREFIX}-selector="${selector}" ${VIRFICE_APP_PREFIX}-my_selector="${mySelector}" contentEditable>${
    content ||
    "Add your text here. Edit to add dynamic values like name, email and more."
  }</${tag}>`;

export const getImageString = ({ title }) =>
  `<a style="width:100%;"><img ${VIRFICE_APP_PREFIX}-title="${
    title || "Image"
  }" ${VIRFICE_APP_PREFIX}-ele_type="image" src="${VIRFICE_PLUGIN_BASE}/assets/files/demo-image.jpg" /></a>`;

export const getVideoString = ({ title }) =>
  `<img ${VIRFICE_APP_PREFIX}-title="${
    title || "Video"
  }" ${VIRFICE_APP_PREFIX}-ele_type="video" src="${VIRFICE_PLUGIN_BASE}/assets/files/demo-video.jpg" />`;

export const getButtonString = ({ title, content }) =>
  `<a ${VIRFICE_APP_PREFIX}-title="${
    title || "Button"
  }" ${VIRFICE_APP_PREFIX}-ele_type="link" style="display: inline-flex; gap: 8px; border-radius: 4px; padding: 8px 16px; background-color: #161A05; color: #F9FCEE;" contentEditable>${
    content || "Button"
  }</a>`;

export const getSingleColTable = (
  child,
  { title, paddingTop, paddingBottom }
) => {
  return `<table ${VIRFICE_APP_PREFIX}-title="${
    title || "Custom Section"
  }" ${VIRFICE_APP_PREFIX}-ele_type="section">
      <tbody>
          <tr>
              <td ${VIRFICE_APP_PREFIX}-title="Column" ${VIRFICE_APP_PREFIX}-ele_type="column" style="padding-top: ${
    paddingTop || "0px"
  };padding-bottom: ${paddingBottom || "0px"}; text-align:center;">
                  ${child}
              </td>
          </tr>
      </tbody>
  </table>`;
};

export const getBasicEleWrapper = (
  child,
  { paddingTop, paddingBottom, paddingLeft, paddingRight, textAlign }
) => {
  return `<div ${VIRFICE_APP_PREFIX}-ele_type="section" ${VIRFICE_APP_PREFIX}-settings_status="disabled"  style="padding-top: ${
    paddingTop || "16px"
  };padding-bottom: ${paddingBottom || "16px"}; padding-left: ${
    paddingLeft || "0px"
  }; padding-right: ${paddingRight || "0px"}; text-align:${
    textAlign || "center"
  };">
  ${child}
  </div>`;
};
