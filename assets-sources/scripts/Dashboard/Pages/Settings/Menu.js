import React from "react";
import { VIRFICE_APP_PREFIX } from "../../../conf";

const Menu = ({title, menuList, activeMenu, setActiveMenu}) => {
  
  return (
    <div className={`${VIRFICE_APP_PREFIX}-settings-menu`}>
      <div
        className={`${VIRFICE_APP_PREFIX}-header`}
      >
        <h2>{title}</h2>
      </div>

      <ul>
        {menuList.map((item) => (
          <li key={item.key} className={item.key === activeMenu.key? VIRFICE_APP_PREFIX +"-active" : ""} onClick={()=>{setActiveMenu(item)}}>
            {item.icon}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
