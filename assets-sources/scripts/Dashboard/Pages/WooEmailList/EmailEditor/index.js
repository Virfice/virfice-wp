import React, { useEffect } from "react";
import StickyTopNav from "../../../Components/StickyTopNav";
import PageHeadingAndSubheading from "../../../Components/PageHeadingAndSubheading";
import Container from "../../../Molecules/Container";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import { addParams, getParamValue } from "../../../../functions";
import { useDispatch,useSelector } from "react-redux";
import { emailSingleAsync, saveWooEmailSettings, setWooEmailSingleData } from "./wooEmailSingleSlice";
import Card from "../../../Molecules/Card";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { showNotificationBell } from "../../../Components/componentsSlice";

const EmailEditor = () => {
  const email_id = getParamValue("email_id");
  const dispatch = useDispatch();
  const emailSettings = useSelector((state) => state.wooEmailSingle?.email?.settings);
  const changedSettings = useSelector((state) => state.wooEmailSingle?.changedSettings);

  useEffect(() => {
    dispatch(emailSingleAsync(email_id));
  }, []);

  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "woo-email-list" });
  };

  const handleDiscardClick = () => {
    // dispatch(setBrandSettingsData({ key: "changedSettings", value: settingsData }));

    dispatch(
      setWooEmailSingleData({
        key: "changedSettings",
        value: emailSettings.settings,
      })
    );
    dispatch(showNotificationBell({title: 'Settings discarded', type:'danger'}));
  };
  const handleSaveClick = () => {
    dispatch(saveWooEmailSettings(emailSettings.id,{ changedSettings }))
  };

  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        saveAction={handleSaveClick}
      />
      <section>
        <PageHeadingAndSubheading
          heading={emailSettings?.title}
          subHeading={
            emailSettings?.description
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

export default EmailEditor;
