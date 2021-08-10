import Button from "common/UI/Button/Button";
import React from "react";
import "./QueueItem.scss";
const QueueItem = ({ src, name, artist }) => {
   return (
      <div className="queue-item">
         <div className="queue-item__wrapper">
            <div className="queue-item__left">
               <div className="queue-item__img">
                  <img src={src} alt="queue-item" />
                  <Button icon="ic-play" hoverNoShape />
               </div>
               <div className="queue-song">
                  <div className="queue-song__name">{name}</div>
                  <a href="#artist" className="queue-song__artist artist-hover">
                     {artist}
                  </a>
               </div>
            </div>
            <div className="queue-item__actions">
               <Button icon="ic-like" hover />
               <Button icon="ic-more" hover />
            </div>
         </div>
      </div>
   );
};

export default QueueItem;
