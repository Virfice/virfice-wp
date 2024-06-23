import React, { useState } from "react";
import Container from "../../Molecules/Container";
import StickyTopNav from "../../Components/StickyTopNav";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import Card from "../../Molecules/Card";
import Menu from "./Menu";
import Email from "./Email";

const Settings = () => {
    const [activeMenu, setActiveMenu] = useState('Email');
  const handleBackActionClick = () => {
    window.history.back();
  };
  const handleDiscardClick = () => {
    window.location.href = window.location.href.split("?")[0];
  };
  const handleSaveClick = () => {
    window.location.href = window.location.href.split("?")[0];
  };
  return (
    <>
      <StickyTopNav
        backAction={handleBackActionClick}
        discardAction={handleDiscardClick}
        saveAction={handleSaveClick}
      />
      <section>
        <Container>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-20`}
          >
            <Card zeroPadding={true} style={{ width: "100%", maxWidth: "240px" }}>
                <Menu activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
            </Card>
            <div style={{ width: "100%" }}>
                <h2 className="title__medium">{activeMenu}</h2>
                {activeMenu === "Email" && <Email/>}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Settings;
