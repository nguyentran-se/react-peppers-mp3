import ProgressBar from "common/ProgressBar/ProgressBar";
import React from "react";
import "./Player.scss";
import PlayerControls from "./PlayerControls/PlayerControls";
import PlayerSong from "./PlayerSong/PlayerSong";
const Player = () => {
   return (
      <div className="player">
         <div className="player-wrapper">
            <PlayerSong />
            <div className="player-main">
               <PlayerControls />
               <ProgressBar />
            </div>
            <div className="player-actions">ks</div>
         </div>
      </div>
   );
};

export default Player;
