import React from "react";
import Card from "./Card/Card";
import "./ListCard.scss";

const ListCard = ({ cards, cardShape = "square", oneButton, wrapItems }) => {
   // console.log(cards);
   let transformedCards;
   if (cards) {
      transformedCards = cards.map((c, index) => (
         <Card
            cardImage={c?.images?.[0].url}
            cardId={c.id}
            cardName={c.name}
            cardArtist={null}
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

export default ListCard;
