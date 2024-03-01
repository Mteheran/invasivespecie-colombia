import * as React from "react";
import Card from "../card";
import { IInvasiveSpecie } from "../../services/invasiveSpecie";
import {Center, Grid, useMediaQuery} from "@chakra-ui/react";

interface CardListProps {
  cards: IInvasiveSpecie[]
  columns: string
}

const CardList: React.FC<CardListProps> = ({cards, columns}) => {

  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <Center>
      <Grid 
        templateColumns={columns}
        gap='2rem'
        m='2rem'
      >
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
