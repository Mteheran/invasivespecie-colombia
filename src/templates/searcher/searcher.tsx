import * as React from "react";
import SearchBar from "../../components/searchBar";
import CardList from "../../components/cardList";
import { Box } from "@chakra-ui/react";
import { SearcherContext } from "../../context";
import InvasiveSpecieModal from "../../components/detailModal";


function Searcher() {
const context = React.useContext(SearcherContext);

  return (
    <>
    <Box as="header">
      <SearchBar value={context.searchValue}/>
    </Box>
    <Box as="main">
      <CardList cards={context.itemList}/>
      <InvasiveSpecieModal isOpen={context.isModalOpen} data={context.itemDetail}
      setIsModalOpen={context.setIsModalOpen}></InvasiveSpecieModal>
    </Box>
    </>
  );
}

export default Searcher;
