import React from "react";
import Container from "../Molecules/Container";
import { VIRFICE_APP_PREFIX } from "../../conf";
import { BackIcon } from "../icons";
import Button from "../Molecules/Button";

const StickyTopNav = ({ backAction, discardAction, saveAction }) => {
  return (
    <section className={`${VIRFICE_APP_PREFIX}-stickty-top-nav`}>
      <Container>
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
          {(discardAction || saveAction) && <div>
            <div
              className={`${VIRFICE_APP_PREFIX}-flex-center-center ${VIRFICE_APP_PREFIX}-gap-6`}
              style={{ width: "max-content" }}
            >
              {discardAction && <Button
                type="secondary"
                title="Discard"
                onClick={discardAction}
              />}
              {saveAction && <Button type="primary" title="Save" onClick={saveAction} />}
            </div>
          </div>}
        </div>
      </Container>
    </section>
  );
};

export default StickyTopNav;
