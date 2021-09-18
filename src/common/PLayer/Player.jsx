import playerApi from "api/playerApi";
import ProgressBar from "common/ProgressBar/ProgressBar";
import React, { memo, useEffect, useState } from "react";
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
   // const [currentTrack, setCurrentTrack] = useState();
   // const [player, setPlayer] = useState(undefined);
   // const [paused, setPaused] = useState(true);
   // const [active, setActive] = useState(false);
   const [current_track, setTrack] = useState(null);
   const dispatch = useDispatch();
   const currentTrack = useSelector(selectCurrentTrack);
   const paused = useSelector(selectPaused);
   const player = useSelector(selectPlayer);
   useEffect(() => {
      const requestGetCurrentTrack = async () => {
         const params = {
            limit: 1,
            before: new Date().getTime(),
         };
         const recentlyPlayed = await playerApi.getRecentlyPlayedTracks(params);
         // console.log(recentlyPlayed);
         setTrack(recentlyPlayed.items[0].track);
         // console.log(recentlyPlayed);
         // console.log(currentPlaying);
      };
      if (isLoggedIn) requestGetCurrentTrack();
   }, [isLoggedIn]);

   useEffect(() => {
      if (isLoggedIn) dispatch(initPlayer());
   }, [isLoggedIn, dispatch]);

   const duration = currentTrack?.duration || current_track?.durationMs;

   const [progressValue, setProgressValue] = useState(0);

   const seekInputHandler = (e) => {
      //e.target.value -> 0 - 100
      if (player) player.seek((+e.target.value / 100) * duration); // % * duration
      // console.log((+e.target.value * duration) / 100);
      setProgressValue((+e.target.value * duration) / 1e8);
   };
   useEffect(() => {
      const timeInterval = setInterval(() => {
         // console.log(paused);
         if (!paused && progressValue <= duration)
            setProgressValue((value) => value + 0.001);
         else if (progressValue > duration) setProgressValue(0);
      }, 1000);
      return () => clearInterval(timeInterval);
   }, [duration, paused, progressValue]);
   // console.log(progressValue);
   // console.log(paused);
   return (
      <div className="player">
         <div className="player-wrapper">
            <PlayerSong
               // track={currentTrack?.item || currentTrack?.items?.[0].track}
               track={currentTrack || current_track}
            />
            <div className="player-main">
               <PlayerControls player={player} paused={paused} />
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
