import React, { useEffect } from "react";
import StickyTopNav from "@components/StickyTopNav";
import Container from "@molecules/Container";
import { VIRFICE_APP_PREFIX } from "@conf";
import { addParams, saveEmailOuterAndInnerBGColor } from "@functions";
import { useDispatch, useSelector } from "react-redux";
import {
  virficeBrandSettingsAsync,
  saveVirficeBrandSettings,
  setVirficeBrandSettingsData,
} from "./virficeBrandSettingsSlice";
import PageHeadingAndSubheading from "@components/PageHeadingAndSubheading";
import Loading from "@molecules/Loading";
import { showNotificationBell } from "@components/componentsSlice";
import VirficeEmailBuilder from "../../Components/VirficeEmailBuilder";

const VirficeBrandSettings = () => {
  const dispatch = useDispatch();
  const settingsLoaded = useSelector(
    (state) => state.virficeBrandSettings.settings.loaded
  );
  const settingsData = useSelector(
    (state) => state.virficeBrandSettings.settings.data
  );
  const changedSettings = useSelector(
    (state) => state.virficeBrandSettings.changedSettings
  );
  useEffect(() => {
    dispatch(virficeBrandSettingsAsync());
  }, []);

  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "" });
  };

  const handleDiscardClick = () => {
    dispatch(
      setVirficeBrandSettingsData({
        key: "changedSettings",
        value: settingsData,
      })
    );
    dispatch(
      showNotificationBell({ title: "Settings discarded", type: "danger" })
    );
  };
  const handleSaveClick = () => {
    dispatch(saveVirficeBrandSettings(changedSettings));
    saveEmailOuterAndInnerBGColor();
  };

  const template_id = settingsData?.template_id || false;

  if (!settingsLoaded) return <Loading />;

  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        saveAction={handleSaveClick}
      />
      <section>
        <PageHeadingAndSubheading
          heading={"Brand settings"}
          subHeading={
            "Customize the look and feel of all WooCommerce emails globally. Let your emails represent your store."
          }
        />
        <Container>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-20`}
          >
            {template_id && <VirficeEmailBuilder template_id={template_id} />}
            {!template_id && "Template not found"}
          </div>
        </Container>
      </section>
    </>
  );
};

export default VirficeBrandSettings;
