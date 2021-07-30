import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardModal from "../CardModal/CardModal";
import "./Card.scss";

const Card = ({
   cardImage,
   cardId,
   cardName,
   cardArtist,
   cardDescription,
   cardShape,
   cardType,
}) => {
   const [onHover, setOnHover] = useState(false);

   const onMouseOverHandler = () => {
      setOnHover(true);
   };

   const onMouseOutHandler = () => {
      setOnHover(false);
   };

   return (
      <div className={`card card--${cardShape}`}>
         <div className="card-wrapper">
            <Link to={`/${cardType}/${cardId}`}>
               <div
                  className="card-img"
                  onMouseEnter={onMouseOverHandler}
                  onMouseLeave={onMouseOutHandler}>
                  <CardModal onHover={onHover} />
                  <img src={cardImage} alt="card song" />
               </div>
               <h4 className="card-title line-clamp--1">{cardName}</h4>
            </Link>
            {cardArtist ? (
               <h5 className="card-artist line-clamp--2">
                  {<a href="#card-artist">{cardArtist}</a>}
               </h5>
            ) : (
               <h5 className="card-description line-clamp--2 ">
                  {cardDescription}
               </h5>
            )}
         </div>
      </div>
   );
};

export default Card;
