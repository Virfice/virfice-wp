import React from "react";
import ReactPreview from "..";

const Elements = ({ data }) => {
  const { name, title } = data;
  switch (name) {
    case "spacer":
      return (
        <div>
          {title}
          {getChild(data)}
        </div>
      );
    default:
      return <>not implemented</>;
  }
};

const getChild = (data) => {
  if (data.childs && data.childs.length > 0) {
    return data.childs.map((v) => {
      return <ReactPreview root={v} key={v} />;
    });
  }

  return <></>;
};

export default Elements;
