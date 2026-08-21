import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import IfYouFind from "../../components/ifYouFind/IfYouFind";
import { useT } from "../../i18n/lang";

export default function QueHacerPage() {
  const t = useT();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box maxW="820px" mx="auto" px={{ base: "16px", md: "24px" }} py={{ base: "28px", md: "44px" }}>
      <Heading as="h1" fontFamily="heading" fontWeight={800} fontSize={{ base: "30px", md: "38px" }} letterSpacing="-.5px" color="brand.900" mb="10px">
        {t.nav.whatToDo}
      </Heading>
      <Text fontFamily="body" fontSize="16px" lineHeight="1.6" color="brand.700" mb="28px">
        {t.report.intro}
      </Text>
      <IfYouFind />
    </Box>
  );
}
