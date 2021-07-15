import React from "react";
import Proptypes from "prop-types";
import "./MyIcon.scss";

const propTypes = {
   listIcon: Proptypes.array,
   customIcon: Proptypes.string,
   link: Proptypes.string,
   title: Proptypes.string,
   typeWrapper: Proptypes.string,
};

const MyIcon = ({
   listIcon = [],
   customIcon = "icon",
   link,
   title,
   typeWrapper = null,
}) => {
   const transformedListIcon = listIcon.map((icon) =>
      typeWrapper === "div" ? (
         <div className="icon-wrapper" key={icon}>
            <i className={`${customIcon} ${icon}`}></i>
         </div>
      ) : (
         <a href={link} className="my-icon__link" key={icon}>
            {icon && <i className={`${customIcon} ${icon}`}></i>}
            {title && <span>{title}</span>}
         </a>
      )
   );
   return <>{transformedListIcon}</>;
};

MyIcon.propTypes = propTypes;

export default MyIcon;
