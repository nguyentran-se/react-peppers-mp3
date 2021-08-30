import PropTypes from "prop-types";
import React from "react";
// import { useRef } from "react";
import { useState } from "react";
import "./ProgressBar.scss";

const propTypes = {
   max: PropTypes.number,
   min: PropTypes.number,
   initial: PropTypes.number.isRequired,
   step: PropTypes.number.isRequired,
   length: PropTypes.object,
   hasTime: PropTypes.bool,
};

const ProgressBar = ({ max = 1, min = 0, initial, step, length, hasTime }) => {
   const [inputValue, setInputValue] = useState(initial);

   const onchangeHandler = (e) => {
      e.currentTarget.style.background = `linear-gradient(
         to right,
         #fff 0%,
         #fff ${e.target.value * 100}%,
         var(--progressbar-player-bg) ${e.target.value * 100}%,
         var(--progressbar-player-bg) 100%
      );`;
      setInputValue(e.target.value);
   };

   return (
      <div className="progress-wrapper" style={length}>
         {hasTime && <span className="progress-time">00:00</span>}
         <div className="progress-bar__wrapper">
            <input
               type="range"
               max={max}
               min={min}
               value={inputValue}
               step={step}
               onChange={(e) => onchangeHandler(e)}
               style={{
                  background: `linear-gradient(
                     to right,
                     #fff 0%,
                     #fff ${inputValue * 100}%,
                     var(--progressbar-player-bg) ${inputValue * 100}%,
                     var(--progressbar-player-bg) 100%
                  )`,
               }}
            />
         </div>
         {hasTime && <span className="progress-time">08:06</span>}
      </div>
   );
};

ProgressBar.propTypes = propTypes;

export default ProgressBar;
