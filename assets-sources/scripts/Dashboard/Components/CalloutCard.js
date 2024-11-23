import React from "react";
import Card from "@molecules/Card";
import { VIRFICE_APP_PREFIX } from "../../conf";

const CalloutCard = ({ heading, subHeading, ActionButton, Illustration }) => {
  return (
    <Card
      className={`${VIRFICE_APP_PREFIX}-callout-card ${VIRFICE_APP_PREFIX}-flex-space-between`}
    >
      <div>
        <h2 className={`${VIRFICE_APP_PREFIX}-heading`}>{heading}</h2>
        <p className={`${VIRFICE_APP_PREFIX}-sub-heading`}>{subHeading}</p>
        {ActionButton}
      </div>
      <div className={`${VIRFICE_APP_PREFIX}-illustration-wrapper`}>
        {Illustration}
      </div>
    </Card>
  );
};

export default CalloutCard;
