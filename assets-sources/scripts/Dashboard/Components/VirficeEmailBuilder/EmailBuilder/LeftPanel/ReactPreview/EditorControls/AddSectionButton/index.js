import React, { useEffect, useState } from "react";
import Button from "@molecules/Button";
import { dispatchDashboardAction } from "@functions";
import { AddIcon, ReadyBlocks } from "@svg-icons";
import { VIRFICE_APP_PREFIX } from "@conf";
import Header from "./Header";
import Body from "./Body";
import { setBuilderData } from "../../../../../builderSlice";

const AddSectionButton = ({ element }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [element]);

  useEffect(() => {
    window.AddSectionButtonOpen = open;
  }, [open]);

  return (
    <div
      className={
        VIRFICE_APP_PREFIX +
        "-add-section-button-wrapper " +
        `${
          open ? VIRFICE_APP_PREFIX + "-add-section-button-wrapper-opened" : ""
        }`
      }
    >
      {!open && (
        <div
          className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          style={{
            pointerEvents: "all",
            justifyContent: "center",
            width: "100%",
          }}
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
              // setOpen(true);
              dispatchDashboardAction(setBuilderData, {
                key: "showReadyBlocks",
                value: true,
              });
            }}
          />
        </div>
      )}
      {open && (
        <div
          className={VIRFICE_APP_PREFIX + "-add-section-items-wrapper"}
          style={{ pointerEvents: "all" }}
        >
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
