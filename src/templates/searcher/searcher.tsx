import * as React from "react";
import SearchBar from "../../components/searchBar";
import CardList from "../../components/cardList";
import {Box, Center, Flex} from "@chakra-ui/react";
import { SearcherContext } from "../../context";
import InvasiveSpecieModal from "../../components/detailModal";


function Searcher() {
const context = React.useContext(SearcherContext);

  return (
      <>
        <Center bg='purple.500' h='100px' py='125px' color='white'>
          <Flex direction='column'>
            <Center>
              <h1>
                Especies Invasoras
              </h1>
            </Center>
            <h2>Visualizador de especies invasoras usando <a href="https://api-colombia.com" target="_blank" rel="noopener noreferrer">API Colombia</a></h2>
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
