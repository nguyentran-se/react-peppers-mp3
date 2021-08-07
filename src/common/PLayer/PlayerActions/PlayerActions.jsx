import ProgressBar from "common/ProgressBar/ProgressBar";
import Button from "common/UI/Button/Button";
import React from "react";
import "./PlayerActions.scss";
const PlayerActions = () => {
   return (
      <div className="player-actions">
         <Button icon="ic-mv" hover />
         <Button icon="ic-karaoke" hover />
         <div className="player-volume__wrapper">
            <Button icon="ic-volume" hover />
            <ProgressBar style={{ width: "70px" }} />
         </div>
         <Button icon="ic-scale-1" hover />
         <div></div>
         <Button icon="ic-list-music" hoverSquare />
      </div>
   );
};

export default PlayerActions;
