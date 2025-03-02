import React from "react";
import Iframe from "@molecules/Iframe";
import { useSelector } from "react-redux";
import { addParams } from "@functions";
import { VIRFICE_APP_PREFIX } from "@conf";

const Preview = () => {
  let previewUrl = useSelector(
    (state) => state.wooEmailSingle?.email?.settings?.previewUrl || false
  );
  let changedSettings = useSelector(
    (state) => state.wooEmailSingle?.changedSettings
  );
  let selectedOrder = useSelector(
    (state) => state.wooEmailSingle?.selectedOrder
  );

  if (!previewUrl) return null;

  previewUrl = addParams({ order_id: selectedOrder?.id || "" }, previewUrl);
  previewUrl = addParams(changedSettings, previewUrl);

  return <Iframe src={previewUrl} id={VIRFICE_APP_PREFIX + "-email-preview"} />;
};

export default Preview;
