/**
 * @description This component is render for both playlist and album
 */
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
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
      cards,
      cardShape = "square",
      oneButton,
      wrapItems,
      afterChangeHandler,
   } = props;

   let transformedCards;
   //each cards in [] has artists[]
   if (cards) {
      transformedCards = cards.map((c) => {
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
            />
         );
      });
   }
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
   return cards ? (
      !wrapItems ? (
         <Slider
            {...settingSlider}
            ref={ref}
            className={`list-card ${wrapItems ? "list-card--wrap" : ""}`}>
            {transformedCards}
         </Slider>
      ) : (
         <div className={`list-card ${wrapItems ? "list-card--wrap" : ""}`}>
            {transformedCards}
         </div>
      )
   ) : (
      <div>waiting</div>
   );
});

ListCard.displayName = "ListCard";
ListCard.propTypes = propTypes;

export default ListCard;
