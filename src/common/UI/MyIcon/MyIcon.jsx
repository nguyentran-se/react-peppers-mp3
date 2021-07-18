import React from "react";
import Proptypes from "prop-types";
import "./MyIcon.scss";
import { NavLink } from "react-router-dom";

const propTypes = {
   listIcon: Proptypes.array,
   customIcon: Proptypes.string,
   link: Proptypes.string,
   title: Proptypes.string,
   typeWrapper: Proptypes.string,
   iconLeft: Proptypes.bool,
   customClass: Proptypes.string,
};

const MyIcon = ({
   listIcon = [],
   customIcon = "icon",
   link = "",
   title,
   typeWrapper = null,
   iconLeft = true,
   customClass,
}) => {
   const transformedListIcon = listIcon.map((icon) =>
      typeWrapper === "div" ? (
         <div className="icon-wrapper" key={icon}>
            <i className={`${customIcon} ${icon}`}></i>
         </div>
      ) : (
         <NavLink
            to={link}
            exact
            className={`my-icon__link ${customClass}`}
            key={icon}>
            {iconLeft && icon && <i className={`${customIcon} ${icon}`}></i>}
            {title && <span>{title}</span>}
            {!iconLeft && icon && <i className={`${customIcon} ${icon}`}></i>}
         </NavLink>
      )
   );
   return <>{transformedListIcon}</>;
};

MyIcon.propTypes = propTypes;

export default MyIcon;
