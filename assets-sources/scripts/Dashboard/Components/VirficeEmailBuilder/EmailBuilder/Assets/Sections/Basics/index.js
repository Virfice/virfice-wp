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
      content: "Shop now!",
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
  template: getBasicEleWrapper(
    `<table>
    <tbody ${VIRFICE_APP_PREFIX}-title="Columns" ${VIRFICE_APP_PREFIX}-ele_type="row">
        <tr>
            <td ${VIRFICE_APP_PREFIX}-title="Column 1" ${VIRFICE_APP_PREFIX}-ele_type="column" style"text-align: center; padding: 8px;">
                ${getImageString({ title: "Image" })}
            </td>
            <td ${VIRFICE_APP_PREFIX}-title="Column 2" ${VIRFICE_APP_PREFIX}-ele_type="column" style="text-align: center; padding: 8px;">
                ${getTextString({
                  title: "Text",
                  content: "This is a text field. Add and edit content here.",
                })}
                ${getButtonString({ title: "Button", content: "Sign up" })}
            </td>
        </tr>
    </tbody>
</table>`,
    {
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "16px",
      paddingBottom: "16px",
      title: "Image with Text",
    }
  ),
};

const Column = {
  title: "Columns",
  icon: <ColumnIcon />,
  template: getBasicEleWrapper(
    `<table>
    <tbody ${VIRFICE_APP_PREFIX}-title="Columns" ${VIRFICE_APP_PREFIX}-ele_type="row">
        <tr>
            <td ${VIRFICE_APP_PREFIX}-title="Column 1" ${VIRFICE_APP_PREFIX}-ele_type="column" style="padding: 16px;text-align: center;">
                ${getImageString({ title: "Image" })}
                ${getTextString({
                  title: "Text",
                  content: "This is a text field. Add and edit content here.",
                })}
                ${getButtonString({ title: "Button", content: "Button" })}
            </td>
            <td ${VIRFICE_APP_PREFIX}-title="Column 2" ${VIRFICE_APP_PREFIX}-ele_type="column" style="padding: 16px;text-align: center;">
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
    {
      paddingLeft: "30px",
      paddingRight: "30px",
      paddingTop: "30px",
      paddingBottom: "30px",
    }
  ),
};

const Divider = {
  title: "Divider",
  icon: <DividerIcon />,
  template: getBasicEleWrapper(
    `<div  ${VIRFICE_APP_PREFIX}-title="Divider" ${VIRFICE_APP_PREFIX}-ele_type="divider" style="border-top-width:2px;border-style:dashed;width: 100%;"></div>`,
    { title: "Divider", paddingTop: "48px", paddingBottom: "48px" }
  ),
};

export default [Column, Text, Button, Image, ImageWithText, Divider];
