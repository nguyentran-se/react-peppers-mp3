import React from "react";
import "./Button.scss";
const Button = ({ icon }) => {
   return (
      <button
         onClick={(e) => e.preventDefault()}
         className="button button--card">
         {icon && <i className={`icon ${icon}`}></i>}
      </button>
   );
};

export default Button;
