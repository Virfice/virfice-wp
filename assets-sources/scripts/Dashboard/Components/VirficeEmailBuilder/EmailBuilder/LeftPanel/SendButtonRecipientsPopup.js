import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../conf";
import {
  getParamValue,
  hasQueryParamValue,
  validateCommaSeparatedEmails,
} from "@functions";
import {
  EnvelopIcon,
  FormInfoIllustration,
  PaperPlaneIcon,
} from "../../../../icons";
import TextField from "@molecules/TextField";
import Button from "@molecules/Button";
import Modal from "../../../Modal";
import FormInfo from "../../../FormInfo";
import { useDispatch, useSelector } from "react-redux";
import { globalSettingsAsync } from "../../../../Pages/Settings/globalSettingsSlice";
import axios from "axios";

const SendButtonRecipientsPopup = () => {
  const [testMailPopupOpen, setTestMailPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [emails, setEmails] = useState("");

  const dispatch = useDispatch();
  const globalEmailSettings = useSelector(
    (state) => state.globalSettings["changedSettings-email"]
  );
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
    const emailWrapper = document.getElementById(
      VIRFICE_APP_PREFIX + "-email-preview"
    );
    const htmlWithoutStyle = emailWrapper.innerHTML.replace(
      /<style[^>]*>[\s\S]*?<\/style>/gi,
      ""
    );

    let apiSlug = "virfice/v1/virfice-test-email-send/send-test-email";
    const formData = new FormData();
    formData.append("emails", emails);
    formData.append("template", htmlWithoutStyle);
    if (
      hasQueryParamValue("menu", "woo-email-edit-virfice") &&
      getParamValue("email_id")
    ) {
      formData.append("email_id", getParamValue("email_id"));
      formData.append("type", "woo_test_email");
    } else {
      formData.append("type", "test_email");
    }
    axios
      .post(`${virfice.restBase}${apiSlug}`, formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          "X-WP-Nonce": virfice.nonce,
        },
      })
      .then((res) => {
        d = res.data;
        // setTestMailPopupOpen(false);
        // dispatch(
        //   showNotificationBell({
        //     title: "Test email sent! Check your inbox.",
        //     type: "success",
        //   })
        // );
        console.log(d);
      })
      .catch((error) => {
        console.log(error);
        // dispatch(
        //   showNotificationBell({
        //     title: "Failed to send test email!",
        //     type: "danger",
        //   })
        // );
      });
    handlePopupClose();
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

export default SendButtonRecipientsPopup;
