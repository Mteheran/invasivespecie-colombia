import * as React from "react";
import SearchBar from "../../components/searchBar";
import CardList from "../../components/cardList";
import {Box, Center, Flex, Heading, Link, Spacer, Text, useMediaQuery} from "@chakra-ui/react";
import { SearcherContext } from "../../context";
import InvasiveSpecieModal from "../../components/detailModal";
import {ExternalLinkIcon} from "@chakra-ui/icons";
import {useEffect, useState} from "react";
import background from "../../utils/images/background.jpg";


function Searcher() {
  const context = React.useContext(SearcherContext);
  
  const [isSmallWindow] = useMediaQuery("(max-width: 800px)");

  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowSearchBar(window.scrollY >= 200);
    };

    window.addEventListener('scroll', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return (
      <>
        <Flex
            flexDirection={isSmallWindow ? 'column' : 'row'}
            as="header"
            py='10px' 
            px='10%'
            bg='purple.500'
            color='white'
            position='fixed'
            top='0'
            width='100%'
            zIndex='999'
            transition='transform 0.2s ease-in-out'
            transform={showSearchBar ? 'translateY(0)' : 'translateY(-100%)'}
        >
            <Center display={isSmallWindow? 'none':'flex'}>
                <Heading size='md'>{"Especies Invasoras - API Colombia"}</Heading>
            </Center>
            <Center display={isSmallWindow? 'flex':'none'} flexDirection='column' mb='0.5rem'>
                <Heading size='md'>Especies Invasoras</Heading>
                <Heading size='sm'>API Colombia</Heading>
            </Center>
            <Spacer />
            <Center w={isSmallWindow? '100%':'60%'}>
              <SearchBar value={context.searchValue}/>
            </Center>
        </Flex>
        <Center bg={`url(${background})`} py='50px' mt="50px" borderRadius='25px' boxShadow="0px 4px 11px 1px gray" color='white' px={isSmallWindow ?'10%':'none'} width='50%' mx='auto'>
          <Flex direction='column'>
            <Center>
            <Heading size='lg'>Especies Invasoras</Heading>
            </Center>
            <Text pb='1rem'>Visualizador de especies invasoras en Colombia potenciado por{' '}
              <Link href='https://api-colombia.com' isExternal textDecoration="underline">
                API Colombia <ExternalLinkIcon mx='2px' />
              </Link>
            </Text>
            <Box 
              as="header" 
              py='10px' 
              px='15%'
            >
              <SearchBar value={context.searchValue}/>
            </Box>
          </Flex>
        </Center>
        <CardList cards={context.itemList}/>
        <InvasiveSpecieModal 
          isOpen={context.isModalOpen} 
          data={context.itemDetail}
          setIsModalOpen={context.setIsModalOpen}></InvasiveSpecieModal>
      </>

  );
}

export default Searcher;
