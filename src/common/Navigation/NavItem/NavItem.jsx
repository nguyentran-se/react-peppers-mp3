import React from "react";
import "./NavItem.scss";
import MyIcon from "common/UI/MyIcon/MyIcon";
const NavItem = ({ title, link, icon = null }) => {
   return (
      <li className="navbar-menu__item">
         <MyIcon listIcon={[icon]} link={link} title={title} />
      </li>
   );
};

export default NavItem;
