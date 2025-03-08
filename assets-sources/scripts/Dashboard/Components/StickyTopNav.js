import React, { Fragment } from "react";
import Container from "@molecules/Container";
import { VIRFICE_APP_PREFIX } from "@conf";
import { BackIcon, ChevronRightIcon } from "@svg-icons";
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
  breadCrumb = false,
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
          <div
            className={`${VIRFICE_APP_PREFIX}-flex-center-center`}
            style={{ gap: "50px" }}
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
            {breadCrumb && (
              <div className={`${VIRFICE_APP_PREFIX}-bread-crumb`}>
                {breadCrumb.map((v, i) => {
                  return (
                    <Fragment key={i}>
                      <div
                        className={`${VIRFICE_APP_PREFIX}-bread-crumb-item ${
                          v.isActive ? `${VIRFICE_APP_PREFIX}-active` : ""
                        } ${
                          v.link || v.callBack
                            ? `${VIRFICE_APP_PREFIX}-has-link`
                            : ""
                        }`}
                        onClick={() => {
                          if (v.link) {
                            window.location.href = v.link;
                          }
                          if (v.callBack) {
                            v.callBack();
                          }
                        }}
                      >
                        <span>
                          {i + 1}. {v.title}
                        </span>
                      </div>
                      {i !== breadCrumb.length - 1 && <ChevronRightIcon />}
                    </Fragment>
                  );
                })}
              </div>
            )}
          </div>

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
