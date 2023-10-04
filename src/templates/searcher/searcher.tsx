import * as React from "react";
import SearchBar from "../../components/searchBar";
import CardList from "../../components/cardList";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InvasiveSpecies from '../../services/invasiveSpecies'
import IinvasiveSpecie from "../../interfaces/IinvasiveSpecie";

function Searcher() {

  const [listOfInvasiveSpecies, setListOfInvasiveSpecies] = useState<IinvasiveSpecie[]>();

  useEffect(() => {
    async function CallAsyncApi() {
      InvasiveSpecies()
      .then(data  => {
        setListOfInvasiveSpecies(data as IinvasiveSpecie[]);
      })
      .catch(error => console.error(error));
    } 
    CallAsyncApi();
  }, []);


  return (
    <>
    <Box as="header">
      <SearchBar/>
    </Box>
    <Box as="main">
      { listOfInvasiveSpecies && listOfInvasiveSpecies.length > 0  &&
      <CardList cards={listOfInvasiveSpecies}/>
      }
    </Box>
    </>
  );
}

export default Searcher;
