import {
  VIRFICE_APP_PREFIX,
  VIRFICE_PLUGIN_BASE,
} from "../../../../../../conf";

export const getTextString = ({ title, content }) =>
  `<p ${VIRFICE_APP_PREFIX}-title="${
    title || "Text"
  }" ${VIRFICE_APP_PREFIX}-ele_type="text">${
    content ||
    "Add your text here. Edit to add dynamic values like name, email and more."
  }</p>`;

export const getImageString = ({ title }) =>
  `<img ${VIRFICE_APP_PREFIX}-title="${
    title || "Image"
  }" ${VIRFICE_APP_PREFIX}-ele_type="image" src="${VIRFICE_PLUGIN_BASE}/assets/files/demo-image.jpg" />`;

export const getVideoString = ({ title }) =>
  `<img ${VIRFICE_APP_PREFIX}-title="${
    title || "Video"
  }" ${VIRFICE_APP_PREFIX}-ele_type="video" src="${VIRFICE_PLUGIN_BASE}/assets/files/demo-video.jpg" />`;

export const getButtonString = ({ title, content }) =>
  `<a ${VIRFICE_APP_PREFIX}-title="${
    title || "Button"
  }" ${VIRFICE_APP_PREFIX}-ele_type="link" style="display: inline-flex; gap: 8px; border-radius: 4px; padding: 8px 16px; background-color: #161A05; color: #F9FCEE;">${
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
  };padding-bottom: ${paddingBottom || "0px"};">
                  ${child}
              </td>
          </tr>
      </tbody>
  </table>`;
};