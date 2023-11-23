import * as React from "react";
import SearchBar from "../../components/searchBar";
import CardList from "../../components/cardList";
import {Box, Center, Flex, Heading, Link, Text} from "@chakra-ui/react";
import { SearcherContext } from "../../context";
import InvasiveSpecieModal from "../../components/detailModal";
import {ExternalLinkIcon} from "@chakra-ui/icons";


function Searcher() {
const context = React.useContext(SearcherContext);

  return (
      <>
        <Center bg='purple.500' h='100px' py='125px' color='white'>
          <Flex direction='column'>
            <Center>
            <Heading size='lg'>{"Especies Invasoras"}</Heading>
            </Center>
            <Text pb='1rem'>Visualizador de especies invasoras en Colombia potenciado por{' '}
              <Link href='https://api-colombia.com' isExternal>
                API Colombia <ExternalLinkIcon mx='2px' />
              </Link>
            </Text>
            <Box as="header">
              <SearchBar value={context.searchValue}/>
            </Box>
          </Flex>
        </Center>
        <CardList cards={context.itemList}/>
        <InvasiveSpecieModal isOpen={context.isModalOpen} data={context.itemDetail}
                             setIsModalOpen={context.setIsModalOpen}></InvasiveSpecieModal>
      </>

  );
}

export default Searcher;
