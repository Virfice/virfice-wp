import React, { useEffect, useState } from "react";
import { getElementBasicSettings } from "./utils";
import { VIRFICE_APP_PREFIX } from "@conf";
import TextSettings from "./TextSettings";
import ImageSettings from "./ImageSettings";
import RowSettings from "./RowSettings";
import LinkSettings from "./LinkSettings";
import ColumnSettings from "./ColumnSettings";
import SectionSettings from "./SectionSettings";
import DividerSettings from "./DividerSettings";
import OrderTableSettings from "./OrderTableSettings";
import OrderAddressSettings from "./OrderAddressSettings";

const Settings = ({ element }) => {
  const [eleInfo, setEleInfo] = useState({});
  useEffect(() => {
    setEleInfo(getElementBasicSettings(element));
  }, [element]);
  return (
    <div
      className={VIRFICE_APP_PREFIX + "-settings-wrapper"}
      style={{ width: "100%" }}
    >
      {eleInfo?.type === "text" && <TextSettings element={element} />}
      {eleInfo?.type === "image" && <ImageSettings element={element} />}
      {eleInfo?.type === "link" && <LinkSettings element={element} />}
      {eleInfo?.type === "divider" && <DividerSettings element={element} />}
      {eleInfo?.type === "row" && <RowSettings element={element} />}
      {eleInfo?.type === "column" && <ColumnSettings element={element} />}
      {eleInfo?.type === "section" && <SectionSettings element={element} />}
      {eleInfo?.type === "woocommerce_email_order_details" && (
        <OrderTableSettings element={element} />
      )}
      {eleInfo?.type === "woocommerce_email_order_address" && (
        <OrderAddressSettings element={element} />
      )}
    </div>
  );
};

export default Settings;
