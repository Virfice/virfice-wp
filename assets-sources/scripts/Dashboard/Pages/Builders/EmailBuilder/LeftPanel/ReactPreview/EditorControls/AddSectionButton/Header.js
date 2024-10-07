import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../../../../conf";
import { CloseIcon } from "../../../../../../../icons";

const Header = ({ onClose }) => {
  return (
    <div className={VIRFICE_APP_PREFIX + "-add-section-header"}>
      <span className={VIRFICE_APP_PREFIX + "-title"}>Add a new section</span>
      {/* <Button icon={<AddIcon />} onClick={onClose} /> */}
      <div
        onClick={onClose}
        style={{ cursor: "pointer", pointerEvents: "all" }}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default Header;
