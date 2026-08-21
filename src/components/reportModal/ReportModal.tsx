import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  UnorderedList,
  ListItem,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import { useT } from "../../i18n/lang";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const t = useT();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent borderRadius="20px" bg="sand">
        <ModalHeader fontFamily="heading" fontWeight={700} fontSize="22px" color="brand.900">
          {t.report.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontFamily="body" fontSize="15px" lineHeight="1.6" color="brand.900" mb="16px">
            {t.report.intro}
          </Text>
          <Text fontFamily="body" fontWeight={700} fontSize="13px" textTransform="uppercase" letterSpacing=".08em" color="brand.600" mb="8px">
            {t.report.what}
          </Text>
          <UnorderedList spacing="6px" mb="16px" color="brand.900" fontFamily="body" fontSize="14px">
            <ListItem>{t.report.item1}</ListItem>
            <ListItem>{t.report.item2}</ListItem>
            <ListItem>{t.report.item3}</ListItem>
          </UnorderedList>
          <Box bg="brand.100" borderRadius="12px" p="12px 14px" mb="8px">
            <Text fontFamily="body" fontWeight={600} fontSize="13.5px" color="brand.800">
              {t.report.safety}
            </Text>
          </Box>
          <Text fontFamily="body" fontSize="12px" color="brand.600">
            {t.report.disclaimer}
          </Text>
        </ModalBody>
        <ModalFooter gap="10px">
          <Button onClick={onClose} variant="outline" borderColor="brand.200" color="brand.700" borderRadius="11px" _hover={{ bg: "brand.100" }}>
            {t.report.close}
          </Button>
          <Button
            as={Link}
            href="https://www.anla.gov.co/01_anla/ciudadania/atencion-al-ciudadano/transparencia-y-acceso-a-la-informacion/directorio-de-entidades-del-sector-ambiente"
            isExternal
            bg="brand.700"
            color="sand"
            borderRadius="11px"
            _hover={{ bg: "brand.800", textDecoration: "none" }}
          >
            {t.report.findAuthority}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
