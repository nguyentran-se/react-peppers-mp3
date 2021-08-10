import Button from "common/UI/Button/Button";
import React from "react";
import "./QueueHeader.scss";
const QueueHeader = () => {
   return (
      <div className="queue-header">
         <div className="queue-header__wrapper">
            <div className="queue-header__options">
               <div className="queue-header__option">Danh sách phát</div>
               <div className="queue-header__option">Nghe gần đây</div>
            </div>
            <Button icon="ic-clock" hoverCircle />
            <Button icon="ic-more" hoverCircle />
         </div>
      </div>
   );
};

export default QueueHeader;
