import Button from "common/UI/Button/Button";
import React, { useRef } from "react";
import "./QueueHeader.scss";
import PropTypes from "prop-types";
const propTypes = {
   clicked: PropTypes.func,
};
const QueueHeader = ({ clicked }) => {
   const queueRef = useRef(null);
   const recentRef = useRef(null);
   return (
      <div className="queue-header">
         <div className="queue-header__wrapper">
            <div className="queue-header__options">
               <div
                  className="queue-header__option active"
                  onClick={(e) => {
                     e.currentTarget.classList.add("active");
                     recentRef.current.classList.remove("active");
                     clicked("queue");
                  }}
                  ref={queueRef}>
                  Danh sách phát
               </div>
               <div
                  className="queue-header__option"
                  onClick={(e) => {
                     e.currentTarget.classList.add("active");
                     queueRef.current.classList.remove("active");
                     clicked("recent");
                  }}
                  ref={recentRef}>
                  Nghe gần đây
               </div>
            </div>
            <Button icon="ic-clock" hoverCircle />
            <Button icon="ic-more" hoverCircle />
         </div>
      </div>
   );
};
QueueHeader.propTypes = propTypes;
export default QueueHeader;
