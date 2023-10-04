import * as React from "react";
import { 
  Button, 
  Card as DesignCard, 
  Image, 
  CardBody, 
  CardFooter, 
  Stack, 
  Heading, 
  Text, 
  Divider, 
  ButtonGroup  
} from '@chakra-ui/react';
import IinvasiveSpecie from "../../interfaces/IinvasiveSpecie";


interface CardProps {
  card: IinvasiveSpecie | undefined
}

function Card({card} : CardProps) {
  return (
    <DesignCard maxW='sm'>
      <CardBody>
        <Image
          src={card?.urlImage}
          alt={card?.name}
          borderRadius='lg'
        />
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
          <Button variant='solid' colorScheme='blue'>
            Ver detalle
          </Button>
        </ButtonGroup>
      </CardFooter>
    </DesignCard>
  );
}

export default Card;
