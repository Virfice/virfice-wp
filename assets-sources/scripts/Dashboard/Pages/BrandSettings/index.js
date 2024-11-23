import React, { useEffect } from "react";
import StickyTopNav from "../../Components/StickyTopNav";
import Container from "@molecules/Container";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import { addParams } from "../../../functions";
import RightPanel from "./RightPanel";
import { useDispatch, useSelector } from "react-redux";
import {
  brandSettingsAsync,
  emailListAsync,
  saveBrandSettings,
  setBrandSettingsData,
} from "./brandSettingsSlice";
import LeftPanel from "./LeftPanel";
import PageHeadingAndSubheading from "../../Components/PageHeadingAndSubheading";
import Loading from "@molecules/Loading";
import { showNotificationBell } from "../../Components/componentsSlice";

const BrandSettings = () => {
  const dispatch = useDispatch();
  const emailListLoaded = useSelector(
    (state) => state.brandSettings.emailList.loaded
  );
  const settingsLoaded = useSelector(
    (state) => state.brandSettings.settings.loaded
  );
  const settingsData = useSelector(
    (state) => state.brandSettings.settings.data
  );
  const changedSettings = useSelector(
    (state) => state.brandSettings.changedSettings
  );
  useEffect(() => {
    dispatch(emailListAsync());
    dispatch(brandSettingsAsync());
  }, []);

  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "" });
  };

  const handleDiscardClick = () => {
    dispatch(
      setBrandSettingsData({ key: "changedSettings", value: settingsData })
    );
    dispatch(
      showNotificationBell({ title: "Settings discarded", type: "danger" })
    );
  };
  const handleSaveClick = () => {
    dispatch(saveBrandSettings(changedSettings));
  };

  if (!emailListLoaded || !settingsLoaded) return <Loading />;

  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        saveAction={handleSaveClick}
      />
      <section>
        <PageHeadingAndSubheading
          heading={"Email brand settings"}
          subHeading={
            "Customize the look and feel of all WooCommerce emails globally. Let your emails represent your store."
          }
        />
        <Container>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-20`}
          >
            <LeftPanel />
            <RightPanel />
          </div>
        </Container>
      </section>
    </>
  );
};

export default BrandSettings;
