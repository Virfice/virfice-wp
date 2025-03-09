import React, { useEffect, useState } from "react";
import StickyTopNav from "@components/StickyTopNav";
import { addParams, getParamValue } from "@functions";
import PageHeadingAndSubheading from "@components/PageHeadingAndSubheading";
import Container from "@molecules/Container";
import {
  emailSingleAsync,
  emailSingleVirficeAsync,
  saveWooEmailSettings,
  setWooEmailSingleData,
} from "../wooEmailSingleSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import { VIRFICE_APP_PREFIX } from "@conf";
import Left from "./Left";
import Right from "./Right";
import CheckboxField from "@molecules/CheckboxField";
import {
  globalSettingsAsync,
  saveGlobalSettings,
} from "../../../Settings/globalSettingsSlice";
import VirficeEmailPreview from "../../../../Components/VirficeEmailBuilder/VirficeEmailPreviw";

const EnableDisable = () => {
  const dispatch = useDispatch();
  let wooEmailSingleChangedSettings = useSelector(
    (state) => state.wooEmailSingle?.changedSettings
  );

  const handleStatusChange = (v) => {
    dispatch(
      setWooEmailSingleData({
        key: "changedSettings",
        value: { ...wooEmailSingleChangedSettings, enabled: v ? "yes" : "no" },
      })
    );
  };
  return (
    <CheckboxField
      value={wooEmailSingleChangedSettings["enabled"] === "yes" || false}
      onChange={handleStatusChange}
      type="toggle"
    />
  );
};

const WooEmailPreview = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const email_id = getParamValue("email_id");
  const loaded = useSelector((state) => state.wooEmailSingle?.email?.loaded);
  const [preview, setPreview] = useState(false);
  const settingsLoaded = useSelector(
    (state) => state.globalSettings.email.loaded
  );
  const emailSettings = useSelector(
    (state) => state.wooEmailSingle?.email?.settings
  );

  const virfice_template = useSelector(
    (state) => state.wooEmailSingle?.virfice_template
  );

  useEffect(() => {
    dispatch(emailSingleAsync(email_id));
    dispatch(globalSettingsAsync(["email"]));
    dispatch(emailSingleVirficeAsync(email_id));
  }, []);

  const handleBackActionClick = () => {
    window.location.href = addParams({
      menu: "woo-email-edit-virfice",
      email_id: email_id,
    });
  };

  // const handleCancelActionClick = () => {
  //   window.location.href = addParams({
  //     menu: "woo-email-list",
  //   });
  // };
  const handleSaveClick = () => {
    const s = store.getState();
    const emailSettings = s.wooEmailSingle.email.settings;
    const emailChangedSettings = s.wooEmailSingle.changedSettings;
    dispatch(
      saveWooEmailSettings(emailSettings.id, {
        changedSettings: emailChangedSettings,
      })
    );
    dispatch(saveGlobalSettings("email"));
    // handleCancelActionClick();
  };

  const handleDiscardClick = () => {
    window.location.href = addParams({
      menu: "woo-email-list",
    });
  };

  if (!loaded) return <>loading</>;

  if (preview)
    return (
      <VirficeEmailPreview
        template_id={virfice_template.id}
        onClose={() => {
          setPreview(false);
        }}
      />
    );

  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        discardButtonText="Cancel"
        saveAction={handleSaveClick}
        breadCrumb={[
          {
            title: "Design",
            isActive: false,
            link: addParams({
              menu: "woo-email-edit-virfice",
              email_id: email_id,
            }),
          },
          { title: "Settings", isActive: true },
        ]}
      />
      <section>
        <PageHeadingAndSubheading
          heading={emailSettings?.title}
          subHeading={emailSettings?.description}
          quickAction={<EnableDisable />}
        />
        <Container>
          <div style={{ marginTop: 36 }}>
            <div className={`${VIRFICE_APP_PREFIX}-flex`} style={{ gap: 64 }}>
              <Left />
              {settingsLoaded && (
                <Right
                  onPreviewButtonClick={() => {
                    setPreview(true);
                  }}
                />
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default WooEmailPreview;
