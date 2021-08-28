import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

const propTypes = {
   clicked: PropTypes.func,
   icon: PropTypes.string,
   custom: PropTypes.string,
   disabled: PropTypes.bool,
   hover: PropTypes.bool,
   hoverSquare: PropTypes.bool,
   hoverCircle: PropTypes.bool,
};

const Button = ({
   clicked,
   icon,
   custom,
   disabled,
   children,
   hover,
   hoverSquare,
   hoverCircle,
   hoverNoShape,
   activeSquare,
   text,
   active,
}) => {
   const buttonClasses = ["button"];
   if (custom) buttonClasses.push(custom);
   if (icon) buttonClasses.push("button--flex");
   if (disabled) buttonClasses.push("disabled");
   if (hover) buttonClasses.push("button--hover");
   if (hoverSquare) buttonClasses.push("button--hover-square");
   if (hoverCircle) buttonClasses.push("button--hover-circle");
   if (hoverNoShape) buttonClasses.push("button--hover-no-shape");
   if (activeSquare) buttonClasses.push("button--active-square");
   if (text) buttonClasses.push("button--text");
   if (active) buttonClasses.push("active");
   return (
      <button
         onClick={(e) => {
            e.preventDefault();
            clicked && clicked(e);
         }}
         className={buttonClasses.join(" ")}>
         {icon && <i className={`icon ${icon}`}></i>}
         {children}
      </button>
   );
};
Button.propTypes = propTypes;
export default Button;
