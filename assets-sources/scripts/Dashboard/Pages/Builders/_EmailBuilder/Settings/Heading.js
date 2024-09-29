import React, { Fragment } from "react";

const Heading = ({ title, subTitle }) => {
  return (
    <Fragment>
      <div className={`title__medium`}>{title}</div>
      {subTitle && (
        <div className="body__medium" style={{ maxWidth: 521 }}>
          {subTitle}
        </div>
      )}
    </Fragment>
  );
};

export default Heading;
