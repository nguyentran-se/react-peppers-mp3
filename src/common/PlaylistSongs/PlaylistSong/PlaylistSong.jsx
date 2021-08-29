import QueueItem from "common/Queue/QueueItem/QueueItem";
import React from "react";
import Button from "common/UI/Button/Button";
import "./PlaylistSong.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectTracks } from "selectors";
import { useRef } from "react";
import { followTrack, unFollowTrack } from "store/actions/favAction";
import PropTypes from "prop-types";

const propTypes = {
   src: PropTypes.string,
   name: PropTypes.string,
   artists: PropTypes.array,
   albumName: PropTypes.string,
   albumId: PropTypes.string,
   ago: PropTypes.string,
   time: PropTypes.number,
   trackId: PropTypes.string,
};

const PlaylistSong = ({
   src,
   name,
   artists,
   albumName,
   albumId,
   ago,
   time,
   trackId,
}) => {
   dayjs.extend(relativeTime);
   dayjs.locale("vi");
   // console.log(dayjs(ago).fromNow());
   // console.log(Math.ceil(dayjs().diff(dayjs(ago), "hours") / 24));
   const isLoggedIn = useSelector(selectIsLoggedIn);
   const favTrackIds = useSelector(selectTracks);
   const dispatch = useDispatch();
   const isFavourite = useRef(favTrackIds.includes(trackId));
   const clickHandler = (e) => {
      if (isLoggedIn) {
         if (isFavourite.current) {
            e.currentTarget.classList.remove("active");
            isFavourite.current = false;
            dispatch(unFollowTrack(trackId));
         } else {
            e.currentTarget.classList.add("active");
            isFavourite.current = true;
            dispatch(followTrack(trackId));
         }
      }
   };
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
                     {/* <Button icon="ic-like" hover /> */}
                     <Button
                        icon={"ic-like"}
                        custom={`button--heart ${
                           isFavourite.current ? "active" : ""
                        }`}
                        hover
                        clicked={(e) => clickHandler(e)}>
                        <i className="icon ic-like-full"></i>
                     </Button>
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

PlaylistSong.propTypes = propTypes;

export default PlaylistSong;
