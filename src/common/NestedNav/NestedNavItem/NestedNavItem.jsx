import React from "react";
import { NavLink } from "react-router-dom";
import "./NestedNavItem.scss";
const NestedNavItem = ({ name, href }) => {
   return (
      <li className="nested-nav__item">
         <div className="nested-nav__link">
            <NavLink to={href} exact>
               {name}
            </NavLink>
         </div>
      </li>
   );
};

export default NestedNavItem;
