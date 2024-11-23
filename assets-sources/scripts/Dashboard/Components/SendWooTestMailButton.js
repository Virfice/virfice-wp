import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@molecules/Button";
import { EnvelopIcon, FormInfoIllustration, PaperPlaneIcon } from "@svg-icons";
import Modal from "./Modal";
import TextField from "@molecules/TextField";
import axios from "axios";
import { showNotificationBell } from "./componentsSlice";
import { validateCommaSeparatedEmails } from "@functions";
import FormInfo from "./FormInfo";
import { VIRFICE_APP_PREFIX } from "@conf";
import { globalSettingsAsync } from "../Pages/Settings/globalSettingsSlice";

const SendWooTestMailButton = ({ email_id, order_id, changedSettings }) => {
  const dispatch = useDispatch();
  const globalEmailSettings = useSelector(
    (state) => state.globalSettings["changedSettings-email"]
  );
  const [testMailPopupOpen, setTestMailPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [emails, setEmails] = useState("");

  useEffect(() => {
    dispatch(globalSettingsAsync(["email"]));
  }, []);

  useEffect(() => {
    setEmails(
      (globalEmailSettings &&
        globalEmailSettings["woocommerce_email_from_address"] + ",") ||
        ""
    );
  }, [globalEmailSettings]);

  const handlePopupClose = () => {
    setTestMailPopupOpen(false);
  };

  const handleEmailInput = (v) => {
    setEmails(v);
  };
  const sendEmail = () => {
    if (!validateCommaSeparatedEmails(emails)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setErrorMessage(false);
    let d = null;
    let apiSlug = "virfice/v1/woo-email/send-test-email";
    const formData = new FormData();
    formData.append("emails", emails);
    // formData.append("previewUrl", previewUrl);
    formData.append("email_id", email_id);
    formData.append("order_id", order_id);
    formData.append("changedSettings", JSON.stringify(changedSettings));
    axios
      .post(`${virfice.restBase}${apiSlug}`, formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          "X-WP-Nonce": virfice.nonce,
        },
      })
      .then((res) => {
        d = res.data;
        setTestMailPopupOpen(false);
        dispatch(
          showNotificationBell({
            title: "Test email sent! Check your inbox.",
            type: "success",
          })
        );
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          showNotificationBell({
            title: "Failed to send test email!",
            type: "danger",
          })
        );
      });
  };

  return (
    <>
      <Button
        title="Send test mail"
        type="tertiary"
        leftIcon={<EnvelopIcon />}
        onClick={() => {
          setTestMailPopupOpen(true);
        }}
      />
      <Modal
        open={testMailPopupOpen}
        heading="Send test email"
        primaryActionProps={{
          title: "Send",
          leftIcon: <PaperPlaneIcon />,
          onClick: sendEmail,
        }}
        secondaryActionProps={{
          title: "Cancel",
          onClick: () => {
            setTestMailPopupOpen(false);
          },
        }}
        onClose={handlePopupClose}
        closeOnBackdropClick={true}
      >
        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <TextField
            value={emails}
            label={"Recipients"}
            multiline={3}
            onChange={handleEmailInput}
            helpText={"Use comma to separate Cc & Bcc"}
            error={errorMessage}
          />

          <FormInfo
            Text="Make sure your SMTP is properly configured to send emails!"
            Illustration={FormInfoIllustration}
          />
        </div>
      </Modal>
    </>
  );
};

export default SendWooTestMailButton;
