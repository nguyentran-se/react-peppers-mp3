import ProgressBar from "common/ProgressBar/ProgressBar";
import React from "react";
import "./Player.scss";
import PlayerActions from "./PlayerActions/PlayerActions";
import PlayerControls from "./PlayerControls/PlayerControls";
import PlayerSong from "./PlayerSong/PlayerSong";
const Player = ({ clicked }) => {
   return (
      <div className="player">
         <div className="player-wrapper">
            <PlayerSong />
            <div className="player-main">
               <PlayerControls />
               <ProgressBar hasTime />
            </div>
            <PlayerActions clicked={clicked} />
         </div>
      </div>
   );
};

export default Player;
