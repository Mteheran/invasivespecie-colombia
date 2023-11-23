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
  ButtonGroup,
  Link,
  Box, 
} from '@chakra-ui/react';
import { IInvasiveSpecie } from "../../services/invasiveSpecie";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { SearcherContext } from "../../context";
import ImageContainer from "../imageContainer";
import {useState} from "react";

interface CardProps {
  card: IInvasiveSpecie | undefined
}

function Card({card} : CardProps) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const context = React.useContext(SearcherContext);
  const [ readMore, setReadMore ] = useState(false);

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
      boxShadow="0px 0px 5px rgba(0, 0, 0, 0.25)" 
      borderRadius="lg" 
      m="1rem"
      overflow={'hidden'}
    >
      <ImageContainer imgURL={card?.urlImage} imgAlt={card?.name}/>
      <CardBody width={'100%'} p='10px'>
        <Stack spacing='1'>
          <Heading size='md'>{card?.name}</Heading>
          <Text color='blue.600'>
            {card?.scientificName}
          </Text>
        </Stack>
      </CardBody>
      <Divider borderColor="gray.300"/>
      <CardFooter width={'100%'} py='5px' display='flex' alignContent='center' justifyContent='center'>
        <ButtonGroup>
          <Button 
            variant='ghost' 
            colorScheme='blue'
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