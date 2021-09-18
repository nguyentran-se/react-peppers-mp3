import Button from "common/UI/Button/Button";
import React from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { selectPlayer } from "selectors";
// import { nextTrack, previousTrack, togglePlay } from "store/actions";
import "./PlayerControls.scss";
const PlayerControls = ({ player, paused }) => {
   const togglePlayHandler = () => {
      if (player) player.togglePlay();
   }; //icon ic-pause-circle-outline
   const previousTrackHandler = () => {
      if (player) player.previousTrack();
   };
   const nextTrackHandler = () => {
      if (player) player.nextTrack();
   };
   return (
      <div className="player-controls">
         <Button icon="ic-shuffle" hover />
         <Button icon="ic-pre" hover clicked={previousTrackHandler} />
         <Button
            icon={`${
               paused ? "ic-play-circle-outline" : "ic-pause-circle-outline"
            }`}
            clicked={togglePlayHandler}
         />
         <Button icon="ic-next" hover clicked={nextTrackHandler} />
         <Button icon="ic-repeat" hover />
      </div>
   );
};

export default PlayerControls;
