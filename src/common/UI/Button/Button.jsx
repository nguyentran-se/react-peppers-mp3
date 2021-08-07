import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

const propTypes = {
   clicked: PropTypes.func,
   icon: PropTypes.string,
   custom: PropTypes.string,
   disabled: PropTypes.bool,
};

const Button = ({
   clicked,
   icon,
   custom,
   disabled,
   children,
   hover,
   hoverSquare,
}) => {
   const buttonClasses = ["button"];
   if (custom) buttonClasses.push(custom);
   if (icon) buttonClasses.push("button--flex");
   if (disabled) buttonClasses.push("disabled");
   if (hover) buttonClasses.push("button--hover");
   if (hoverSquare) buttonClasses.push("button--hover-square");
   return (
      <button
         onClick={(e) => {
            e.preventDefault();
            clicked && clicked();
         }}
         className={buttonClasses.join(" ")}>
         {/* className={`button ${custom ?? ""} ${disabled ? "disabled" : ""} ${
            icon && "button--flex"
         }`}> */}
         {icon && <i className={`icon ${icon}`}></i>}
         {children}
      </button>
   );
};
Button.propTypes = propTypes;
export default Button;
