import srcImg2 from "assets/images/test.jpg";
import Button from "common/UI/Button/Button";
import React from "react";
import { Link } from "react-router-dom";
import "./PlayerSong.scss";

const PlayerSong = ({ track }) => {
   // const {artists, album, name: songName} = track;
   let transformedArtist;
   if (track?.artists) {
      let length = track.artists.length - 1;
      transformedArtist = track.artists.map((art, index) => (
         <span key={art?.id || index}>
            <Link
               to={`/artist/${art.id || (art.uri && art?.uri.split(":")[2])}`}
               className="player-song__artist artist-hover--nocolor">
               {art.name}
            </Link>
            {length !== index && ", "}
         </span>
      ));
   }
   return (
      <div className="player-song">
         <a href="#playlist-id">
            <div className="player-song__thumbnail">
               <img src={track?.album?.images[0].url || srcImg2} alt="song" />
            </div>
         </a>
         <div className="player-song__info">
            <Link
               to={`/album/${
                  track?.album?.id ||
                  (track?.album?.uri && track?.album?.uri.split(":")[2])
               }`}
               className="player-song__name line-clamp--1">
               {track?.name}
            </Link>
            <span className={"line-clamp--1"}>{transformedArtist}</span>
         </div>
         <div className="player-song__control">
            <Button icon="ic-like" hover />
            <Button icon="ic-more" hover />
         </div>
      </div>
   );
};

export default PlayerSong;
