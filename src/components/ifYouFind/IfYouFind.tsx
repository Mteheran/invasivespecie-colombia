import { Box, Heading, Text, Grid, HStack, Button, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import ReportModal from "../reportModal/ReportModal";
import { useT } from "../../i18n/lang";

/** Panel «Si la encuentras» con tres pasos y botón de reporte. */
export default function IfYouFind() {
  const t = useT();
  const [reportOpen, setReportOpen] = useState(false);
  const stacked = useBreakpointValue({ base: true, md: false });

  const steps = [
    { n: 1, title: t.ifFound.step1Title, desc: t.ifFound.step1Desc },
    { n: 2, title: t.ifFound.step2Title, desc: t.ifFound.step2Desc },
    { n: 3, title: t.ifFound.step3Title, desc: t.ifFound.step3Desc },
  ];

  const Circle = ({ n }: { n: number }) => (
    <Box
      w={stacked ? "24px" : "26px"}
      h={stacked ? "24px" : "26px"}
      flex="none"
      borderRadius="999px"
      bg="brand.500"
      color="sand"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="body"
      fontWeight={700}
      fontSize="13px"
      mb={stacked ? 0 : "10px"}
    >
      {n}
    </Box>
  );

  return (
    <Box bg="brand.900" color="sand" borderRadius={{ base: "18px", md: "20px" }} p={{ base: "18px", md: "24px" }}>
      <Heading fontFamily="heading" fontWeight={700} fontSize={{ base: "18px", md: "22px" }} mb="4px">
        {t.ifFound.title}
      </Heading>
      <Text fontFamily="body" fontSize="14px" lineHeight="1.55" color="brand.200" mb="18px">
        {t.ifFound.subtitle}
      </Text>

      {stacked ? (
        <Box>
          {steps.map((s) => (
            <HStack key={s.n} align="start" spacing="11px" py="8px">
              <Circle n={s.n} />
              <Box>
                <Text fontFamily="body" fontWeight={600} fontSize="13.5px">
                  {s.title}
                </Text>
                <Text fontFamily="body" fontSize="12.5px" lineHeight="1.5" color="brand.200">
                  {s.desc}
                </Text>
              </Box>
            </HStack>
          ))}
        </Box>
      ) : (
        <Grid templateColumns="repeat(3, 1fr)" gap="14px">
          {steps.map((s) => (
            <Box key={s.n} bg="rgba(254,238,228,.08)" borderRadius="14px" p="16px">
              <Circle n={s.n} />
              <Text fontFamily="body" fontWeight={600} fontSize="14px" lineHeight="1.35" mb="5px">
                {s.title}
              </Text>
              <Text fontFamily="body" fontSize="12.5px" lineHeight="1.5" color="brand.200">
                {s.desc}
              </Text>
            </Box>
          ))}
        </Grid>
      )}

      <HStack mt="18px" spacing="10px" flexWrap="wrap">
        <Button
          onClick={() => setReportOpen(true)}
          bg="sand"
          color="brand.900"
          borderRadius="11px"
          px="18px"
          py="12px"
          height="auto"
          width={{ base: "100%", md: "auto" }}
          fontFamily="body"
          fontWeight={700}
          fontSize="12.5px"
          textTransform="uppercase"
          letterSpacing=".05em"
          _hover={{ bg: "brand.100" }}
        >
          {t.ifFound.report}
        </Button>
        <Text fontFamily="body" fontSize="13px" color="brand.300" display={{ base: "none", md: "block" }}>
          {t.ifFound.authorityLine}
        </Text>
      </HStack>

      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} />
    </Box>
  );
}
