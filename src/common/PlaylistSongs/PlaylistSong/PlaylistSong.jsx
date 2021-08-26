import QueueItem from "common/Queue/QueueItem/QueueItem";
import React from "react";
import Button from "common/UI/Button/Button";
import "./PlaylistSong.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { Link } from "react-router-dom";
const PlaylistSong = ({
   src,
   name,
   artists,
   albumName,
   albumId,
   ago,
   time,
}) => {
   dayjs.extend(relativeTime);
   dayjs.locale("vi");
   // console.log(dayjs(ago).fromNow());
   // console.log(Math.ceil(dayjs().diff(dayjs(ago), "hours") / 24));
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
                  <Link
                     to={`/album/${albumId}`}
                     className="playlist-song__album artist-hover line-clamp--2">
                     {albumName}
                  </Link>
                  <div className="playlist-song__day">
                     {dayjs(ago).fromNow()}
                  </div>
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
