import React from "react";
import Card from "./Card/Card";
import "./ListCard.scss";
import PropTypes from "prop-types";
const propTypes = {
   cards: PropTypes.array,
   cardShape: PropTypes.string,
   oneButton: PropTypes.bool,
   wrapItems: PropTypes.bool,
};
const ListCard = ({ cards, cardShape = "square", oneButton, wrapItems }) => {
   // console.log(cards);
   let transformedCards;
   //each cards in [] has artists[]
   if (cards) {
      transformedCards = cards.map((c) => (
         <Card
            cardImage={c?.images?.[0].url}
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
      ));
   }
   return (
      <div className={`list-card ${wrapItems ? "list-card--wrap" : ""}`}>
         {transformedCards}
      </div>
   );
};

ListCard.propTypes = propTypes;

export default ListCard;
