import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardModal from "../CardModal/CardModal";
import "./Card.scss";
import { numberFormatter } from "helper";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "selectors";
import PropTypes from "prop-types";

const propTypes = {
   cardImage: PropTypes.string,
   cardId: PropTypes.string,
   cardName: PropTypes.string,
   cardArtist: PropTypes.array,
   cardDescription: PropTypes.string,
   cardShape: PropTypes.string,
   cardType: PropTypes.string,
   cardFollowers: PropTypes.number,
   oneButton: PropTypes.bool,
};

const Card = ({
   cardImage,
   cardId,
   cardName,
   cardArtist,
   cardDescription,
   cardShape,
   cardType,
   cardFollowers,
   oneButton,
}) => {
   const [onHover, setOnHover] = useState(false);
   const isLoggedIn = useSelector(selectIsLoggedIn);
   const onMouseEnterHandler = async () => {
      setOnHover(true);
      try {
         // const params = { ids: cardId };
         if (isLoggedIn && (cardType === "album" || cardType === "playlist")) {
            // const data = await userApi.checkFavouriteAlbum(params);
            // console.log(data);
            console.log(cardType, cardId);
         }
      } catch (error) {}
   };

   const onMouseLeaveHandler = () => {
      setOnHover(false);
   };
   let transformedArtist = null;
   if (cardArtist) {
      const length = cardArtist.length - 1;
      transformedArtist = cardArtist.map((art, index) => (
         <span key={art.id}>
            <Link
               to={`/artist/${art.id}`}
               className="queue-song__artist artist-hover">
               {art.name}
            </Link>
            {length !== index && ", "}
         </span>
      ));
   }
   return (
      <div className={`card card--${cardShape}`}>
         <div className="card-wrapper">
            <Link to={`/${cardType}/${cardId}`}>
               <div
                  className="card-img"
                  onMouseEnter={onMouseEnterHandler}
                  onMouseLeave={onMouseLeaveHandler}>
                  <CardModal onHover={onHover} oneButton={oneButton} />
                  <img src={cardImage} alt="card song" />
               </div>
               <h4 className="card-title line-clamp--1">{cardName}</h4>
            </Link>
            {cardArtist ? (
               <h5 className="card-artist line-clamp--2">
                  {transformedArtist}
               </h5>
            ) : cardDescription ? (
               <h5
                  className="card-description line-clamp--2"
                  dangerouslySetInnerHTML={{ __html: cardDescription }}></h5>
            ) : (
               <h5 className="card-description line-clamp--2">
                  {numberFormatter(cardFollowers)} Followers
               </h5>
            )}
         </div>
      </div>
   );
};

Card.propTypes = propTypes;

export default Card;
