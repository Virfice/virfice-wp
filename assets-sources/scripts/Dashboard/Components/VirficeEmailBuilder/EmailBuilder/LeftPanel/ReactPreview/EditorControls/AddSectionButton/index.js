import React, { useEffect, useState } from "react";
import Button from "@molecules/Button";
import { AddIcon, ReadyBlocks } from "@svg-icons";
import { VIRFICE_APP_PREFIX } from "@conf";
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
        <div
          className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
        >
          <Button
            leftIcon={<AddIcon />}
            title={"Elements"}
            type="secondary"
            onClick={() => {
              setOpen(true);
            }}
          />
          <Button
            leftIcon={<ReadyBlocks />}
            title={"Ready blocks"}
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
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
