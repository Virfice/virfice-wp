import React from "react";
import {
  ColumnIcon,
  DividerIcon,
  HandTapIcon,
  ImageIcon,
  MonitorPlayIcon,
  TextIcon,
  TextOutdentIcon,
} from "@svg-icons";
import { VIRFICE_APP_PREFIX } from "@conf";
import {
  getBasicEleWrapper,
  getButtonString,
  getImageString,
  getSingleColTable,
  getTextString,
  getVideoString,
} from "../core-ele";

const Text = {
  title: "Text",
  icon: <TextIcon />,
  template: getBasicEleWrapper(
    getTextString({
      title: "Text",
      content:
        "Add your text here. Edit to add dynamic values like name, email and more.",
    }),
    {
      paddingTop: "16px",
      paddingBottom: "16px",
    }
  ),
};
const Image = {
  title: "Image",
  icon: <ImageIcon />,
  template: getBasicEleWrapper(getImageString({ title: "Image" }), {
    paddingTop: "16px",
    paddingBottom: "16px",
  }),
};

const Video = {
  title: "Video",
  icon: <MonitorPlayIcon />,
  template: getBasicEleWrapper(getVideoString({ title: "Video" }), {
    paddingTop: "16px",
    paddingBottom: "16px",
  }),
};

const Button = {
  title: "Button",
  icon: <HandTapIcon />,
  template: getBasicEleWrapper(
    getButtonString({
      title: "Button",
      content: "Button",
    }),
    {
      paddingTop: "16px",
      paddingBottom: "16px",
    }
  ),
};

const ImageWithText = {
  title: "Image with Text",
  icon: <TextOutdentIcon />,
  template: `<table ${VIRFICE_APP_PREFIX}-title="Image with Text" ${VIRFICE_APP_PREFIX}-ele_type="section">
    <tbody>
        <tr ${VIRFICE_APP_PREFIX}-title="Row 1" ${VIRFICE_APP_PREFIX}-ele_type="row">
            <td ${VIRFICE_APP_PREFIX}-title="Column 1" ${VIRFICE_APP_PREFIX}-ele_type="column" style"text-align: center;">
                ${getImageString({ title: "Image" })}
            </td>
            <td ${VIRFICE_APP_PREFIX}-title="Column 2" ${VIRFICE_APP_PREFIX}-ele_type="column" style="padding: 16px;text-align: center;">
                ${getTextString({
                  title: "Text",
                  content: "This is a text field. Add and edit content here.",
                })}
                ${getButtonString({ title: "Button", content: "Sign up" })}
            </td>
        </tr>
    </tbody>
</table>`,
};

const Column = {
  title: "Column",
  icon: <ColumnIcon />,
  template: `<table ${VIRFICE_APP_PREFIX}-title="Column" ${VIRFICE_APP_PREFIX}-ele_type="section">
    <tbody>
        <tr ${VIRFICE_APP_PREFIX}-title="Row 1" ${VIRFICE_APP_PREFIX}-ele_type="row">
            <td ${VIRFICE_APP_PREFIX}-title="Column 1" ${VIRFICE_APP_PREFIX}-ele_type="column" style="padding-bottom: 16px;text-align: center;">
                ${getImageString({ title: "Image" })}
                ${getTextString({
                  title: "Text",
                  content: "This is a text field. Add and edit content here.",
                })}
                ${getButtonString({ title: "Button", content: "Button" })}
            </td>
            <td ${VIRFICE_APP_PREFIX}-title="Column 2" ${VIRFICE_APP_PREFIX}-ele_type="column" style="padding-bottom: 16px;text-align: center;">
                ${getImageString({ title: "Image" })}
                ${getTextString({
                  title: "Text",
                  content: "This is a text field. Add and edit content here.",
                })}
                ${getButtonString({ title: "Button", content: "Button" })}
            </td>
        </tr>
    </tbody>
</table>`,
};

const Divider = {
  title: "Divider",
  icon: <DividerIcon />,
  template: getSingleColTable(
    `<div  ${VIRFICE_APP_PREFIX}-title="Divider" ${VIRFICE_APP_PREFIX}-ele_type="divider" style="background:#161A05; width: 100%;height: 1px;"></div>`,
    { title: "Divider", paddingTop: "16px", paddingBottom: "16px" }
  ),
};

export default [Column, Text, Button, Image, Video, ImageWithText, Divider];
