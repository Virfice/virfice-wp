import React, { useEffect, useState } from "react";
import Button from "@molecules/Button";
import { AddIcon } from "../../../../../../../icons";
import { VIRFICE_APP_PREFIX } from "../../../../../../../../conf";
import Header from "./Header";
import Body from "./Body";

const AddSectionButton = ({ element }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [element]);
  return (
    <div className={VIRFICE_APP_PREFIX + "-add-section-button-wrapper"}>
      {!open && (
        <Button
          icon={<AddIcon />}
          onClick={() => {
            setOpen(true);
          }}
        />
      )}
      {open && (
        <div className={VIRFICE_APP_PREFIX + "-add-section-items-wrapper"}>
          <Header
            onClose={() => {
              setOpen(false);
            }}
          />
          <Body
            element={element}
            onAdd={() => {
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddSectionButton;
