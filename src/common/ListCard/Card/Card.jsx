import playerApi from "api/playerApi";
import { CARD_MENU_BUTTONS } from "constant";
import { numberFormatter } from "helper";
import { useMenu } from "hooks";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
   selectDeviceId,
   selectFavouriteIds,
   selectIsLoggedIn,
} from "selectors";
import {
   followAlbum,
   followPlaylist,
   unFollowAlbum,
   unFollowPlaylist,
   setCurrentList,
} from "store/actions/";
import CardMain from "../CardMain/CardMain";
import "./Card.scss";

const propTypes = {
   cardImage: PropTypes.string,
   cardId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
   cardName: PropTypes.string,
   cardArtist: PropTypes.array,
   cardDescription: PropTypes.string,
   cardShape: PropTypes.string,
   cardType: PropTypes.string,
   cardFollowers: PropTypes.number,
   oneButton: PropTypes.bool,
   themeButton: PropTypes.bool,
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
   themeButton,
}) => {
   const [onHover, setOnHover] = useState(false);
   const isLoggedIn = useSelector(selectIsLoggedIn);
   const favouriteIds = useSelector(selectFavouriteIds);
   const [errorImage, setErrorImage] = useState(false);
   // check if a album || playlist is in user's favourite
   const isFavourite = useRef(
      isLoggedIn &&
         (cardType === "album" || cardType === "playlist") &&
         favouriteIds.includes(cardId)
   );
   // console.log(isLoaded);
   const dispatch = useDispatch();

   const onMouseEnterHandler = () => {
      setOnHover(true);
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
    * @event clickHeartButtonOnCard
    * @implements
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
   const deviceId = useSelector(selectDeviceId);
   const playClickedHandler = () => {
      // console.log(cardType, cardId);
      const params = {
         device_id: deviceId,
      };
      const option = {
         context_uri: `spotify:${cardType}:${cardId}`,
      };
      playerApi.playURI(params, option);
      if (cardType === "album")
         dispatch(
            setCurrentList({ type: cardType, id: cardId, img: cardImage })
         );
      else dispatch(setCurrentList({ type: cardType, id: cardId }));
   };
   const { Menu, cardMenuHandler } = useMenu({ menuList: CARD_MENU_BUTTONS });

   const cardMain = (
      <CardMain
         onMouseEnterHandler={onMouseEnterHandler}
         onMouseLeaveHandler={onMouseLeaveHandler}
         onHover={onHover}
         oneButton={oneButton}
         isFavourite={isFavourite.current}
         followHandler={followHandler}
         cardMenuHandler={cardMenuHandler}
         errorImage={errorImage}
         cardImage={cardImage}
         onError={() => setErrorImage(true)}
         cardName={cardName}
         themeButton={themeButton}
         playClicked={playClickedHandler}
      />
   );

   return (
      <div className={`card card--${cardShape}`}>
         <div className="card-wrapper">
            {cardType ? (
               <Link to={`/${cardType}/${cardId}`}>{cardMain}</Link>
            ) : (
               cardMain
            )}

            {cardArtist ? (
               <h5 className="card-artist line-clamp--2">
                  {transformedArtist}
               </h5>
            ) : (
               cardDescription && (
                  <h5
                     className="card-description line-clamp--2"
                     dangerouslySetInnerHTML={{ __html: cardDescription }}></h5>
               )
            )}
            {cardFollowers && (
               <h5 className="card-description line-clamp--2">
                  {numberFormatter(cardFollowers, 1)} Followers
               </h5>
            )}
            <Menu />
         </div>
      </div>
   );
};

Card.propTypes = propTypes;

export default Card;
