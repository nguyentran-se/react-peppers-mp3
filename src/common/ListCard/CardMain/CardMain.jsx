import PropTypes from "prop-types";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import CardModal from "../CardModal/CardModal";

const propTypes = {
   onMouseEnterHandler: PropTypes.func,
   onMouseLeaveHandler: PropTypes.func,
   onHover: PropTypes.bool,
   oneButton: PropTypes.bool,
   isFavourite: PropTypes.bool,
   followHandler: PropTypes.func,
   cardMenuHandler: PropTypes.func,
   errorImage: PropTypes.bool,
   cardImage: PropTypes.string,
   cardName: PropTypes.string,
   onError: PropTypes.func,
};

const CardMain = ({
   onMouseEnterHandler,
   onMouseLeaveHandler,
   onHover,
   oneButton,
   isFavourite,
   followHandler,
   cardMenuHandler,
   errorImage,
   cardImage,
   cardName,
   onError,
   themeButton,
}) => {
   return (
      <>
         <div
            className="card-img"
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}>
            <CardModal
               onHover={onHover}
               oneButton={oneButton}
               isFavourite={isFavourite}
               clicked={followHandler}
               menuClicked={cardMenuHandler}
               themeButton={themeButton}
            />
            {errorImage && (
               <SkeletonTheme
                  color={"var(--loading-bg)"}
                  highlightColor={"hsl(0, 0%, 100%, 0.4)"}>
                  <Skeleton
                     style={{
                        position: "absolute",
                        height: "100%",
                        top: 0,
                     }}
                     duration={1.5}
                  />
               </SkeletonTheme>
            )}
            <LazyLoadImage
               alt={"peppers"}
               src={cardImage}
               threshold={100} //-150: visible 150px then load image
               onError={onError}
               placeholder={
                  <SkeletonTheme
                     color={"var(--loading-bg)"}
                     highlightColor={"hsl(0, 0%, 100%, 0.4)"}>
                     <Skeleton
                        style={{
                           position: "absolute",
                           height: "100%",
                           top: 0,
                           left: 0,
                        }}
                        duration={1.5}
                     />
                  </SkeletonTheme>
               }
            />
            {/* <img src={cardImage} alt="card song" /> */}
         </div>
         {cardName && <h4 className="card-title line-clamp--1">{cardName}</h4>}
      </>
   );
};

CardMain.propTypes = propTypes;

export default CardMain;
