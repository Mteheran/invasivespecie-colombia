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
    <DesignCard maxW='sm' alignItems="center" boxShadow="0px 0px 5px rgba(0, 0, 0, 0.25)" borderRadius="lg" m="1rem">
      <CardBody>
        <ImageContainer imgURL={card?.urlImage} imgAlt={card?.name}/>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{card?.name}</Heading>
          <Text color='blue.600'>
            {card?.scientificName}
          </Text>
          <Box borderWidth="1px" borderRadius="lg" p="1rem">
            <Text as='b' textAlign='center'>
              Nombres comunes
            </Text>
            {card?.commonNames && card?.commonNames.length < 35 ? 
              <Text>
                {card?.commonNames}
              </Text>
            :
            <Box>
              <Text noOfLines={readMore && card?.commonNames && card?.commonNames.length > 35 ? undefined : 1}>
                {card?.commonNames}
              </Text>
              { readMore ?
                <Link color='teal.500' onClick={() => {setReadMore(false)}}>
                  ver menos...
                </Link>
              : 
              <Link color='teal.500' onClick={() => {setReadMore(true)}}>
                ver todo...
              </Link>
              }
            </Box>
            }
          </Box>
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