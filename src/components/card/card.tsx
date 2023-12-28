import * as React from "react";
import {
  Button,
  Card as DesignCard,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Divider,
  ButtonGroup,
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
    <DesignCard 
      maxW='sm'
      alignItems="center"
      overflow={'hidden'}
      variant='elevated'
    >
      <ImageContainer imgURL={card?.urlImage} imgAlt={card?.name}/>
      <CardBody width={'100%'} p='10px'>
        <Heading size='md'> {card?.name} </Heading>
        <Text color='blue.600'> {card?.scientificName} </Text>
      </CardBody>
      <Divider borderColor="gray.300"/>
      <CardFooter p="0">
        <ButtonGroup spacing='1.5rem'>
          <Button 
            variant='ghost'
            h='1rem'
            p='0.8rem 1.5rem'
            my='0.5rem'
            onClick={()=> openModalDetails(card ? card?.id : 0)}
          >
            Ver detalle
          </Button>
        </ButtonGroup>
      </CardFooter>
    </DesignCard>
  );
}

export default Card;