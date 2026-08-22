import * as React from "react";
import Card from "../card";
import { EnrichedSpecie } from "../../services/invasiveSpecie";
import { Grid } from "@chakra-ui/react";

interface CardListProps {
  cards: EnrichedSpecie[];
  columns: string;
}

const CardList: React.FC<CardListProps> = ({ cards, columns }) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <Grid templateColumns={columns} gap="24px">
      {cards.map((card) => (
        <Card card={card} key={card.id} />
      ))}
    </Grid>
  );
};

export default CardList;
