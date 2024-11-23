import React from "react";
import Container from "@molecules/Container";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const EmailBuilder = () => {
  return (
    <Container>
      <div
        className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-20`}
      >
        <LeftPanel />
        <RightPanel />
      </div>
    </Container>
  );
};

export default EmailBuilder;
