import PropTypes from "prop-types";
import React from "react";
import "./ProgressBar.scss";
const propTypes = {
   hasTime: PropTypes.bool,
   style: PropTypes.object,
};
const ProgressBar = ({ hasTime, style }) => {
   return (
      <div className="progress-wrapper" style={style}>
         {hasTime && <span className="progress-time">00:00</span>}
         <div className="progress-bar__wrapper">
            <div className="progress-bar__gray">
               <div className="progress-bar__white"></div>
            </div>
         </div>
         {hasTime && <span className="progress-time">08:06</span>}
      </div>
   );
};
ProgressBar.propTypes = propTypes;
export default ProgressBar;
