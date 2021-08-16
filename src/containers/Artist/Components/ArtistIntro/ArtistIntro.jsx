import Button from "common/UI/Button/Button";
import React from "react";
import "./ArtistIntro.scss";
const ArtistIntro = ({ name, followers, genres, image, popularity }) => {
   return (
      <div className="artist-intro">
         <div className="artist-info">
            <h1>{name}</h1>
            <p>
               {" "}
               genres:{" "}
               <span className="artist-info__genres">
                  {genres && genres.join(", ")}
               </span>
            </p>
            <p>popularity point: {popularity}</p>
            <div className="artist-intro__buttons">
               <Button icon="ic-play" custom="button--normal">
                  PHÁT NHẠC
               </Button>
               <Button icon="ic-addfriend" custom="button--normal">
                  QUAN TÂM
               </Button>
            </div>
            <p className="artist-info__followers">
               {followers && followers.toLocaleString("vi-VN")} QUAN TÂM
            </p>
         </div>
         <div className="artist-intro__image">
            <img src={image} alt="artist" />
         </div>
      </div>
   );
};

export default ArtistIntro;
