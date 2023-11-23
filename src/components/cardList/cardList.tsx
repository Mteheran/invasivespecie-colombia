import * as React from "react";
import Card from "../card";
import { IInvasiveSpecie } from "../../services/invasiveSpecie";
import {Center, Grid, useMediaQuery} from "@chakra-ui/react";

interface CardListProps {
  cards: IInvasiveSpecie[]
}

function CardList ({cards}: CardListProps) {
  const [mediumWindow] = useMediaQuery("(min-width: 800px)");
  const [largeWindow] = useMediaQuery("(min-width: 1100px)");

  let columns = '1fr';
  if (largeWindow) {
    columns = 'repeat(3, 1fr)';
  }
  else if (mediumWindow) {
    columns = 'repeat(2, 1fr)';
  }

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <Center>
      <Grid templateColumns={columns}>
        {
          cards?.map((card) => (
            <Card card={card} key={card.id}/>
          ))
        }
      </Grid>
    </Center>
  );
}

export default CardList;
