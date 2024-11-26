import React from "react";
import Container from "@molecules/Container";

const PageHeadingAndSubheading = ({ heading, subHeading, size1280 }) => {
  return (
    <Container size1280={size1280}>
      <h1>{heading}</h1>
      <p>{subHeading}</p>
    </Container>
  );
};

export default PageHeadingAndSubheading;
