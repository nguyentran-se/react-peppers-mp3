import React from "react";
import "./NavItem.scss";
const NavItem = ({ title, link, icon = null }) => {
   return (
      <li className="navbar-menu__item">
         <a href={link} className="navbar-item__link">
            {icon && <i className={`icon ${icon}`}></i>}
            <span>{title}</span>
         </a>
      </li>
   );
};

export default NavItem;
