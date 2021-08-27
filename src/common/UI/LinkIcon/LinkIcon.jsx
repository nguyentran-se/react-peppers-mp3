import React from "react";
import PropTypes from "prop-types";
import "./LinkIcon.scss";
import { NavLink } from "react-router-dom";

const propTypes = {
   listIcon: PropTypes.array,
   customIcon: PropTypes.string,
   link: PropTypes.string,
   title: PropTypes.string,
   typeWrapper: PropTypes.string,
   iconLeft: PropTypes.bool,
   customClass: PropTypes.string,
   exact: PropTypes.bool,
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
   exact,
}) => {
   const transformedListIcon = listIcon.map((icon) => (
      <NavLink
         to={link}
         exact={exact}
         className={`link-icon ${customClass ?? ""}`}
         key={icon}>
         {iconLeft && icon && <i className={`${customIcon} ${icon}`}></i>}
         {title && <span className="line-clamp--2">{title}</span>}
         {!iconLeft && icon && <i className={`${customIcon} ${icon}`}></i>}
      </NavLink>
   ));
   return <>{transformedListIcon}</>;
};

LinkIcon.propTypes = propTypes;

export default LinkIcon;
