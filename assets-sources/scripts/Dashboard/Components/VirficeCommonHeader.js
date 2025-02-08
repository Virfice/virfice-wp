import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";
import Container from "@molecules/Container";
import { BookOpen, EnvelopIcon, VirficeIcon } from "@svg-icons";
import Button from "@molecules/Button";
import { addParams } from "@functions";

const VirficeCommonHeader = () => {
  return (
    <section className={`${VIRFICE_APP_PREFIX}-landing-header-section`}>
      <Container>
        <div
          className={`${VIRFICE_APP_PREFIX}-flex-space-between ${VIRFICE_APP_PREFIX}-flex-align-center`}
        >
          <div>
            <div style={{ height: 30 }}>
              <VirficeIcon />
            </div>
            <p>Email Customizer for WooCommerce</p>
          </div>
          <div>
            <Button
              type="plain"
              title="Explore guide!"
              link={"https://virfice.com/docs/"}
              leftIcon={<BookOpen />}
              target="_blank"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default VirficeCommonHeader;
