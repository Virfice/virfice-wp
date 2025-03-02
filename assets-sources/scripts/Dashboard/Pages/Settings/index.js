import React, { useState } from "react";
import Container from "@molecules/Container";
import StickyTopNav from "@components/StickyTopNav";
import { VIRFICE_APP_PREFIX } from "@conf";
import Card from "@molecules/Card";
import Menu from "./Menu";
import Email from "./Email";
import { ColorPalateIcon, EnvelopIcon } from "@svg-icons";
import {
  discardGlobalSettings,
  saveGlobalSettings,
} from "./globalSettingsSlice";
import { useDispatch } from "react-redux";
import Brand from "./Brand";

const menuList = [
  {
    icon: <EnvelopIcon />,
    title: "Email",
    key: "email",
  },
  {
    icon: <ColorPalateIcon />,
    title: "Brand",
    key: "brand",
  },
];
const Settings = () => {
  const dispatch = useDispatch();
  const [activeMenu, setActiveMenu] = useState({
    key: "email",
    title: "Email",
  });
  const handleBackActionClick = () => {
    window.history.back();
  };
  const handleDiscardClick = () => {
    dispatch(discardGlobalSettings(activeMenu.key));
  };
  const handleSaveClick = () => {
    dispatch(saveGlobalSettings(activeMenu.key));
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
            <Card
              zeroPadding={true}
              style={{ width: "100%", maxWidth: "240px" }}
            >
              <Menu
                title="Settings"
                menuList={menuList}
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
              />
            </Card>
            <div style={{ width: "100%" }}>
              <h2 className="title__medium">{activeMenu.title}</h2>
              {activeMenu.key === "email" && <Email />}
              {activeMenu.key === "brand" && <Brand />}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Settings;
