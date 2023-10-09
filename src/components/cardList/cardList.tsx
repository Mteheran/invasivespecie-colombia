import * as React from "react";
import Card from "../card";
import { IInvasiveSpecie } from "../../services/invasiveSpecie";
import {Box} from "@chakra-ui/react";

interface CardListProps {
  cards: IInvasiveSpecie[]
}

function CardList ({cards}: CardListProps) {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
    {
      cards?.map((card, index) => (
        <Card card={card} key={card.id}/>
      ))
    }
    </Box>
  );
}

export default CardList;
