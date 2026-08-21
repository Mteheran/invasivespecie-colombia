import { Box, Heading, Text, Wrap, WrapItem, Link } from "@chakra-ui/react";
import { useEffect } from "react";
import Chip from "../../components/chip/Chip";
import { useT } from "../../i18n/lang";

const TECH = ["React 19", "Vite 7", "TypeScript 5", "Chakra UI v2", "React Router 7", "d3-geo", "API Colombia"];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box bg="sand" borderRadius="20px" p={{ base: "20px", md: "24px" }} mb="18px" boxShadow="0 10px 25px -14px rgba(30,32,23,.4)">
      <Heading as="h2" fontFamily="body" fontWeight={700} fontSize="13px" textTransform="uppercase" letterSpacing=".08em" color="brand.600" mb="10px">
        {title}
      </Heading>
      {children}
    </Box>
  );
}

export default function AcercaPage() {
  const t = useT();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box maxW="820px" mx="auto" px={{ base: "16px", md: "24px" }} py={{ base: "28px", md: "44px" }}>
      <Heading as="h1" fontFamily="heading" fontWeight={800} fontSize={{ base: "30px", md: "38px" }} letterSpacing="-.5px" color="brand.900" mb="16px">
        {t.about.title}
      </Heading>

      <Text fontFamily="body" fontSize="16px" lineHeight="1.65" color="brand.800" mb="12px">
        {t.about.p1}
      </Text>
      <Text fontFamily="body" fontSize="14px" lineHeight="1.65" color="brand.600" mb="28px">
        {t.about.p2}
      </Text>

      <Block title={t.about.objective}>
        <Text fontFamily="body" fontSize="15px" lineHeight="1.6" color="brand.900">
          {t.about.objectiveText}
        </Text>
      </Block>

      <Block title={t.about.tech}>
        <Wrap spacing="8px">
          {TECH.map((tech) => (
            <WrapItem key={tech}>
              <Chip size="md">{tech}</Chip>
            </WrapItem>
          ))}
        </Wrap>
      </Block>

      <Block title={t.about.contribute}>
        <Text fontFamily="body" fontSize="15px" lineHeight="1.6" color="brand.900">
          {t.about.contributeText}{" "}
          <Link href="https://github.com/Mteheran/invasivespecie-colombia" isExternal color="brand.700" fontWeight={600} textDecoration="underline">
            GitHub
          </Link>
          .
        </Text>
      </Block>
    </Box>
  );
}
