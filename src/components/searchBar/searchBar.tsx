import * as React from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

function SearchBar() {
  return (
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input type='text' placeholder='Buscar' />
      </InputGroup>
  );
}

export default SearchBar;
