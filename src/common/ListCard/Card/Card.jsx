import { numberFormatter } from "helper";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import usePortal from "react-cool-portal";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectFavouriteIds, selectIsLoggedIn } from "selectors";
import {
   followAlbum,
   followPlaylist,
   unFollowAlbum,
   unFollowPlaylist,
} from "store/actions/";
import CardMain from "../CardMain/CardMain";
import CardMenu from "../CardMenu/CardMenu";
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

   /**
    * @event clickButtonMoreOnCard
    * @implements
    *  - get position of mouse, get width height of screen
    *  - if(portal hide) setMenuPosition -> avoid redundance of setState.
    *  - hide if catch scroll event
    */
   const { Portal, isShow, toggle, hide } = usePortal({
      defaultShow: false,
      containerId: "peppers-portal",
   });
   const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
   const cardMenuHandler = (e) => {
      const screenWidth = window.innerWidth,
         screenHeight = window.innerHeight,
         x = e.pageX,
         y = e.pageY,
         menuWith = 260,
         menuHeight = 210;

      document.querySelector(".layout-right").onscroll = () => {
         hide();
      };

      toggle();
      if (!isShow) {
         if (screenWidth - x >= menuWith && screenHeight - y >= menuHeight) {
            setMenuPosition({ x: x + 10, y: y + 10 });
            // console.log("ĐỦ");
         } else if (
            screenWidth - x < menuWith &&
            screenHeight - y < menuHeight
         ) {
            setMenuPosition({ x: x - menuWith, y: y - menuHeight });
            // console.log("THIẾU CẢ 2");
         } else if (screenWidth - x < menuWith) {
            setMenuPosition({ x: x - menuWith, y });
            // console.log("THIẾU X");
         } else {
            setMenuPosition({ x, y: y - menuHeight });
            // console.log("THIẾU Y");
         }
      }
   };

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
            ) : cardDescription ? (
               <h5
                  className="card-description line-clamp--2"
                  dangerouslySetInnerHTML={{ __html: cardDescription }}></h5>
            ) : (
               <h5 className="card-description line-clamp--2">
                  {numberFormatter(cardFollowers)} Followers
               </h5>
            )}
            <Portal>
               <CardMenu top={menuPosition.y} left={menuPosition.x} />
            </Portal>
         </div>
      </div>
   );
};

Card.propTypes = propTypes;

export default Card;
