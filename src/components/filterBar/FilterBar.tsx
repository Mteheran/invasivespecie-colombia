import { Flex, HStack, Text, Button, Select, Spacer, Box } from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useT } from '../../i18n/lang';
import {
  parseFilters,
  applyFiltersToParams,
  isDefaultFilters,
  type Filters,
  type SortKey,
} from '../../utils/filters';

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      aria-pressed={active}
      variant="unstyled"
      height="auto"
      minW="auto"
      display="inline-flex"
      alignItems="center"
      whiteSpace="nowrap"
      border="1px solid"
      borderColor={active ? 'brand.700' : 'brand.200'}
      bg={active ? 'brand.700' : 'transparent'}
      color={active ? 'sand' : 'brand.700'}
      borderRadius="999px"
      px="14px"
      py="7px"
      fontFamily="body"
      fontWeight={500}
      fontSize="13px"
      lineHeight={1.2}
      _hover={{ borderColor: 'brand.700' }}
    >
      {label}
    </Button>
  );
}

export default function FilterBar() {
  const t = useT();
  const [params, setParams] = useSearchParams();
  const filters = parseFilters(params);

  const update = (next: Filters) => {
    setParams(applyFiltersToParams(params, next), { replace: false });
  };

  const toggleKind = (kind: 'animal' | 'plant') =>
    update({ ...filters, kind: filters.kind === kind ? 'all' : kind });

  const toggleHabitat = (h: 'aquatic' | 'andean') =>
    update({
      ...filters,
      habitat: filters.habitat.includes(h)
        ? filters.habitat.filter((x) => x !== h)
        : [...filters.habitat, h],
    });

  return (
    <Flex
      position="sticky"
      top="0"
      zIndex={20}
      bg="sand"
      align="center"
      gap="10px"
      px={{ base: '16px', md: '40px' }}
      py="16px"
      borderBottom="1px solid rgba(30,32,23,.12)"
      overflowX={{ base: 'auto', md: 'visible' }}
      sx={{ '::-webkit-scrollbar': { display: 'none' } }}
    >
      <Text
        fontFamily="body"
        fontWeight={700}
        fontSize="11px"
        textTransform="uppercase"
        letterSpacing=".08em"
        color="brand.600"
        mr="6px"
        flex="none"
      >
        {t.filters.label}
      </Text>

      <Chip label={t.filters.all} active={isDefaultFilters(filters)} onClick={() => update({ ...filters, kind: 'all', highRiskOnly: false, habitat: [] })} />
      <Chip label={t.filters.animals} active={filters.kind === 'animal'} onClick={() => toggleKind('animal')} />
      <Chip label={t.filters.plants} active={filters.kind === 'plant'} onClick={() => toggleKind('plant')} />
      <Chip label={t.filters.highRisk} active={filters.highRiskOnly} onClick={() => update({ ...filters, highRiskOnly: !filters.highRiskOnly })} />
      <Chip label={t.filters.aquatic} active={filters.habitat.includes('aquatic')} onClick={() => toggleHabitat('aquatic')} />
      <Chip label={t.filters.andean} active={filters.habitat.includes('andean')} onClick={() => toggleHabitat('andean')} />

      <Spacer display={{ base: 'none', md: 'block' }} />

      <HStack spacing="8px" flex="none">
        <Text fontFamily="body" fontSize="13px" color="brand.600" display={{ base: 'none', sm: 'block' }}>
          {t.filters.sortBy}
        </Text>
        <Box>
          <Select
            value={filters.sort}
            onChange={(e) => update({ ...filters, sort: e.target.value as SortKey })}
            size="sm"
            bg="white"
            border="1px solid"
            borderColor="brand.200"
            borderRadius="10px"
            fontFamily="body"
            fontSize="13px"
            color="brand.900"
            width="auto"
          >
            <option value="risk_desc">{t.filters.sortRiskDesc}</option>
            <option value="risk_asc">{t.filters.sortRiskAsc}</option>
            <option value="name_asc">{t.filters.sortNameAsc}</option>
          </Select>
        </Box>
      </HStack>
    </Flex>
  );
}
