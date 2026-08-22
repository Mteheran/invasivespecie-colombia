import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Grid,
  Flex,
  HStack,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  Center,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { fetchInvasiveSpecie, enrichSpecie, type EnrichedSpecie } from "../../services/invasiveSpecie";
import { getCachedSpecieById } from "../../hooks/useSpecies";
import ImageContainer from "../../components/imageContainer";
import RiskBadge from "../../components/riskBadge/RiskBadge";
import Chip from "../../components/chip/Chip";
import IfYouFind from "../../components/ifYouFind/IfYouFind";
import ShareModal from "../../components/shareModal";
import ColombiaMap from "../../components/colombiaMap/ColombiaMap";
import { OCCURRENCES } from "../../data/occurrences";
import { kindLabel } from "../../data/speciesExtra";
import { useLang, useT } from "../../i18n/lang";
import Seo from "../../components/seo/Seo";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Box borderTop="1px solid rgba(30,32,23,.14)" pt="18px" mt="18px" _first={{ borderTop: "none", mt: 0, pt: 0 }}>
      <Heading as="h2" fontFamily="body" fontWeight={700} fontSize="13px" textTransform="uppercase" letterSpacing=".08em" color="brand.600" mb="7px">
        {label}
      </Heading>
      <Text fontFamily="body" fontSize="16px" lineHeight="1.6" color="brand.900" sx={{ textWrap: "pretty" }}>
        {children}
      </Text>
    </Box>
  );
}

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <Flex justify="space-between" gap="18px" py="9px" borderTop="1px solid rgba(30,32,23,.12)" _first={{ borderTop: "none" }}>
      <Text fontFamily="body" fontSize="14px" color="brand.600">
        {k}
      </Text>
      <Text fontFamily="body" fontSize="14px" fontWeight={600} color="brand.900" textAlign="right">
        {v}
      </Text>
    </Flex>
  );
}

export default function EspeciePage() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { lang } = useLang();
  const t = useT();
  const toast = useToast();

  const [specie, setSpecie] = useState<EnrichedSpecie | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [shareOpen, setShareOpen] = useState(false);

  const search = params.get("search");
  const backHref = search ? `/?search=${encodeURIComponent(search)}` : "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let active = true;

    // 1) Usa el caché en memoria si la especie ya está cargada (sin llamar a la API).
    const cached = getCachedSpecieById(Number(id));
    if (cached) {
      setSpecie(cached);
      setStatus("ready");
      return;
    }

    // 2) Respaldo para enlaces directos con caché vacío: una sola llamada por id.
    setStatus("loading");
    fetchInvasiveSpecie(id)
      .then((data) => {
        if (!active) return;
        if (data && data.id > 0) {
          setSpecie(enrichSpecie(data));
          setStatus("ready");
        } else {
          setStatus("error");
        }
      })
      .catch(() => active && setStatus("error"));
    return () => {
      active = false;
    };
  }, [id]);

  const shareUrl = useMemo(() => new URL(document.URL).origin + "/especie/" + id, [id]);
  const mapPoints = useMemo(
    () => OCCURRENCES.filter((o) => o.specieId === Number(id)),
    [id]
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: t.sheet.copied, status: "success", duration: 1800, isClosable: true });
    } catch {
      /* ignore */
    }
  };

  if (status === "loading") {
    return (
      <Center py="120px">
        <Spinner size="xl" color="brand.500" thickness="3px" />
      </Center>
    );
  }

  if (status === "error" || !specie) {
    return (
      <Center flexDirection="column" py="120px" gap="16px" px="24px">
        <Text fontFamily="body" fontSize="18px" color="brand.700">
          {t.sheet.notFound}
        </Text>
        <Button onClick={() => navigate(backHref)} bg="brand.700" color="sand" borderRadius="11px" _hover={{ bg: "brand.800" }}>
          {t.sheet.back}
        </Button>
      </Center>
    );
  }

  const e = specie.extra;
  const facts: { k: string; v: string }[] = [
    { k: t.sheet.category, v: kindLabel(e.kind, lang) },
    { k: t.sheet.origin, v: e.origin ?? t.sheet.unknown },
    { k: t.sheet.introduced, v: e.introducedYear ?? t.sheet.unknown },
    { k: t.sheet.habitat, v: e.habitat },
    { k: t.sheet.departments, v: e.departments ?? t.sheet.unknown },
    { k: t.sheet.source, v: "API Colombia" },
  ];

  const riskTxt = specie.riskLevel >= 2 ? t.risk.high : specie.riskLevel === 1 ? t.risk.medium : t.risk.low;
  const seoDesc = `${specie.name} (${specie.scientificName}) · ${riskTxt}. ${specie.impact}`.slice(0, 160);

  return (
    <>
      <Seo
        title={`${specie.name} (${specie.scientificName}) · ${t.seo.titleSuffix}`}
        description={seoDesc}
        path={`/especie/${specie.id}`}
        image={specie.urlImage || undefined}
        type="article"
      />
      {/* Migas de pan */}
      <Box px={{ base: "16px", md: "40px" }} pt="18px" fontFamily="body" fontSize="13px" color="brand.600">
        <ChakraLink as={RouterLink} to="/" _hover={{ color: "brand.900" }}>
          {t.sheet.home}
        </ChakraLink>
        {" · "}
        <ChakraLink as={RouterLink} to={`/?kind=${e.kind}`} _hover={{ color: "brand.900" }}>
          {kindLabel(e.kind, lang)}
        </ChakraLink>
        {" · "}
        <Box as="span" color="brand.900" fontWeight={600}>
          {specie.name}
        </Box>
      </Box>

      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 480px" }}
        gap={{ base: "24px", lg: "34px" }}
        px={{ base: "16px", md: "40px" }}
        py={{ base: "20px", md: "20px" }}
        pb="40px"
        alignItems="start"
      >
        {/* Columna izquierda */}
        <Box order={{ base: 2, lg: 1 }}>
          <HStack spacing="12px" mb="12px" flexWrap="wrap">
            <RiskBadge level={specie.riskLevel} size="lg" />
            <Chip size="md">{kindLabel(e.kind, lang)}</Chip>
            <Chip size="md">{e.habitat}</Chip>
          </HStack>

          <Heading as="h1" fontFamily="heading" fontWeight={800} fontSize={{ base: "30px", md: "44px" }} lineHeight={{ base: "1.1", md: "1.05" }} letterSpacing="-1px" color="brand.900" mb="4px">
            {specie.name}
          </Heading>
          <Text fontFamily="body" fontStyle="italic" fontWeight={500} fontSize={{ base: "15px", md: "20px" }} color="brand.600" mb="22px">
            {specie.scientificName}
          </Text>

          {lang === "en" && (
            <Text fontFamily="body" fontSize="12px" color="brand.600" mb="10px" fontStyle="italic">
              {t.sheet.contentInSpanish}
            </Text>
          )}

          <Box bg="sand" borderRadius="20px" p={{ base: "16px 18px", md: "22px 24px" }} boxShadow="0 10px 25px -14px rgba(30,32,23,.4)">
            <Section label={t.sheet.commonNames}>{specie.commonNames}</Section>
            <Section label={t.sheet.impact}>{specie.impact}</Section>
            {specie.manage && <Section label={t.sheet.manage}>{specie.manage}</Section>}
            {e.arrival && <Section label={t.sheet.arrival}>{e.arrival}</Section>}
          </Box>

          <Box mt="22px">
            <IfYouFind />
          </Box>
        </Box>

        {/* Columna derecha */}
        <Flex direction="column" gap="18px" order={{ base: 1, lg: 2 }}>
          <Box borderRadius="22px" overflow="hidden" boxShadow="0 12px 30px -14px rgba(30,32,23,.45)">
            <ImageContainer imgURL={specie.urlImage} imgAlt={specie.name} aspectRatio={4 / 3} rounded={false} />
          </Box>

          <Box bg="sand" borderRadius="20px" p="20px 22px">
            <Heading as="h2" fontFamily="body" fontWeight={700} fontSize="13px" textTransform="uppercase" letterSpacing=".08em" color="brand.600" mb="14px">
              {t.sheet.quickFacts}
            </Heading>
            {facts.map((f) => (
              <Fact key={f.k} k={f.k} v={f.v} />
            ))}
            <HStack spacing="10px" mt="16px">
              <Button flex="1" onClick={() => setShareOpen(true)} variant="outline" borderColor="brand.200" color="brand.700" borderRadius="11px" py="11px" height="auto" fontFamily="body" fontWeight={700} fontSize="12px" textTransform="uppercase" letterSpacing=".05em" _hover={{ bg: "brand.100" }}>
                {t.sheet.share}
              </Button>
              <Button flex="1" onClick={copyLink} variant="outline" borderColor="brand.200" color="brand.700" borderRadius="11px" py="11px" height="auto" fontFamily="body" fontWeight={700} fontSize="12px" textTransform="uppercase" letterSpacing=".05em" _hover={{ bg: "brand.100" }}>
                {t.sheet.copyLink}
              </Button>
            </HStack>
          </Box>

          <Box bg="sand" borderRadius="20px" p="20px 22px">
            <Heading as="h2" fontFamily="body" fontWeight={700} fontSize="13px" textTransform="uppercase" letterSpacing=".08em" color="brand.600" mb="12px">
              {t.sheet.whereReported}
            </Heading>
            <Box borderRadius="14px" overflow="hidden" bg="#eef1e9">
              {mapPoints.length > 0 ? (
                <ColombiaMap occurrences={mapPoints} interactive={false} />
              ) : (
                <Center height="200px" px="16px">
                  <Text fontFamily="body" fontSize="13px" color="brand.600" textAlign="center">
                    {t.map.footer}
                  </Text>
                </Center>
              )}
            </Box>
            <ChakraLink as={RouterLink} to="/mapa" display="inline-block" mt="12px" fontFamily="body" fontWeight={600} fontSize="13px" color="brand.700" _hover={{ color: "brand.900" }}>
              {t.sheet.openFullMap}
            </ChakraLink>
          </Box>
        </Flex>
      </Grid>

      <ShareModal isOpen={shareOpen} setIsModalOpen={setShareOpen} shareURL={shareUrl} speciesName={specie.name} />
    </>
  );
}
