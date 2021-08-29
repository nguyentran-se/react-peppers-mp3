import { numberFormatter } from "helper";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavouriteIds, selectIsLoggedIn } from "selectors";
import {
   followAlbum,
   followPlaylist,
   unFollowAlbum,
   unFollowPlaylist,
} from "store/actions/";
import CardModal from "../CardModal/CardModal";
import "./Card.scss";

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
   const favouriteIds = useSelector(selectFavouriteIds);
   // check if a album || playlist is in user's favourite
   const isFavourite = useRef(
      isLoggedIn &&
         (cardType === "album" || cardType === "playlist") &&
         favouriteIds.includes(cardId)
   );

   const dispatch = useDispatch();

   const onMouseEnterHandler = () => {
      setOnHover(true);
      // if (isLoggedIn && (cardType === "album" || cardType === "playlist")) {
      //    isFavourite.current = favouriteIds.includes(cardId);
      // }
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

   /**
    * @description click heart button
    *  - if album||playlist is in follow(isFavourite = true), then dispatch
    *  unfollow(isFavourite = false)
    *  - add active into button
    */
   const followHandler = (e) => {
      if (isLoggedIn) {
         if (isFavourite.current) {
            e.currentTarget.classList.remove("active");
            isFavourite.current = false;
            if (cardType === "playlist") dispatch(unFollowPlaylist(cardId));
            else if (cardType === "album") dispatch(unFollowAlbum(cardId));
         } else {
            e.currentTarget.classList.add("active");
            isFavourite.current = true;
            if (cardType === "playlist") dispatch(followPlaylist(cardId));
            else if (cardType === "album") dispatch(followAlbum(cardId));
         }
      }
   };

   return (
      <div className={`card card--${cardShape}`}>
         <div className="card-wrapper">
            <Link to={`/${cardType}/${cardId}`}>
               <div
                  className="card-img"
                  onMouseEnter={onMouseEnterHandler}
                  onMouseLeave={onMouseLeaveHandler}>
                  <CardModal
                     onHover={onHover}
                     oneButton={oneButton}
                     isFavourite={isFavourite.current}
                     clicked={(e) => followHandler(e)}
                  />
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
