import { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Grid,
  Center,
  Button,
  Skeleton,
  useMediaQuery,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Flag from "../../components/flag/Flag";
import SearchBar from "../../components/searchBar";
import FilterBar from "../../components/filterBar/FilterBar";
import CardList from "../../components/cardList";
import { useSpecies, searchSpecies } from "../../hooks/useSpecies";
import { parseFilters, filterAndSort, isDefaultFilters, DEFAULT_FILTERS, applyFiltersToParams } from "../../utils/filters";
import { exampleDepartmentCount } from "../../data/speciesExtra";
import { useT } from "../../i18n/lang";
import Seo from "../../components/seo/Seo";
import background from "../../utils/images/background.jpg";

const PAGE = 9;

function Stat({ n, label }: { n: number | string; label: string }) {
  return (
    <Box>
      <Text fontFamily="heading" fontWeight={800} fontSize="30px" lineHeight={1}>
        {n}
      </Text>
      <Text fontFamily="body" fontWeight={500} fontSize="12px" color="brand.200" mt="4px">
        {label}
      </Text>
    </Box>
  );
}

export default function Home() {
  const t = useT();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { all, loading } = useSpecies();

  const search = params.get("search") ?? "";
  const legacyId = params.get("id");
  const filters = parseFilters(params);

  const [largeWindow] = useMediaQuery("(min-width: 1100px)");
  const [mediumWindow] = useMediaQuery("(min-width: 800px)");
  const reduceMotion = usePrefersReducedMotion();

  // Redirección de enlaces antiguos /?id=X a la ruta de ficha.
  useEffect(() => {
    if (legacyId) {
      const suffix = search ? `?search=${encodeURIComponent(search)}` : "";
      navigate(`/especie/${legacyId}${suffix}`, { replace: true });
    }
  }, [legacyId, search, navigate]);

  const columns = largeWindow ? "repeat(3, 1fr)" : mediumWindow ? "repeat(2, 1fr)" : "1fr";

  const results = useMemo(
    () => filterAndSort(searchSpecies(all, search), filters),
    [all, search, filters]
  );

  const stats = useMemo(
    () => ({
      species: all.length,
      high: all.filter((s) => s.riskLevel >= 2).length,
      departments: exampleDepartmentCount(),
    }),
    [all]
  );

  // Scroll infinito en cliente.
  const [visible, setVisible] = useState(PAGE);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(PAGE);
  }, [search, params]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible((v) => (v < results.length ? v + PAGE : v));
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [results.length]);

  const shown = results.slice(0, visible);
  const hasMore = visible < results.length;
  const searching = search.trim().length > 0;

  return (
    <>
      <Seo title={t.seo.homeTitle} description={t.seo.homeDesc} path="/" />
      {/* Hero */}
      <Box
        color="white"
        px={{ base: "18px", md: "40px" }}
        py={{ base: "28px", md: "56px" }}
        bgImage={`linear-gradient(rgba(30,32,23,.6), rgba(54,60,49,.82)), url(${background})`}
        bgSize="cover"
        bgPosition="center"
      >
        <Box maxW="760px">
          <HStack
            spacing="12px"
            bg="rgba(254,238,228,.14)"
            borderRadius="999px"
            pl="10px"
            pr="17px"
            py="8px"
            mb="14px"
            display="inline-flex"
          >
            <Flag width={26} height={18} ring />
            <Text
              fontFamily="body"
              fontWeight={700}
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing=".12em"
              color="brand.200"
            >
              {t.hero.eyebrow}
            </Text>
          </HStack>

          <Heading
            as="h1"
            fontFamily="heading"
            fontWeight={800}
            fontSize={{ base: "30px", md: "46px" }}
            lineHeight={{ base: "1.1", md: "1.08" }}
            letterSpacing="-1px"
            textShadow="0 2px 10px rgba(0,0,0,.35)"
            mb="12px"
          >
            {t.hero.title}
          </Heading>

          <Text fontFamily="body" fontSize={{ base: "15px", md: "17px" }} lineHeight="1.55" opacity={0.94} maxW="600px" mb="26px">
            {t.hero.subtitle}
          </Text>

          <Flex gap="12px" maxW="660px" direction={{ base: "column", sm: "row" }}>
            <Box flex="1">
              <SearchBar value={search} variant="hero" placeholder={t.hero.searchPlaceholder} />
            </Box>
            <Button
              onClick={() => navigate("/mapa")}
              bg="sand"
              color="brand.900"
              height="56px"
              px="22px"
              borderRadius="16px"
              fontFamily="body"
              fontWeight={700}
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing=".04em"
              flexShrink={0}
              _hover={{ bg: "brand.100" }}
            >
              {t.hero.viewMap}
            </Button>
          </Flex>

          <HStack spacing="34px" mt="30px">
            <Stat n={stats.species || "—"} label={t.stats.species} />
            <Stat n={stats.high || "—"} label={t.stats.highRisk} />
            <Stat n={stats.departments} label={t.stats.departments} />
          </HStack>
        </Box>
      </Box>

      <FilterBar />

      {/* Resultados */}
      <Box px={{ base: "16px", md: "40px" }} pt="28px" pb="44px">
        <Flex align="baseline" justify="space-between" mb="18px" gap="12px">
          <Heading as="h2" fontFamily="heading" fontWeight={700} fontSize="20px" color="brand.900">
            {t.results.count(searching || !isDefaultFilters(filters) ? results.length : stats.species)}
          </Heading>
          <Text fontFamily="body" fontSize="13px" color="brand.600" display={{ base: "none", sm: "block" }}>
            {t.results.loadMore}
          </Text>
        </Flex>

        {loading ? (
          <Grid templateColumns={columns} gap="24px">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height="520px" borderRadius="22px" />
            ))}
          </Grid>
        ) : results.length === 0 ? (
          <Center flexDirection="column" py="60px" gap="16px">
            <Text fontFamily="body" fontSize="16px" color="brand.700">
              {searching ? t.results.emptySearch : t.results.empty}
            </Text>
            <Button
              onClick={() => setParams(applyFiltersToParams(new URLSearchParams(), DEFAULT_FILTERS))}
              variant="outline"
              borderColor="brand.200"
              color="brand.700"
              borderRadius="11px"
              _hover={{ bg: "brand.100" }}
            >
              {t.results.clear}
            </Button>
          </Center>
        ) : (
          <>
            <CardList cards={shown} columns={columns} />
            <Box ref={sentinel} height="1px" aria-hidden="true" />
            {hasMore && (
              <Center pt="24px">
                <Skeleton height="8px" width="120px" borderRadius="999px" startColor="brand.100" endColor="brand.200" speed={reduceMotion ? 0 : 0.8} />
              </Center>
            )}
          </>
        )}
      </Box>
    </>
  );
}
