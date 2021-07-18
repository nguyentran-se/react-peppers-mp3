import React from "react";
import Card from "./Card/Card";
import "./ListCard.scss";
const ListCard = ({ cards, cardType }) => {
   const transformedCards = cards.map((c, index) => (
      <Card
         cardType={cardType}
         srcImg={c.srcImg}
         cardTitle={c.cardTitle}
         cardArtist={c.cardArtist}
         key={index}
      />
   ));
   return <div className="list-card">{transformedCards}</div>;
};

export default ListCard;
