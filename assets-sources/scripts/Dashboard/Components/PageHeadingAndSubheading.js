import React from "react";
import Container from "@molecules/Container";

const PageHeadingAndSubheading = ({
  heading,
  subHeading,
  size1280,
  quickAction,
}) => {
  return (
    <Container size1280={size1280}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <h1>{heading}</h1>
        {quickAction}
      </div>
      <p>{subHeading}</p>
    </Container>
  );
};

export default PageHeadingAndSubheading;
