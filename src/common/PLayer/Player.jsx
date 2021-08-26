import ProgressBar from "common/ProgressBar/ProgressBar";
import React, { memo } from "react";
import "./Player.scss";
import PlayerActions from "./PlayerActions/PlayerActions";
import PlayerControls from "./PlayerControls/PlayerControls";
import PlayerSong from "./PlayerSong/PlayerSong";
const Player = ({ clicked, toggleQueue }) => {
   return (
      <div className="player">
         <div className="player-wrapper">
            <PlayerSong />
            <div className="player-main">
               <PlayerControls />
               <ProgressBar hasTime />
            </div>
            <PlayerActions clicked={clicked} toggleQueue={toggleQueue} />
         </div>
      </div>
   );
};

export default memo(Player);
