import playerApi from "api/playerApi";
import ProgressBar from "common/ProgressBar/ProgressBar";
import React, { memo, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   selectCurrentTrack,
   selectIsLoggedIn,
   selectPaused,
   selectPlayer,
} from "selectors";
import { initPlayer } from "store/actions";
import "./Player.scss";
import PlayerActions from "./PlayerActions/PlayerActions";
import PlayerControls from "./PlayerControls/PlayerControls";
import PlayerSong from "./PlayerSong/PlayerSong";
// const initialTrack = {
//    name: "",
//    album: {
//       images: [{ url: "" }],
//    },
//    artists: [{ name: "" }],
// };
const Player = ({ clicked, toggleQueue }) => {
   const isLoggedIn = useSelector(selectIsLoggedIn);

   const [recentlyTrack, setRecentlyTrack] = useState(null);
   // const [currentTrackApi, setCurrentTrackApi] = useState(null);
   const dispatch = useDispatch();
   const currentTrack = useSelector(selectCurrentTrack);
   const paused = useSelector(selectPaused);
   const player = useSelector(selectPlayer);

   /**
    * @implements getRencentlyTrack
    */
   useEffect(() => {
      const requestGetRecentlyTrack = async () => {
         const params = {
            limit: 1,
            before: new Date().getTime(),
         };
         const recentlyPlayed = await playerApi.getRecentlyPlayedTracks(params);
         setRecentlyTrack(recentlyPlayed.items[0].track);
      };
      if (isLoggedIn) requestGetRecentlyTrack();
   }, [isLoggedIn]);

   /**
    * @implements initSpotifyPlayer
    */
   useEffect(() => {
      if (isLoggedIn) dispatch(initPlayer());
   }, [isLoggedIn, dispatch]);

   const duration = currentTrack?.duration_ms || recentlyTrack?.durationMs;
   // console.log(duration);
   // console.log(currentTrack?.duration_ms);
   const [progressValue, setProgressValue] = useState(0);

   const seekInputHandler = (e) => {
      //e.target.value -> 0 - 100
      if (player) player.seek((+e.target.value / 100) * duration); // % * duration
      // console.log((+e.target.value * duration) / 100);
      setProgressValue((+e.target.value * duration) / 1e8); //currentTime 0.012 -> 12secs
   };
   /**
    * @implements handle case return too much currentTracks of spotify
    * cause setProgressValue be wrong.
    */
   const currentRef = useRef(true);
   useEffect(() => {
      if (currentRef.current) {
         setProgressValue(0);
         currentRef.current = false;
      }
      const timeout = setTimeout(() => {
         currentRef.current = true;
      }, 2000);
      return () => clearTimeout(timeout);
   }, [currentTrack]);
   /**
    * setTime for progressbar
    */
   useEffect(() => {
      const timeInterval = setInterval(() => {
         // console.log(paused);
         if (!paused && progressValue * 1e6 <= duration)
            setProgressValue((value) => value + 0.001);
         else if (progressValue * 1e6 > duration) setProgressValue(0);
         // else if (progressValue > duration) clearInterval(timeInterval);
      }, 1000);
      return () => clearInterval(timeInterval);
   }, [duration, paused, progressValue]);

   // console.log(progressValue * 1e6);
   return (
      <div className="player">
         <div className="player-wrapper">
            <PlayerSong
               // track={currentTrack?.item || currentTrack?.items?.[0].track}
               track={currentTrack || recentlyTrack}
            />
            <div className="player-main">
               <PlayerControls
                  player={player}
                  paused={paused}
                  currentTrack={currentTrack}
                  recentlyTrack={recentlyTrack}
               />
               <ProgressBar
                  initial={0}
                  step={0.001}
                  max={100}
                  hasTime
                  progressValue={progressValue}
                  changed={seekInputHandler}
                  duration={duration}
               />
            </div>
            <PlayerActions clicked={clicked} toggleQueue={toggleQueue} />
         </div>
      </div>
   );
};

export default memo(Player);
