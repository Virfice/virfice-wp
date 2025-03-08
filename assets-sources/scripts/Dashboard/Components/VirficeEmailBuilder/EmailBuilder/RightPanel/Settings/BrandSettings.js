import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import RangeField from "@molecules/Rangefield";
import MediaUploader from "@molecules/MediaUploader";
import PaintField from "@molecules/PaintField";
import TextField from "@molecules/TextField";
import Card from "@molecules/Card";
import { useDispatch, useSelector } from "react-redux";
import { setVirficeBrandSettingsData } from "../../../../../Pages/VirficeBrandSettings/virficeBrandSettingsSlice";
import { setBuilderData } from "../../../builderSlice";

const BrandSettings = ({ element }) => {
  const dispatch = useDispatch();
  const changedSettings = useSelector(
    (state) => state.virficeBrandSettings.changedSettings
  );

  const settingsChange = (key, value) => {
    const c = { ...changedSettings, [key]: value };
    dispatch(
      setVirficeBrandSettingsData({
        key: "changedSettings",
        value: c,
      })
    );

    dispatch(
      setBuilderData({
        key: "global_style",
        value: getGlobalStyleStyleTag(c),
      })
    );
  };

  const getGlobalStyleStyleTag = (changedSettings) => {
    const {
      email_outer_background_color,
      email_background_color,
      email_body_width,
      email_body_text,
      email_body_button_bg,
      email_body_button_color,
      header_text_color,
      header_icons_color,
      header_background_color,
      footer_text_color,
      footer_icons_color,
      footer_link_color,
      footer_background_color,
    } = changedSettings;

    return `<style>
       body{
            margin: 0;
            padding: 0;
            background-color: ${email_outer_background_color};
            color: ${email_body_text};
        }
        .virfice-template-wrapper{
            width: ${email_body_width}px;
            max-width: 100%;
            margin: auto;
            background-color: ${email_background_color};
        }
        .virfice-template-wrapper table {
            width: 100%;
            border-collapse: collapse;
        }
        .virfice-template-wrapper a {
            text-decoration: none;
            color: inherit;
        }
       .virfice-template-wrapper h2 {
            font-size: 20px;
            color: inherit;
        }
        .virfice-template-wrapper p {
            font-size: 16px;
            line-height: 1.5;
            margin: 0;
        }
        .virfice-template-wrapper [virfice-ele_type='link']{
            display: inline-block;
            color: ${email_body_button_color};
            background-color: ${email_body_button_bg};
        }
        .virfice-template-wrapper img {
            max-width: 100%;
            height: auto;
            display: block;
            border: 0;
        }
        .virfice-template-wrapper .virfice-email-header{
            color: ${header_text_color};
            background-color: ${header_background_color};
        }
        .virfice-template-wrapper .virfice-email-footer{
            color: ${footer_text_color};
            background-color: ${footer_background_color};
        }
        </style>`;
  };
  return (
    <>
      <Card className={`${VIRFICE_APP_PREFIX}-flex-col`} style={{ gap: 0 }}>
        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <div className="title__medium">Email appearance</div>
          <RangeField
            label={"Email width"}
            value={changedSettings.email_body_width}
            onChange={(v) => {
              settingsChange("email_body_width", v);
            }}
            min={400}
            max={800}
            step={1}
          />

          <MediaUploader
            label={"Logo"}
            value={changedSettings.logo}
            onDelete={() => {
              settingsChange("logo", "");
            }}
            onSelect={(media) => {
              settingsChange("logo", media.url);
              // element.src = media.url;
            }}
            info={"An image you want to show in the email header."}
          />
          <TextField
            label={"Store name"}
            value={changedSettings.store_name}
            onChange={(v) => {
              settingsChange("store_name", v);
            }}
          />
        </div>
      </Card>
      <Card className={`${VIRFICE_APP_PREFIX}-flex-col`} style={{ gap: 0 }}>
        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <div className="title__medium">Background colors</div>
          <PaintField
            label={"Email background"}
            value={changedSettings.email_background_color}
            onChange={(v) => {
              settingsChange("email_background_color", v);
            }}
          />
          <PaintField
            label={"Outer background"}
            value={changedSettings.email_outer_background_color}
            onChange={(v) => {
              settingsChange("email_outer_background_color", v);
            }}
          />
        </div>
      </Card>

      <Card className={`${VIRFICE_APP_PREFIX}-flex-col`} style={{ gap: 0 }}>
        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <div className="title__medium">Body colors</div>
          <PaintField
            label={"Text"}
            value={changedSettings.email_body_text}
            onChange={(v) => {
              settingsChange("email_body_text", v);
            }}
          />
          <PaintField
            label={"Button"}
            value={changedSettings.email_body_button_bg}
            onChange={(v) => {
              settingsChange("email_body_button_bg", v);
            }}
          />
          <PaintField
            label={"Button text"}
            value={changedSettings.email_body_button_color}
            onChange={(v) => {
              settingsChange("email_body_button_color", v);
            }}
          />
        </div>
      </Card>

      {/* <Card className={`${VIRFICE_APP_PREFIX}-flex-col`} style={{ gap: 0 }}>
        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <div className="title__medium">Header colors</div>
          <PaintField
            label={"Text"}
            value={changedSettings.header_text_color}
            onChange={(v) => {
              settingsChange("header_text_color", v);
            }}
          />
          <PaintField
            label={"Icon"}
            value={changedSettings.header_icons_color}
            onChange={(v) => {
              settingsChange("header_icons_color", v);
            }}
          />
          <PaintField
            label={"Background"}
            value={changedSettings.header_background_color}
            onChange={(v) => {
              settingsChange("header_background_color", v);
            }}
          />
        </div>
      </Card>

      <Card className={`${VIRFICE_APP_PREFIX}-flex-col`} style={{ gap: 0 }}>
        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <div className="title__medium">Footer colors</div>
          <PaintField
            label={"Text"}
            value={changedSettings.footer_text_color}
            onChange={(v) => {
              settingsChange("footer_text_color", v);
            }}
          />
          <PaintField
            label={"Icon"}
            value={changedSettings.footer_icons_color}
            onChange={(v) => {
              settingsChange("footer_icons_color", v);
            }}
          />
          <PaintField
            label={"Link"}
            value={changedSettings.footer_link_color}
            onChange={(v) => {
              settingsChange("footer_link_color", v);
            }}
          />
          <PaintField
            label={"Background"}
            value={changedSettings.footer_background_color}
            onChange={(v) => {
              settingsChange("footer_background_color", v);
            }}
          />
        </div>
      </Card> */}
    </>
  );
};

export default BrandSettings;
