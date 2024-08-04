import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { VIRFICE_APP_PREFIX } from "../../conf";
import { CloseIcon } from "../icons";
import Button from "../Molecules/Button";

const Modal = ({
  children,
  open,
  heading,
  primaryActionProps,
  secondaryActionProps,
  showCloseButton = true,
  onClose,
  closeOnBackdropClick = false,
}) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
        closeModal();
    }
  };

  const closeModal = () =>{
    setShow(false);
    onClose();
  }

  if (!show) return null;
  return createPortal(
    <div className={`${VIRFICE_APP_PREFIX}-modal`}>
      <div
        className={`${VIRFICE_APP_PREFIX}-backdrop`}
        onClick={handleBackdropClick}
      ></div>
      <div className={`${VIRFICE_APP_PREFIX}-modal-wrapper`}>
        <div className={`${VIRFICE_APP_PREFIX}-modal-header`}>
          <div>
            <div className="title__small">{heading}</div>
          </div>
          {showCloseButton && (
            <div
              className={`${VIRFICE_APP_PREFIX}-modal-close`}
              onClick={closeModal}
            >
              <CloseIcon />
            </div>
          )}
        </div>
        <div className={`${VIRFICE_APP_PREFIX}-modal-body`}>{children}</div>
        <div className={`${VIRFICE_APP_PREFIX}-modal-footer`}>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-8`}
          >
            {secondaryActionProps && (
              <Button
                title={secondaryActionProps.title}
                leftIcon={secondaryActionProps.leftIcon}
                type="secondary"
                onClick={()=>{
                    if(!secondaryActionProps.onClick)return;
                    closeModal();
                    secondaryActionProps.onClick();
                }}
              />
            )}
            {primaryActionProps && (
              <Button
                title={primaryActionProps.title}
                leftIcon={primaryActionProps.leftIcon}
                type="primary"
                onClick={()=>{
                    if(!primaryActionProps.onClick)return;
                    primaryActionProps.onClick();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
