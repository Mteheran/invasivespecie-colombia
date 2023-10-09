import * as React from "react";
import {
  Button,
  Card as DesignCard,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup
} from '@chakra-ui/react';
import { IInvasiveSpecie } from "../../services/invasiveSpecie";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { SearcherContext } from "../../context";
import ImageContainer from "../imageContainer";

interface CardProps {
  card: IInvasiveSpecie | undefined
}

function Card({card} : CardProps) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const context = React.useContext(SearcherContext);


  const search = params.get("search");

  const openModalDetails = (id:number) => {
    if(search) {
      navigate(`?search=${search}&id=${id}`);
    }
    else {
    navigate(`?id=${id}`);
    }
    context.setIsModalOpen(true);
  }

  return (
    <DesignCard maxW='sm' alignItems="center">
      <CardBody  display="flex" alignItems="center" flexDirection="column">
        <ImageContainer imgURL={card?.urlImage} imgAlt={card?.name}/>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{card?.name}</Heading>
          <Text>
            {card?.commonNames}
          </Text>
          <Text color='blue.600'>
            {card?.scientificName}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue'
          onClick={()=> openModalDetails(card ? card?.id : 0)}>
            Ver detalle
          </Button>
        </ButtonGroup>
      </CardFooter>
    </DesignCard>
  );
}

export default Card;