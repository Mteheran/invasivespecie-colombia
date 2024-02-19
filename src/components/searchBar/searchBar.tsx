import { useState, FC, useEffect, ChangeEvent } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useDebounce } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

interface SearchComponentProps {
  value: string;
}

const SearchBar: FC<SearchComponentProps> = ({ value }) => {
  const [search, setSearch] = useState(value);
  const debouncedSearchTerm = useDebounce<string>(search, 500);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate(`?search=${search}`);
    }
    else {
      navigate(`#`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <InputGroup minWidth='250px'>
      <Input type='text' placeholder='Buscar' size='lg' value={search} onChange={handleInputChange} bg='white' color="black" borderRadius="20px"/>
      <InputRightElement pointerEvents='none'>
        <SearchIcon color="black" width="25px" mt="10px" mr="10px" />
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchBar;
