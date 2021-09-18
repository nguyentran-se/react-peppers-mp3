import ProgressBar from "common/ProgressBar/ProgressBar";
import Button from "common/UI/Button/Button";
import React from "react";
import "./PlayerActions.scss";

const PlayerActions = ({ clicked, toggleQueue }) => {
   const volumeInputHandler = () => {};
   return (
      <div className="player-actions">
         <Button icon="ic-mv" hover />
         <Button icon="ic-karaoke" hover />
         <div className="player-volume__wrapper">
            <Button icon="ic-volume" hover />
            <ProgressBar
               progressValue={0.5}
               step={0.1}
               length={{ width: "70px" }}
               changed={volumeInputHandler}
               duration={1}
            />
         </div>
         <Button icon="ic-scale-1" hover />
         <div></div>
         <Button
            icon="ic-list-music"
            hoverSquare
            clicked={clicked}
            activeSquare={toggleQueue}
         />
      </div>
   );
};

export default PlayerActions;
