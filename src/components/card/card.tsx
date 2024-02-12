import * as React from "react";
import {
  Button,
  Card as DesignCard,
  CardBody,
  CardFooter,
  Heading,
  Text,
  ButtonGroup
} from '@chakra-ui/react';
import { IInvasiveSpecie } from "../../services/invasiveSpecie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SearcherContext } from "../../context";
import ImageContainer from "../imageContainer";
import ShareModal from "../shareModal";
import { FC } from "react";

interface CardProps {
  card: IInvasiveSpecie | undefined
}

const Card: FC<CardProps> = ({card}) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const context = React.useContext(SearcherContext);

  const [isModalOpen, setIsModalOpen] = React.useState(false); // Declare isModalOpen variable

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

  const openModalShare = (id:number) => {
    setIsModalOpen(true);
  }

  const ShareUrl = (new URL(document.URL).origin) + "/?id=" + card?.id;

  return (
    <DesignCard 
      maxW='sm'
      alignItems="center"
      overflow={'hidden'}
      variant='elevated'
      boxShadow="0px 4px 11px 1px gray"
      padding="15px"
      borderRadius="25px"
      bg='linear-gradient(144deg, #b8c1ac, #47533d)' 
    >
      <ImageContainer imgURL={card?.urlImage} imgAlt={card?.name} />
      <CardBody width='100%' p='10px' bg='#feeee4' mt='20px'>
        <Heading size='md' fontSize='28px' color='#1e2017' textAlign='center' fontFamily='cursive' fontWeight='800' mb="5px"> {card?.name} </Heading>
        <Text color='#1e2017' fontSize='14px' fontFamily='roboto' textAlign='center' fontWeight='600'> {card?.scientificName} </Text>
      </CardBody>
      <CardFooter px='16.5px' bg='#feeee4' borderBottomRadius='15px'>
        <ButtonGroup spacing='1.5rem' borderTop='solid 1px #1e2017' pt='15px'>
          <Button 
            variant='ghost'
            bg='#6d7862'
            h='1rem'
            p='1.5rem 1.5rem'
            my='0.5rem'
            color='#feeee4'
            sx={{
              '&:hover': {
                background:'#b8c1ac'
              }}
            }
            onClick={()=> openModalDetails(card ? card?.id : 0)}
          >
            Ver detalle
          </Button>
          <Button 
            variant='ghost'
            bg='#6d7862'
            h='1rem'
            p='1.5rem 1.5rem'
            my='0.5rem'
            color='#feeee4'
            sx={{
              '&:hover': {
                background:'#b8c1ac'
              }}
            }
            onClick={()=> openModalShare(card ? card?.id : 0)}
          >
            Compartir
          </Button>
          <ShareModal 
            setIsModalOpen={setIsModalOpen}
            shareURL={ShareUrl}
            isOpen={isModalOpen}
          />
        </ButtonGroup>
      </CardFooter>
    </DesignCard>
  );
}

export default Card;