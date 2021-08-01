import React from "react";
import Proptypes from "prop-types";
import "./LinkIcon.scss";
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

const LinkIcon = ({
   listIcon = [],
   customIcon = "icon",
   link = "",
   title,
   typeWrapper = null,
   iconLeft = true,
   customClass,
   disabled,
}) => {
   const transformedListIcon = listIcon.map((icon) => (
      <NavLink
         to={link}
         exact
         className={`link-icon ${customClass ?? ""}`}
         key={icon}>
         {iconLeft && icon && <i className={`${customIcon} ${icon}`}></i>}
         {title && <span>{title}</span>}
         {!iconLeft && icon && <i className={`${customIcon} ${icon}`}></i>}
      </NavLink>
   ));
   return <>{transformedListIcon}</>;
};

LinkIcon.propTypes = propTypes;

export default LinkIcon;
