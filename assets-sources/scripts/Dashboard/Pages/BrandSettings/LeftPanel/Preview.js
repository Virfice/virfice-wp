import React from "react";
import Iframe from "@molecules/Iframe";
import { useSelector } from "react-redux";
import { addParams } from "@functions";
import { VIRFICE_APP_PREFIX } from "../../../../conf";

const Preview = () => {
  let previewUrl = useSelector(
    (state) => state.brandSettings?.currentEmail?.previewUrl
  );
  const changedSettings = useSelector(
    (state) => state.brandSettings.changedSettings
  );
  const selectedOrder = useSelector(
    (state) => state.brandSettings.selectedOrder
  );
  if (!previewUrl) return "Select a Template type";
  previewUrl = addParams(changedSettings, previewUrl);
  previewUrl = addParams({ order_id: selectedOrder?.id || "" }, previewUrl);
  return <Iframe src={previewUrl} id={VIRFICE_APP_PREFIX + "-email-preview"} />;
};

export default Preview;
