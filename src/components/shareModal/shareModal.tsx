import { FaWhatsapp, FaFacebookF, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { FiCheck, FiCopy, FiLink } from "react-icons/fi";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Box,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useT } from "../../i18n/lang";

interface Props {
  isOpen: boolean;
  shareURL: string;
  setIsModalOpen: (open: boolean) => void;
  speciesName: string | undefined;
}

interface Network {
  key: string;
  label: string;
  icon: React.ElementType;
  color: string;
  href: string;
}

function ShareModal(props: Props) {
  const { isOpen, shareURL, setIsModalOpen, speciesName } = props;
  const t = useT();
  const [copied, setCopied] = useState(false);

  const textToShare = useMemo(
    () => `${t.shareModal.message.replace("{name}", speciesName ?? "")} ${shareURL}`,
    [shareURL, speciesName, t]
  );

  const networks: Network[] = useMemo(
    () => [
      {
        key: "whatsapp",
        label: t.shareModal.whatsapp,
        icon: FaWhatsapp,
        color: "#25D366",
        href: `https://wa.me/?text=${encodeURIComponent(textToShare)}`,
      },
      {
        key: "facebook",
        label: t.shareModal.facebook,
        icon: FaFacebookF,
        color: "#1877F2",
        href: `https://www.facebook.com/sharer.php?u=${encodeURIComponent(shareURL)}`,
      },
      {
        key: "x",
        label: t.shareModal.x,
        icon: FaXTwitter,
        color: "#000000",
        href: `https://twitter.com/share?url=${encodeURIComponent(shareURL)}&text=${encodeURIComponent(textToShare)}`,
      },
      {
        key: "linkedin",
        label: t.shareModal.linkedin,
        icon: FaLinkedinIn,
        color: "#0A66C2",
        href: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(textToShare)}`,
      },
    ],
    [textToShare, shareURL, t]
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  function handleClose() {
    setCopied(false);
    setIsModalOpen(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="20px" bg="sand" overflow="hidden">
        <ModalHeader pb="4px" pt="24px" px="24px">
          <Text fontFamily="heading" fontWeight={700} fontSize="22px" color="brand.900" lineHeight="1.25">
            {t.shareModal.title}
          </Text>
          <Text fontFamily="body" fontSize="14px" color="brand.600" mt="6px" lineHeight="1.5" pr="24px">
            {t.shareModal.subtitle}
          </Text>
        </ModalHeader>
        <ModalCloseButton top="18px" right="18px" borderRadius="full" color="brand.700" _hover={{ bg: "brand.100" }} />

        <ModalBody px="24px" pb="26px" pt="12px">
          <Text
            fontFamily="body"
            fontWeight={700}
            fontSize="12px"
            textTransform="uppercase"
            letterSpacing=".08em"
            color="brand.600"
            mb="12px"
          >
            {t.shareModal.networks}
          </Text>

          <SimpleGrid columns={4} spacing="10px" mb="24px">
            {networks.map((n) => (
              <VStack
                key={n.key}
                as="button"
                spacing="8px"
                py="14px"
                borderRadius="14px"
                bg="white"
                border="1px solid"
                borderColor="brand.100"
                transition="all .18s ease"
                _hover={{ borderColor: "brand.300", transform: "translateY(-2px)", boxShadow: "0 6px 16px rgba(30,32,23,.12)" }}
                onClick={() => window.open(n.href, "_blank", "noopener,noreferrer")}
                aria-label={`${t.shareModal.networks} — ${n.label}`}
              >
                <Box
                  w="40px"
                  h="40px"
                  borderRadius="full"
                  bg={n.color}
                  color="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon as={n.icon} boxSize="19px" />
                </Box>
                <Text fontFamily="body" fontSize="12px" fontWeight={600} color="brand.800">
                  {n.label}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>

          <Text
            fontFamily="body"
            fontWeight={700}
            fontSize="12px"
            textTransform="uppercase"
            letterSpacing=".08em"
            color="brand.600"
            mb="10px"
          >
            {t.shareModal.linkLabel}
          </Text>

          <HStack
            spacing="0"
            bg="white"
            border="1px solid"
            borderColor="brand.100"
            borderRadius="12px"
            overflow="hidden"
          >
            <Icon as={FiLink} boxSize="16px" color="brand.400" ml="14px" flexShrink={0} />
            <Text
              flex="1"
              px="10px"
              py="12px"
              fontFamily="body"
              fontSize="13.5px"
              color="brand.800"
              isTruncated
            >
              {shareURL}
            </Text>
            <Button
              onClick={handleCopy}
              leftIcon={<Icon as={copied ? FiCheck : FiCopy} boxSize="15px" />}
              borderRadius="0"
              h="auto"
              alignSelf="stretch"
              px="16px"
              bg={copied ? "brand.500" : "brand.700"}
              color="sand"
              fontFamily="body"
              fontSize="13px"
              fontWeight={600}
              flexShrink={0}
              _hover={{ bg: copied ? "brand.500" : "brand.800" }}
              _active={{ bg: "brand.800" }}
            >
              {copied ? t.shareModal.copied : t.shareModal.copy}
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ShareModal;
