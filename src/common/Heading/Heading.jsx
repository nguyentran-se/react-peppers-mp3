import Button from "common/UI/Button/Button";
import React from "react";
import "./Heading.scss";
import PropTypes from "prop-types";
const propTypes = {
   heading: PropTypes.string,
   icon: PropTypes.string,
};
const Heading = ({ heading, icon, message }) => {
   return (
      <div className="heading">
         <div className="heading-title">
            <h1>{heading}</h1>
            {icon && <Button icon={icon} hoverCircle custom="button-heading" />}
         </div>
         {message && <p className="heading-message">{message}</p>}
      </div>
   );
};

Heading.propTypes = propTypes;

export default Heading;
