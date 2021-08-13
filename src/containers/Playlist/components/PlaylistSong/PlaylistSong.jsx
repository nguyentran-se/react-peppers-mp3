import QueueItem from "common/Queue/QueueItem/QueueItem";
import React from "react";
import Button from "common/UI/Button/Button";
import "./PlaylistSong.scss";
const PlaylistSong = ({
   src,
   name,
   artists,
   albumName,
   albumId,
   ago,
   time,
}) => {
   return (
      <div className="playlist-song">
         <div className="checkbox">
            <i className="icon--mini-size ic-song"></i>
         </div>
         <QueueItem
            src={src}
            name={name}
            artists={artists}
            custom={"playlist-song__item"}
            buttons={
               <>
                  <a
                     href={`#${albumId}`}
                     className="playlist-song__album artist-hover line-clamp--2">
                     {albumName}
                  </a>
                  <div className="playlist-song__day">{ago}</div>
                  <div className="playlist-song__buttons">
                     <Button icon="ic-karaoke" hover />
                     <Button icon="ic-like" hover />
                     <span className="playlist-song__time">
                        0{Math.floor(time / 60000)}:
                        {Math.floor(time / 6000 - Math.floor(time / 60000))}
                     </span>
                     <Button icon="ic-more" hover />
                  </div>
               </>
            }
         />
      </div>
   );
};

export default PlaylistSong;
