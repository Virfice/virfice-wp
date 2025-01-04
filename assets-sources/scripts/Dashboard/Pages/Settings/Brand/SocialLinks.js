import React from "react";
import TextField from "../../../Molecules/TextField";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import Card from "../../../Molecules/Card";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalSettingsData } from "../globalSettingsSlice";

const SocialLinks = () => {
  const dispatch = useDispatch();
  const changedSettings = useSelector(
    (state) => state.globalSettings["changedSettings-brand"]
  );

  const settingsChange = (key, value) => {
    dispatch(
      setGlobalSettingsData({
        key: "changedSettings-brand",
        value: { ...changedSettings, [key]: value },
      })
    );
  };

  return (
    <Card>
      <div style={{ width: "100%" }}>
        <div
          className={`${VIRFICE_APP_PREFIX}-form-group`}
          style={{ marginBottom: "16px" }}
        >
          <div className={`title__medium`}>Social links</div>
          <div className="body__medium" style={{ maxWidth: 521 }}>
            The links set here will be added to the bottom of the emails if the
            user selects the checkbox 'Show social media icons.'
          </div>
        </div>

        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <TextField
            label={"Facebook"}
            value={changedSettings["virfice_facebook_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_facebook_url", v);
            }}
          />

          <TextField
            label={"Instagram"}
            value={changedSettings["virfice_instagram_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_instagram_url", v);
            }}
          />
          <TextField
            label={"YouTube"}
            value={changedSettings["virfice_youTube_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_youTube_url", v);
            }}
          />
          <TextField
            label={"X"}
            value={changedSettings["virfice_x_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_x_url", v);
            }}
          />
          <TextField
            label={"TikTok"}
            value={changedSettings["virfice_tiktok_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_tiktok_url", v);
            }}
          />
          <TextField
            label={"Snapchat"}
            value={changedSettings["virfice_snapchat_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_snapchat_url", v);
            }}
          />
          <TextField
            label={"Pinterest"}
            value={changedSettings["virfice_pinterest_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_pinterest_url", v);
            }}
          />
          <TextField
            label={"Tumblr"}
            value={changedSettings["virfice_tumblr_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_tumblr_url", v);
            }}
          />
          <TextField
            label={"Vimeo"}
            value={changedSettings["virfice_vimeo_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_vimeo_url", v);
            }}
          />
          <TextField
            label={"Telegram"}
            value={changedSettings["virfice_telegram_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_telegram_url", v);
            }}
          />
          <TextField
            label={"VK"}
            value={changedSettings["virfice_vk_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_vk_url", v);
            }}
          />
          <TextField
            label={"Phone"}
            value={changedSettings["virfice_phone_url"] || ""}
            onChange={(v) => {
              settingsChange("virfice_phone_url", v);
            }}
          />
        </div>
      </div>
    </Card>
  );
};
export default SocialLinks;
