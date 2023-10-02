import * as React from "react";
import SearchBar from "../../components/searchBar";
import CardList from "../../components/cardList";
import { Box } from "@chakra-ui/react";

function Main() {
  return (
    <>
    <Box as="header">
      <SearchBar/>
    </Box>
    <Box as="main">
      <CardList cards={[{ name: "1"}, {name: "2"}, {name: "3"}]}/>
    </Box>
    </>
  );
}

export default Main;
