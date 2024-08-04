import React, { useState } from "react";
import Button from "../../../Molecules/Button";
import { EnvelopIcon, PaperPlaneIcon } from "../../../icons";
import Modal from "../../../Components/Modal";
import TextField from "../../../Molecules/TextField";
import axios from "axios";
import { useSelector } from "react-redux";
import { validateCommaSeparatedEmails } from "../../../../functions";

const SendTestMailButton = () => {
  let currentEmail = useSelector((state) => state.brandSettings?.currentEmail);
  let selectedOrder = useSelector((state) => state.brandSettings?.selectedOrder);
  const changedSettings = useSelector(
    (state) => state.brandSettings.changedSettings
  );

  const [testMailPopupOpen, setTestMailPopupOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [emails, setEmails] = useState("");
  const handlePopupClose = () => {
    setTestMailPopupOpen(false);
  };

  const handleEmailInput = (v) => {
    setEmails(v);
  };
  const sendEmail = () => {
    if(!validateCommaSeparatedEmails(emails)){
      setErrorMessage('Please enter a valid email address.')
      return;
    }
    setErrorMessage(false);
    let d = null;
    let apiSlug = "virfice/v1/woo-email/send-test-email";
    const formData = new FormData();
    formData.append("emails", emails);
    // formData.append("previewUrl", previewUrl);
    formData.append("email_id", currentEmail.id);
    formData.append("order_id", selectedOrder?.id||'');
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
      })
      .catch((error) => {
        console.log(error);
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
        <TextField
          label={"Recipients"}
          multiline={3}
          onChange={handleEmailInput}
          helpText={"Use comma to separate Cc & Bcc"}
          error={errorMessage}
        />
      </Modal>
    </>
  );
};

export default SendTestMailButton;
