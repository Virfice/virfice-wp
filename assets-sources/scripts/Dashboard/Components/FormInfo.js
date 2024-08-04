import React from "react";
import { VIRFICE_APP_PREFIX } from "../../conf";
import Button from "../Molecules/Button";

const FormInfo = ({ Text, Illustration=null, link }) => {
  return (
    <div className={VIRFICE_APP_PREFIX + "-form-info"}>
      {Illustration && <div className={VIRFICE_APP_PREFIX + "-form-info-illustration"}>
        <Illustration />
      </div>}
      <div className={VIRFICE_APP_PREFIX + "-form-info-content"}>
          <div className={"body__large"}>{Text}</div>
          {link && <Button type="plain" title="Learn more" link={link} target="_blank"/>}
      </div>
    </div>
  );
};

export default FormInfo;
