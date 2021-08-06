import React from "react";
import srcImg from "assets/images/test.jpg";
import "./PlayerSong.scss";
import Button from "common/UI/Button/Button";
const PlayerSong = () => {
   return (
      <div className="player-song">
         <a href="#playlist-id">
            <div className="player-song__thumbnail">
               <img src={srcImg} alt="song" />
            </div>
         </a>
         <div className="player-song__info">
            <a href="#song" className="player-song__name line-clamp--1">
               NameTest
            </a>
            <a
               href="#artist"
               className="player-song__artist line-clamp--1 artist-hover--nocolor">
               ArtistTest
            </a>
         </div>
         <div className="player-song__control">
            <Button icon="ic-like" hover />
            <Button icon="ic-more" hover />
         </div>
      </div>
   );
};

export default PlayerSong;
