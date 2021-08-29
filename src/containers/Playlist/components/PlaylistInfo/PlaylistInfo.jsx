import Button from "common/UI/Button/Button";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavouriteIds, selectIsLoggedIn } from "selectors";
import {
   followAlbum,
   followPlaylist,
   unFollowAlbum,
   unFollowPlaylist,
} from "store/actions";
import "./PlaylistInfo.scss";

const propTypes = {
   playlist: PropTypes.object,
   matchPath: PropTypes.string,
   totalTime: PropTypes.string,
   playlistId: PropTypes.string,
};

const PlaylistInfo = ({ playlist, matchPath, totalTime }) => {
   // const { name, totalTracks, followers, matchPath, copyrights } = playlist;
   const isLoggedIn = useSelector(selectIsLoggedIn);
   const favouriteIds = useSelector(selectFavouriteIds);
   // const isFavourite = useRef(
   //    isLoggedIn &&
   //       (playlist?.type === "playlist" || playlist?.type === "album") &&
   //       favouriteIds.includes(playlistId)
   // );
   const [isFavourite, setisFavourite] = useState(false);
   const dispatch = useDispatch();

   useEffect(() => {
      setisFavourite(
         isLoggedIn &&
            (playlist?.type === "playlist" || playlist?.type === "album") &&
            favouriteIds.includes(playlist?.id)
      );
   }, [favouriteIds, isLoggedIn, playlist]);
   console.log(isFavourite);
   const clickedHandler = (e) => {
      console.log(isFavourite);
      if (isLoggedIn) {
         if (isFavourite) {
            e.currentTarget.classList.remove("active");
            setisFavourite(false);
            if (matchPath.includes("playlist"))
               dispatch(unFollowPlaylist(playlist.id));
            else if (matchPath.includes("album"))
               dispatch(unFollowAlbum(playlist.id));
         } else {
            e.currentTarget.classList.add("active");
            setisFavourite(true);
            if (matchPath.includes("playlist"))
               dispatch(followPlaylist(playlist.id));
            else if (matchPath.includes("album"))
               dispatch(followAlbum(playlist.id));
         }
      }
      // if (isLoggedIn) {
      //    if (isFavourite.current) {
      //       e.currentTarget.classList.remove("active");
      //       isFavourite.current = false;
      //       if (matchPath.includes("playlist"))
      //          dispatch(unFollowPlaylist(playlistId));
      //       else if (matchPath.includes("album"))
      //          dispatch(unFollowAlbum(playlistId));
      //    } else {
      //       e.currentTarget.classList.add("active");
      //       isFavourite.current = true;
      //       if (matchPath.includes("playlist"))
      //          dispatch(followPlaylist(playlistId));
      //       else if (matchPath.includes("album"))
      //          dispatch(followAlbum(playlistId));
      //    }
      // }
   };

   return (
      <div className="playlist-info__song">
         <h3 className="playlist-info__name">{playlist?.name}</h3>
         <h5 className="playlist-info__desc">
            {playlist?.tracks.total} bài hát - {totalTime}
         </h5>
         <h5 className="playlist-info__desc">
            {playlist?.followers &&
               `${playlist?.followers.total.toLocaleString(
                  "vi-VN"
               )} người yêu thích`}
         </h5>
         {matchPath.includes("album") &&
            playlist?.copyrights.map((cr, index) => (
               <h5
                  className="playlist-info__desc playlist-intro__copy"
                  key={index}>
                  {cr.text}
               </h5>
            ))}
         <div className="playlist-info__buttons">
            <Button icon="ic-play" custom="button--normal button-primary">
               PHÁT NHẠC
            </Button>
            <Button
               icon={"ic-like"}
               custom={`button--heart button--hover-circle lg-size ${
                  isFavourite ? "active" : ""
               }`}
               clicked={(e) => clickedHandler(e)}>
               <i className="ic-like-full"></i>
            </Button>
         </div>
      </div>
   );
};

PlaylistInfo.propTypes = propTypes;

export default PlaylistInfo;
