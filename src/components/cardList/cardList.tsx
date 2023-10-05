import * as React from "react";
import Card from "../card";
import { IInvasiveSpecie } from "../../services/invasiveSpecie";

interface CardListProps {
  cards: IInvasiveSpecie[]
}

function CardList ({cards}: CardListProps) {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <>
    {
      cards?.map((card, index) => (
        <Card card={card} key={card.id}/>
      ))
    }
    </>
  );
}

export default CardList;
