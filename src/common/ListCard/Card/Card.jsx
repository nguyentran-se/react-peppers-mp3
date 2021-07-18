import React from "react";
// import srcImg from "assets/images/test.jpg";
import "./Card.scss";
const Card = ({ cardType, srcImg, cardTitle, cardArtist }) => {
   return (
      <div className={`card card--${cardType}`}>
         <div className="card-wrapper">
            <a href="#card-img">
               <div className="card-img">
                  <img src={srcImg} alt="card song" />
               </div>
               <h4 className="card-title line-clamp--2">{cardTitle}</h4>
            </a>
            <h5 className="card-artist line-clamp--2">
               <a href="#card-artist">{cardArtist}</a>
            </h5>
         </div>
      </div>
   );
};

export default Card;
