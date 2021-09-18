import { msToTime } from "helper";
import PropTypes from "prop-types";
import React from "react";
import "./ProgressBar.scss";
const propTypes = {
   max: PropTypes.number,
   min: PropTypes.number,
   step: PropTypes.number,
   length: PropTypes.object,
   hasTime: PropTypes.bool,
   progressValue: PropTypes.number.isRequired,
   changed: PropTypes.func.isRequired,
   duration: PropTypes.number,
};

const ProgressBar = ({
   max = 1,
   min = 0,
   step,
   length,
   hasTime,
   progressValue,
   changed,
   duration,
}) => {
   // console.log(msToTime(progressValue * duration, true));
   // console.log((progressValue * 1e8) / duration);
   return (
      <div className="progress-wrapper" style={length}>
         {hasTime && (
            <span className="progress-time">
               {msToTime(progressValue * 1000 * 1000, true)}
            </span>
         )}
         <div className="progress-bar__wrapper">
            <input
               type="range"
               max={max}
               min={min}
               value={(progressValue * 1e8) / duration || 0}
               step={step}
               onChange={changed}
               style={{
                  background: `linear-gradient(
                     to right,
                     #fff 0%,
                     #fff ${(progressValue * 1e8) / duration}%,
                     var(--progressbar-player-bg) ${
                        (progressValue * 1e8) / duration
                     }%,
                     var(--progressbar-player-bg) 100%
                  )`,
               }}
            />
         </div>
         {hasTime && (
            <span className="progress-time">{msToTime(duration, true)}</span>
         )}
      </div>
   );
};

ProgressBar.propTypes = propTypes;

export default ProgressBar;
