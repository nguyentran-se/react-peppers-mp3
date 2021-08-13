import Button from "common/UI/Button/Button";
import React from "react";
import "./QueueItem.scss";
const QueueItem = ({ src, name, artists, buttons, custom = "" }) => {
   let transformedArtist;
   // console.log(artists);

   if (artists) {
      let length = artists.length - 1;
      transformedArtist = artists.map((art, index) => (
         <a
            href={`#${art.id}`}
            key={art.id}
            className="queue-song__artist artist-hover">
            {length === index ? art.name : `${art.name}, `}
         </a>
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
                  {/* <a
                     href="#artist"
                     className="queue-song__artist artist-hover line-clamp--1">
                     {artist}
                  </a> */}
                  <div className="queue-song__artists line-clamp--1">
                     {transformedArtist}
                  </div>
               </div>
            </div>
            {buttons || (
               <div className="queue-item__actions">
                  <Button icon="ic-like" hover />
                  <Button icon="ic-more" hover />
               </div>
            )}
         </div>
      </div>
   );
};

export default QueueItem;
