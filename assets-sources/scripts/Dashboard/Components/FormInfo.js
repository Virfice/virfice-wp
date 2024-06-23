import React from "react";
import { VIRFICE_APP_PREFIX } from "../../conf";
import Button from "../Molecules/Button";

const FormInfo = ({ text, Illustration, link }) => {
  return (
    <div className={VIRFICE_APP_PREFIX + "-form-info"}>
      <div className={VIRFICE_APP_PREFIX + "-form-info-illustration"}>
        <Illustration />
      </div>
      <div className={VIRFICE_APP_PREFIX + "-form-info-content"}>
          <div className={"body__large"}>{text}</div>
          {link && <Button type="plain" title="Learn more" link={link}/>}
      </div>
    </div>
  );
};

export default FormInfo;
