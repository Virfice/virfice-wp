import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
import Card from "@molecules/Card";
import Button from "@molecules/Button";
import { addParams } from "@functions";

const BrandSettings = () => {
  return (
    <Card>
      <div style={{ width: "100%" }}>
        <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
          <div className={`title__medium`}>Theme settings</div>
          <div className="body__medium" style={{ maxWidth: 521 }}>
            Change your email templates colors, basic settings, and more.
          </div>
          <Button
            type="secondary"
            title="Customize"
            link={addParams({ menu: "brand-settings" })}
          />
        </div>
      </div>
    </Card>
  );
};

export default BrandSettings;
