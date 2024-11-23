import React from "react";
import VirficeCommonHeader from "../../Components/VirficeCommonHeader";
import Container from "@molecules/Container";
import PageHeadingAndSubheading from "../../Components/PageHeadingAndSubheading";
import Card from "@molecules/Card";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import Table from "./Table";
import StickyTopNav from "../../Components/StickyTopNav";
import { addParams } from "../../../functions";

const WooEmailList = () => {
  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "" });
  };
  return (
    <>
      {/* <VirficeCommonHeader /> */}
      <StickyTopNav backAction={handleBackActionClick} />
      <section>
        <PageHeadingAndSubheading
          heading={"Email notifications"}
          subHeading={
            "Customize the look and feel of all WooCommerce emails. Let your emails represent your store."
          }
        />
        <Container>
          <Card className={`${VIRFICE_APP_PREFIX}-table-card`}>
            <Table />
          </Card>
        </Container>
      </section>
    </>
  );
};

export default WooEmailList;
