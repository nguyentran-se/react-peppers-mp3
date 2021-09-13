import playerApi from "api/playerApi";
import ProgressBar from "common/ProgressBar/ProgressBar";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "selectors";
import "./Player.scss";
import PlayerActions from "./PlayerActions/PlayerActions";
import PlayerControls from "./PlayerControls/PlayerControls";
import PlayerSong from "./PlayerSong/PlayerSong";

const Player = ({ clicked, toggleQueue }) => {
   const isLoggedIn = useSelector(selectIsLoggedIn);
   const [currentTrack, setCurrentTrack] = useState();
   useEffect(() => {
      const requestGetCurrentTrack = async () => {
         const params = {
            limit: 1,
            before: new Date().getTime(),
         };
         const currentPlaying = await playerApi.getCurrentPlayingTrack();
         const recentlyPlayed = await playerApi.getRecentlyPlayedTracks(params);
         if (currentPlaying.item) setCurrentTrack(currentPlaying);
         else setCurrentTrack(recentlyPlayed);
         console.log(recentlyPlayed);
         console.log(currentPlaying);
      };
      if (isLoggedIn) requestGetCurrentTrack();
   }, [isLoggedIn]);

   return (
      <div className="player">
         <div className="player-wrapper">
            <PlayerSong
               track={currentTrack?.item || currentTrack?.items?.[0].track}
            />
            <div className="player-main">
               <PlayerControls />
               <ProgressBar initial={0} step={0.01} hasTime />
            </div>
            <PlayerActions clicked={clicked} toggleQueue={toggleQueue} />
         </div>
      </div>
   );
};

export default memo(Player);
