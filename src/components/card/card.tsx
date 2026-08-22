import { FC, useState } from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  Button,
  IconButton,
  usePrefersReducedMotion,
} from '@chakra-ui/react';
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import { FiShare2 } from "react-icons/fi";
import { EnrichedSpecie } from "../../services/invasiveSpecie";
import ImageContainer from "../imageContainer";
import ShareModal from "../shareModal";
import RiskBadge from "../riskBadge/RiskBadge";
import Chip from "../chip/Chip";
import { kindLabel } from "../../data/speciesExtra";
import { SITE_URL } from "../../utils/constants";
import { useLang, useT } from "../../i18n/lang";

interface CardProps {
  card: EnrichedSpecie;
}

const Card: FC<CardProps> = ({ card }) => {
  const [params] = useSearchParams();
  const { lang } = useLang();
  const t = useT();
  const [isShareOpen, setIsShareOpen] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const search = params.get("search");
  const shareUrl = `${SITE_URL}/especie/${card.id}`;
  const sheetHref = `/especie/${card.id}${search ? `?search=${encodeURIComponent(search)}` : ''}`;

  return (
    <Box
      bg="sand"
      borderRadius="22px"
      overflow="hidden"
      boxShadow="0 10px 25px -12px rgba(30,32,23,.4)"
      display="flex"
      flexDirection="column"
      transition="transform .25s ease, box-shadow .25s ease"
      _hover={
        reduceMotion
          ? { boxShadow: '0 16px 32px -12px rgba(30,32,23,.5)' }
          : { transform: 'translateY(-4px)', boxShadow: '0 16px 32px -12px rgba(30,32,23,.5)' }
      }
    >
      <Box position="relative">
        <ImageContainer imgURL={card.urlImage} imgAlt={card.name} aspectRatio={16 / 11} rounded={false} />
        <Box position="absolute" top="14px" left="14px" zIndex={2}>
          <RiskBadge level={card.riskLevel} size="md" withShadow />
        </Box>
      </Box>

      <Box p="16px 18px 18px" display="flex" flexDirection="column" flex="1">
        <Heading
          as={RouterLink}
          to={sheetHref}
          fontFamily="heading"
          fontWeight={700}
          fontSize="22px"
          lineHeight="1.15"
          color="brand.900"
          mb="3px"
          _hover={{ textDecoration: 'underline' }}
        >
          {card.name}
        </Heading>
        <Text fontFamily="body" fontStyle="italic" fontWeight={500} fontSize="13px" color="brand.600" mb="12px">
          {card.scientificName}
        </Text>

        <HStack spacing="7px" mb="14px">
          <Chip>{kindLabel(card.extra.kind, lang)}</Chip>
          <Chip>{card.extra.habitat}</Chip>
        </HStack>

        <Text fontFamily="body" fontWeight={400} fontSize="13.5px" lineHeight="1.55" color="brand.700" flex="1" mb="18px" noOfLines={3}>
          {card.impact}
        </Text>

        <HStack spacing="10px" borderTop="1px solid rgba(30,32,23,.14)" pt="14px">
          <Button
            as={RouterLink}
            to={sheetHref}
            flex="1"
            bg="brand.700"
            color="sand"
            borderRadius="11px"
            py="12px"
            height="auto"
            fontFamily="body"
            fontWeight={700}
            fontSize="12.5px"
            textTransform="uppercase"
            letterSpacing=".05em"
            textAlign="center"
            _hover={{ bg: 'brand.800', textDecoration: 'none' }}
          >
            {t.card.viewSheet}
          </Button>
          <IconButton
            aria-label={t.card.share}
            onClick={() => setIsShareOpen(true)}
            boxSize="44px"
            variant="outline"
            borderColor="brand.200"
            color="brand.700"
            borderRadius="11px"
            icon={<FiShare2 />}
            _hover={{ bg: 'brand.100' }}
          />
        </HStack>
      </Box>

      <ShareModal
        setIsModalOpen={setIsShareOpen}
        shareURL={shareUrl}
        isOpen={isShareOpen}
        speciesName={card.name}
      />
    </Box>
  );
};

export default Card;
