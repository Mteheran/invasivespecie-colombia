import { Flex, HStack, Box, Text, Spacer, Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import LangToggle from '../langToggle/LangToggle';
import SearchBar from '../searchBar';
import { useT } from '../../i18n/lang';

interface NavBarProps {
  /** Muestra un buscador compacto dentro de la nav (fichas/mapa). */
  showSearch?: boolean;
  searchValue?: string;
}

function Logo() {
  const t = useT();
  return (
    <HStack as={RouterLink} to="/" spacing="10px" _hover={{ textDecoration: 'none' }} flex="none">
      <Box
        w="26px"
        h="26px"
        borderRadius="8px"
        bg="brand.500"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex="none"
      >
        <Text fontFamily="heading" fontWeight={800} fontSize="13px" color="sand">
          EI
        </Text>
      </Box>
      <Text
        fontFamily="heading"
        fontWeight={700}
        fontSize={{ base: '13px', md: '15px' }}
        letterSpacing="-.2px"
        color="sand"
        noOfLines={1}
      >
        <Box as="span" display={{ base: 'none', lg: 'inline' }}>
          {t.nav.brand}
        </Box>
        <Box as="span" display={{ base: 'inline', lg: 'none' }}>
          {t.nav.brandShort}
        </Box>
      </Text>
    </HStack>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <ChakraLink
      as={RouterLink}
      to={to}
      fontFamily="body"
      fontWeight={500}
      fontSize="13px"
      color={active ? 'sand' : 'brand.200'}
      _hover={{ color: 'sand', textDecoration: 'none' }}
    >
      {children}
    </ChakraLink>
  );
}

export default function NavBar({ showSearch = false, searchValue = '' }: NavBarProps) {
  const t = useT();

  return (
    <Flex
      as="header"
      bg="brand.900"
      color="sand"
      align="center"
      gap={{ base: '10px', md: '20px' }}
      px={{ base: '16px', md: '40px' }}
      py={{ base: '12px', md: '14px' }}
    >
      <Logo />
      <Spacer />

      {showSearch && (
        <Box width={{ base: 'none', md: '300px' }} display={{ base: 'none', md: 'block' }}>
          <SearchBar value={searchValue} variant="nav" placeholder={t.nav.searchPlaceholder} />
        </Box>
      )}

      <HStack spacing="20px" display={{ base: 'none', md: 'flex' }}>
        <NavLink to="/mapa">{t.nav.map}</NavLink>
        <NavLink to="/que-hacer">{t.nav.whatToDo}</NavLink>
        <NavLink to="/acerca">{t.nav.about}</NavLink>
      </HStack>

      <LangToggle variant="dark" />
    </Flex>
  );
}
