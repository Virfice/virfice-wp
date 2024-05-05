import React from "react";
import { VIRFICE_APP_PREFIX } from "../../conf";
import Container from "../Molecules/Container";
import { VirficeIcon } from "../icons";

const VirficeCommonHeader = () =>{

    return(
        <section className={`${VIRFICE_APP_PREFIX}-landing-header-section`}>
        <Container>
          <div>
            <VirficeIcon />
            <p>Email Customizer for WooCommerce</p>
          </div>
        </Container>
      </section>
    )
}

export default VirficeCommonHeader;