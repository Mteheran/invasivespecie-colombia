import * as React from "react";
import Card from "../card";

interface ICardList {
  cards: {
    name: string
  }[]
}

function CardList ({cards}: ICardList) {
  return (
    <>
    {
      cards.map(() => (
        <Card />
      ))
    }
    </>
  );
}

export default CardList;
