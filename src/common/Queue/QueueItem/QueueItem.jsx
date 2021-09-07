import Button from "common/UI/Button/Button";
import { useMenu } from "hooks";
import React from "react";
import { Link } from "react-router-dom";
import "./QueueItem.scss";
import { QUEUE_MENU_BUTTONS } from "constant";
const QueueItem = ({ src, name, artists, buttons, custom = "" }) => {
   const { Menu, cardMenuHandler } = useMenu({ menuList: QUEUE_MENU_BUTTONS });
   let transformedArtist;

   if (artists) {
      let length = artists.length - 1;
      transformedArtist = artists.map((art, index) => (
         <span key={art.id}>
            <Link
               to={`/artist/${art.id}`}
               className="queue-song__artist artist-hover">
               {art.name}
            </Link>
            {length !== index && ", "}
         </span>
      ));
   }
   return (
      <div className="queue-item ">
         <div className={`queue-item__wrapper ${custom}`}>
            <div className="queue-item__left">
               <div className="card-img queue-item__img">
                  <img src={src} alt="queue item" />
                  <div className="queue-item__backdrop"></div>
                  <Button icon="ic-play" hoverNoShape />
               </div>
               <div className="queue-song">
                  <div className="queue-song__name line-clamp--1">{name}</div>
                  <div className="queue-song__artists line-clamp--1">
                     {transformedArtist}
                  </div>
               </div>
            </div>
            {buttons || (
               <div className="queue-item__actions">
                  <Button icon="ic-like" hover />
                  <Button icon="ic-more" hover clicked={cardMenuHandler} />
               </div>
            )}
         </div>
         <Menu />
      </div>
   );
};

export default QueueItem;
