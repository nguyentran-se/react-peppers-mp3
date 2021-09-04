/**
 * @description This component is render for both playlist and album
 */
import cardListSkeleton from "common/UI/CardListSkeleton/CardListSkeleton";
import CardListSkeleton from "common/UI/CardListSkeleton/CardListSkeleton";
import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Slider from "react-slick";
import Card from "./Card/Card";
import "./ListCard.scss";

const propTypes = {
   cards: PropTypes.array,
   cardShape: PropTypes.string,
   oneButton: PropTypes.bool,
   wrapItems: PropTypes.bool,
   afterChangeHandler: PropTypes.func,
};

const ListCard = forwardRef((props, ref) => {
   const {
      cards = [],
      cardShape = "square",
      oneButton,
      wrapItems,
      afterChangeHandler,
   } = props;
   const [isLoaded, setIsLoaded] = useState(false);
   useEffect(() => {
      if (cards.length > 0) setIsLoaded(true);
   }, [cards]);
   //each cards in [] has artists[]
   // let transformedCards;
   // if(cards){
   // }
   const transformedCards = cards.map((c) => {
      if (c.album) c = c.album;
      return (
         <Card
            cardImage={c?.images?.[0]?.url}
            cardId={c.id}
            cardName={c.name}
            cardArtist={c?.artists}
            cardDescription={c.description}
            cardShape={cardShape}
            cardType={c.type}
            key={c.id}
            cardFollowers={c?.followers?.total}
            oneButton={oneButton}
            // isLoaded={isLoaded}
         />
      );
   });
   const settingSlider = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      swipe: false,
      lazyLoad: "ondemand",
      arrows: false,
      // beforeChange: (prev, next) => beforeChangeHandler(prev, next),
      afterChange: (index) => afterChangeHandler(index),
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 4,
               slidesToScroll: 4,
            },
         },
      ],
   };

   /**
    * @implements:
    *    - render slider for list nowrap
    *       + cards to wait for getting full list then render.To sure
    *       that react-slick calculate width exactly before render. Face this issue
    *       on responsive for 4 items of listcard.
    *    - and wrapItems for page like Home, Nhạc mới...
    */
   return !wrapItems ? (
      <Slider {...settingSlider} ref={ref} className={`list-card`}>
         {isLoaded ? transformedCards : cardListSkeleton(cardShape, 10)}
      </Slider>
   ) : (
      <div className={`list-card list-card--wrap`}>
         {isLoaded ? transformedCards : cardListSkeleton(cardShape, 20)}
      </div>
   );
   // : (
   //   <CardListSkeleton />
   // );
});

ListCard.displayName = "ListCard";
ListCard.propTypes = propTypes;

export default ListCard;
