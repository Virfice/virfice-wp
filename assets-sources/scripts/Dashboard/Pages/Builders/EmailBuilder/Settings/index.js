import React, { Fragment } from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../conf";
import Heading from "./Heading";
import Color from "./Color";
import Divider from "../../../../Molecules/Divider";

const Settings = ({ data }) => {
  return (
    <div
      className={`${VIRFICE_APP_PREFIX}-form-group`}
      style={{ marginBottom: "16px" }}
    >
      {data.order.map((key) => {
        const setting = data[key];
        const { type, title, defaultValue } = setting;
        return (
          <Fragment key={key}>
            {type === "heading" && (
              <Heading title={title} subTitle={setting.subTitle} />
            )}
            {type === "divider" && (
              <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
            )}
            {type === "color" && (
              <Color
                title={title}
                value={defaultValue}
                onChange={(v) => {
                  console.log(v);
                }}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Settings;
