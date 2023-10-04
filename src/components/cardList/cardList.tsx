import * as React from "react";
import Card from "../card";
import IinvasiveSpecie from "../../interfaces/IinvasiveSpecie";

interface CardListProps {
  cards: IinvasiveSpecie[] | undefined
}

function CardList ({cards}: CardListProps) {
  return (
    <>
    {
      cards?.map((card, index) => (
        <Card card={card}/>
      ))
    }
    </>
  );
}

export default CardList;
