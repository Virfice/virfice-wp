import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import { EnvelopIcon } from "../../icons";

const Menu = ({activeMenu, setActiveMenu}) => {
  const arr = [{
    icon: <EnvelopIcon />,
    title: "Email",
  }, {
    icon:  <EnvelopIcon />,
    title: "SMTP",
  }];

  return (
    <div className={`${VIRFICE_APP_PREFIX}-settings-menu`}>
      <div
        className={`${VIRFICE_APP_PREFIX}-header`}
      >
        <h2>Settings</h2>
      </div>

      <ul>
        {arr.map((item, i) => (
          <li key={i} className={item.title === activeMenu? VIRFICE_APP_PREFIX +"-active" : ""} onClick={()=>{setActiveMenu(item.title)}}>
            {item.icon}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
