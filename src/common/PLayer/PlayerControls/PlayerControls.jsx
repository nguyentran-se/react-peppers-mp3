import Button from "common/UI/Button/Button";
import React from "react";
import "./PlayerControls.scss";
const PlayerControls = () => {
   return (
      <div className="player-controls">
         <Button icon="ic-shuffle" hover />
         <Button icon="ic-pre" hover />
         <Button icon="ic-play-circle-outline" />
         <Button icon="ic-next" hover />
         <Button icon="ic-repeat" hover />
      </div>
   );
};

export default PlayerControls;
