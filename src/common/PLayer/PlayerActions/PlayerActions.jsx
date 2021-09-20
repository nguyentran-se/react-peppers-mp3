import ProgressBar from "common/ProgressBar/ProgressBar";
import Button from "common/UI/Button/Button";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPlayer } from "selectors";
import "./PlayerActions.scss";

const PlayerActions = ({ clicked, toggleQueue }) => {
   const player = useSelector(selectPlayer);
   const [progressVolume, setProgressVolume] = useState(0.5);
   const [isMuted, setIsMuted] = useState(false);
   useEffect(() => {
      if (player) player.getVolume().then((v) => setProgressVolume(v));
   }, [player]);
   const volumeInputHandler = (e) => {
      // console.log(e.target.value);
      if (!player) return;
      player.setVolume(+e.target.value);
      setProgressVolume(+e.target.value);
      // .then(() => setProgressVolume(+e.target.value));
   };
   const clickedVolumeHandler = () => {
      if (!player) return;
      setIsMuted(!isMuted);
      // console.log(isMuted);
      if (isMuted) player.setVolume(0.5).then(() => setProgressVolume(0.5));
      else player.setVolume(0).then(() => setProgressVolume(0));
   };
   return (
      <div className="player-actions">
         <Button icon="ic-mv" hover />
         <Button icon="ic-karaoke" hover />
         <div className="player-volume__wrapper">
            <Button
               icon={`${
                  isMuted || progressVolume === 0
                     ? "ic-volume-mute"
                     : "ic-volume"
               }`}
               hover
               clicked={clickedVolumeHandler}
            />
            <ProgressBar
               progressValue={progressVolume}
               step={0.1}
               length={{ width: "70px" }}
               changed={volumeInputHandler}
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
