import { useState, FC, useEffect, ChangeEvent } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
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
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input type='text' placeholder='Buscar' value={search} onChange={handleInputChange}/>
    </InputGroup>
  );
}

export default SearchBar;
