import { useMemo, useState } from "react";
import { Box, Grid, Flex, Heading, Text, HStack, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ColombiaMap from "../../components/colombiaMap/ColombiaMap";
import LangToggle from "../../components/langToggle/LangToggle";
import { OCCURRENCES, type Occurrence } from "../../data/occurrences";
import { getSpeciesExtra, type SpeciesKind, type HabitatKey } from "../../data/speciesExtra";
import { riskColorToken, type RiskKey } from "../../utils/risk";
import { useT } from "../../i18n/lang";

const RISK_ORDER: RiskKey[] = ["high", "medium", "low"];

interface EnrichedOccurrence extends Occurrence {
  kind: SpeciesKind;
  habitatKey: HabitatKey;
}

function enrichOccurrence(o: Occurrence): EnrichedOccurrence {
  const extra = getSpeciesExtra({ id: o.specieId ?? -1, name: o.name, scientificName: o.scientificName, impact: "" });
  return { ...o, kind: extra.kind, habitatKey: extra.habitatKey };
}

export default function MapaPage() {
  const t = useT();
  const navigate = useNavigate();

  const [risks, setRisks] = useState<RiskKey[]>(["high", "medium", "low"]);
  const [kind, setKind] = useState<"all" | SpeciesKind>("all");
  const [aquatic, setAquatic] = useState(false);

  const all = useMemo(() => OCCURRENCES.map(enrichOccurrence), []);

  const filtered = useMemo(
    () =>
      all.filter((o) => {
        if (!risks.includes(o.risk)) return false;
        if (kind !== "all" && o.kind !== kind) return false;
        if (aquatic && !["acuatico", "marino", "semiacuatico"].includes(o.habitatKey)) return false;
        return true;
      }),
    [all, risks, kind, aquatic]
  );

  const riskLabel = (r: RiskKey) => (r === "high" ? t.risk.highShort : r === "medium" ? t.risk.mediumShort : t.risk.lowShort);

  const openSpecie = (o: Occurrence) => {
    if (o.specieId) navigate(`/especie/${o.specieId}`);
    else navigate(`/?search=${encodeURIComponent(o.name)}`);
  };

  const toggleRisk = (r: RiskKey) =>
    setRisks((prev) => (prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]));

  // Lista deduplicada por nombre.
  const uniqueList = useMemo(() => {
    const seen = new Set<string>();
    return filtered.filter((o) => (seen.has(o.name) ? false : (seen.add(o.name), true)));
  }, [filtered]);

  const SideChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <Button
      onClick={onClick}
      aria-pressed={active}
      variant="unstyled"
      height="auto"
      minW="auto"
      border="1px solid"
      borderColor={active ? "brand.700" : "brand.200"}
      bg={active ? "brand.700" : "transparent"}
      color={active ? "sand" : "brand.700"}
      borderRadius="999px"
      px="13px"
      py="7px"
      fontFamily="body"
      fontWeight={500}
      fontSize="13px"
      lineHeight={1.2}
    >
      {label}
    </Button>
  );

  return (
    <Box maxW="1180px" mx="auto" px={{ base: "16px", md: "24px" }} py={{ base: "24px", md: "28px" }} pb="36px">
      <Flex align="flex-end" justify="space-between" gap="24px" mb="18px" wrap="wrap">
        <Box>
          <Heading as="h1" fontFamily="heading" fontWeight={800} fontSize="30px" letterSpacing="-.5px" color="brand.900">
            {t.map.title}
          </Heading>
          <Text fontFamily="body" fontSize="14px" lineHeight="1.5" color="brand.600" maxW="520px" mt="6px">
            {t.map.subtitle}
          </Text>
        </Box>
        <LangToggle variant="light" />
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "1fr 340px" }} gap="22px" alignItems="start">
        {/* Mapa */}
        <Box position="relative" bg="sand" borderRadius="25px" overflow="hidden" boxShadow="0 10px 25px -10px rgba(30,32,23,.3)">
          <ColombiaMap occurrences={filtered} onPointClick={openSpecie} />
          <Box position="absolute" left="20px" bottom="20px" bg="rgba(254,238,228,.94)" borderRadius="16px" p="14px 16px" boxShadow="0 6px 18px -8px rgba(30,32,23,.4)">
            <Text fontFamily="body" fontWeight={700} fontSize="11px" textTransform="uppercase" letterSpacing=".08em" color="brand.600" mb="10px">
              {t.map.legendTitle}
            </Text>
            {RISK_ORDER.map((r) => (
              <Flex
                key={r}
                as="button"
                onClick={() => toggleRisk(r)}
                align="center"
                gap="9px"
                py="3px"
                cursor="pointer"
                opacity={risks.includes(r) ? 1 : 0.4}
                width="100%"
              >
                <Box w="13px" h="13px" borderRadius="999px" bg={riskColorToken(r === "high" ? 2 : r === "medium" ? 1 : 0)} flex="none" />
                <Text fontFamily="body" fontWeight={500} fontSize="13px" color="brand.900">
                  {riskLabel(r)}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>

        {/* Panel lateral */}
        <Box bg="sand" borderRadius="25px" p="20px" boxShadow="0 10px 25px -10px rgba(30,32,23,.3)">
          <Text fontFamily="body" fontWeight={700} fontSize="11px" textTransform="uppercase" letterSpacing=".08em" color="brand.600" mb="12px">
            {t.map.filter}
          </Text>
          <HStack spacing="8px" mb="20px" wrap="wrap">
            <SideChip label={t.filters.all} active={kind === "all" && !aquatic} onClick={() => { setKind("all"); setAquatic(false); }} />
            <SideChip label={t.filters.animals} active={kind === "animal"} onClick={() => setKind(kind === "animal" ? "all" : "animal")} />
            <SideChip label={t.filters.plants} active={kind === "plant"} onClick={() => setKind(kind === "plant" ? "all" : "plant")} />
            <SideChip label={t.filters.aquatic} active={aquatic} onClick={() => setAquatic(!aquatic)} />
          </HStack>

          <Text fontFamily="body" fontWeight={700} fontSize="11px" textTransform="uppercase" letterSpacing=".08em" color="brand.600" mb="8px">
            {t.map.onMap}
          </Text>
          <Text fontFamily="body" fontSize="12px" color="brand.600" mb="14px">
            {t.map.count(uniqueList.length, filtered.length)}
          </Text>

          <Box>
            {uniqueList.map((o, i) => (
              <Flex
                key={o.name + i}
                as="button"
                onClick={() => openSpecie(o)}
                align="center"
                gap="12px"
                py="10px"
                width="100%"
                textAlign="left"
                borderTop={i === 0 ? "none" : "1px solid rgba(30,32,23,.14)"}
                cursor="pointer"
                _hover={{ opacity: 0.85 }}
              >
                <Box w="52px" h="52px" borderRadius="12px" flex="none" bg="brand.100" backgroundImage="repeating-linear-gradient(135deg,rgba(30,32,23,.13) 0 5px,rgba(30,32,23,.04) 5px 10px)" />
                <Box flex="1" minW={0}>
                  <Text fontFamily="heading" fontWeight={600} fontSize="15px" lineHeight="1.2" color="brand.900" noOfLines={1}>
                    {o.name}
                  </Text>
                  <Text fontFamily="body" fontStyle="italic" fontSize="12px" color="brand.600" noOfLines={1}>
                    {o.scientificName}
                  </Text>
                </Box>
                <Text
                  as="span"
                  ml="auto"
                  flex="none"
                  fontFamily="body"
                  fontWeight={700}
                  fontSize="10px"
                  textTransform="uppercase"
                  letterSpacing=".04em"
                  color="white"
                  bg={riskColorToken(o.risk === "high" ? 2 : o.risk === "medium" ? 1 : 0)}
                  px="8px"
                  py="4px"
                  borderRadius="6px"
                  whiteSpace="nowrap"
                >
                  {riskLabel(o.risk)}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
      </Grid>

      <Text as="footer" display="block" mt="16px" fontFamily="body" fontSize="12px" color="brand.600">
        {t.map.footer}
      </Text>
    </Box>
  );
}
