import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import Button from "../Molecules/Button";
import { EnvelopIcon, PaperPlaneIcon } from "../icons";
import Modal from "../Components/Modal";
import Textfield from "../Molecules/Textfield";
import axios from "axios";
import { showNotificationBell } from "./componentsSlice";

const SendTestMailButton = ({email_id, order_id, changedSettings}) => {
  const dispatch = useDispatch();
  const [testMailPopupOpen, setTestMailPopupOpen] = useState(false);
  const [emails, setEmails] = useState("");
  const handlePopupClose = () => {
    setTestMailPopupOpen(false);
  };

  const handleEmailInput = (v) => {
    setEmails(v);
  };
  const sendEmail = () => {
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
        dispatch(showNotificationBell({title: 'Test email sent! Check your inbox.', type:'success'}));
      })
      .catch((error) => {
        console.log(error);
        dispatch(showNotificationBell({title: 'Failed to send test email!', type:'danger'}));
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
        <Textfield
          label={"Recipients"}
          multiline
          onChange={handleEmailInput}
          helpText={"Use comma to separate Cc & Bcc"}
        />
      </Modal>
    </>
  );
};

export default SendTestMailButton;
