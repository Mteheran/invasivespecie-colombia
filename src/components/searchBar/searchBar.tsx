import { useState, FC, useEffect, ChangeEvent } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useDebounce } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

type SearchVariant = 'hero' | 'nav';

interface SearchComponentProps {
  value: string;
  variant?: SearchVariant;
  placeholder?: string;
}

const SearchBar: FC<SearchComponentProps> = ({ value, variant = 'hero', placeholder = 'Buscar' }) => {
  const [search, setSearch] = useState(value);
  const debouncedSearchTerm = useDebounce<string>(search, 500);
  const navigate = useNavigate();

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate(`/?search=${encodeURIComponent(debouncedSearchTerm)}`);
    } else if (debouncedSearchTerm === '' && value !== '') {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const isNav = variant === 'nav';

  return (
    <InputGroup minWidth={isNav ? '200px' : '250px'} width="100%">
      <InputLeftElement
        pointerEvents="none"
        height={isNav ? '38px' : '56px'}
        pl={isNav ? '12px' : '18px'}
      >
        <SearchIcon color={isNav ? 'brand.300' : 'brand.600'} boxSize={isNav ? '16px' : '20px'} />
      </InputLeftElement>
      <Input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={handleInputChange}
        height={isNav ? '38px' : '56px'}
        fontSize={isNav ? '13px' : '17px'}
        borderRadius={isNav ? '12px' : '16px'}
        pl={isNav ? '38px' : '50px'}
        bg={isNav ? 'rgba(254,238,228,.12)' : 'white'}
        color={isNav ? 'sand' : 'brand.900'}
        border={isNav ? '1px solid rgba(254,238,228,.22)' : 'none'}
        _placeholder={{ color: isNav ? 'brand.300' : '#8b9080' }}
        _hover={{ borderColor: isNav ? 'rgba(254,238,228,.35)' : undefined }}
        _focusVisible={{
          borderColor: isNav ? 'rgba(254,238,228,.5)' : 'brand.300',
          boxShadow: 'none',
        }}
      />
    </InputGroup>
  );
};

export default SearchBar;
