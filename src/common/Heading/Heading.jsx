import Button from "common/UI/Button/Button";
import React from "react";
import "./Heading.scss";
import PropTypes from "prop-types";
const propTypes = {
   heading: PropTypes.string,
   icon: PropTypes.string,
};
const Heading = ({ heading, icon }) => {
   return (
      <div className="heading">
         <h1>{heading}</h1>
         <Button icon={icon} hoverCircle custom="button-heading" />
      </div>
   );
};
Heading.propTypes = propTypes;
export default Heading;
