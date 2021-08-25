import React from "react";
import "./NavItem.scss";
import LinkIcon from "common/UI/LinkIcon/LinkIcon";
const NavItem = ({ title, link, icon = null, exact }) => {
   return (
      <li className="navbar-menu__item" title={title}>
         <LinkIcon listIcon={[icon]} link={link} title={title} exact={exact} />
      </li>
   );
};

export default NavItem;
