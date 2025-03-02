import React from "react";
import Container from "@molecules/Container";
import { VIRFICE_APP_PREFIX } from "@conf";
import { BackIcon } from "@svg-icons";
import Button from "@molecules/Button";

const StickyTopNav = ({
  backAction,
  discardAction,
  discardButtonText,
  saveAction,
  saveButtonText,
  size1280,
  marginBottom = true,
  saveAndNextAction,
  saveAndNextButtonText,
}) => {
  let styles = {};

  if (!marginBottom) {
    styles.marginBottom = 0;
  }
  return (
    <section className={`${VIRFICE_APP_PREFIX}-stickty-top-nav`} style={styles}>
      <Container size1280={size1280}>
        <div
          className={`${VIRFICE_APP_PREFIX}-action-wrapper ${VIRFICE_APP_PREFIX}-flex-space-between ${VIRFICE_APP_PREFIX}-flex-align-center`}
        >
          {backAction && (
            <div
              className={`${VIRFICE_APP_PREFIX}-flex-center-center ${VIRFICE_APP_PREFIX}-gap-6 ${VIRFICE_APP_PREFIX}-cursor-pointer`}
              style={{ width: "max-content" }}
              onClick={backAction}
            >
              <BackIcon />
              <span className={`${VIRFICE_APP_PREFIX}-back`}>Back</span>
            </div>
          )}
          {(discardAction || saveAction) && (
            <div>
              <div
                className={`${VIRFICE_APP_PREFIX}-flex-center-center ${VIRFICE_APP_PREFIX}-gap-6`}
                style={{ width: "max-content" }}
              >
                {discardAction && (
                  <Button
                    type={saveAndNextAction ? "tertiary" : "secondary"}
                    title={discardButtonText || "Discard"}
                    onClick={discardAction}
                  />
                )}
                {saveAndNextAction && (
                  <Button
                    type="secondary"
                    title={saveAndNextButtonText || "Save & Next"}
                    onClick={saveAndNextAction}
                  />
                )}
                {saveAction && (
                  <Button
                    type="primary"
                    title={saveButtonText || "Save"}
                    onClick={saveAction}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default StickyTopNav;
