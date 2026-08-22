import { Flex, HStack, Text, Link, Spacer, Icon } from '@chakra-ui/react';
import { FaGithub, FaHeart } from 'react-icons/fa';
import Flag from '../flag/Flag';
import { useT } from '../../i18n/lang';

export default function Footer() {
  const t = useT();

  const linkProps = {
    color: 'brand.200',
    fontFamily: 'body',
    fontSize: '13px',
    fontWeight: 400,
    isExternal: true,
    _hover: { color: 'sand', textDecoration: 'none' },
  } as const;

  return (
    <Flex
      as="footer"
      role="contentinfo"
      bg="brand.800"
      color="brand.200"
      align="center"
      wrap="wrap"
      gap={{ base: '14px', md: '28px' }}
      px={{ base: '16px', md: '40px' }}
      py="22px"
    >
      <Text color="sand" fontFamily="body" fontWeight={600} fontSize="13px">
        {t.nav.brand}
      </Text>

      <Link href="https://github.com/sponsors/Mteheran" {...linkProps}>
        <HStack spacing="6px">
          <Text>{t.footer.contribute}</Text>
          <Icon as={FaHeart} color="red.400" boxSize="12px" />
        </HStack>
      </Link>

      <Link href="https://github.com/Mteheran" {...linkProps}>
        {t.footer.author}
      </Link>

      <Link href="https://github.com/Mteheran/invasivespecie-colombia" {...linkProps}>
        <HStack spacing="6px">
          <Icon as={FaGithub} boxSize="14px" />
          <Text>{t.footer.github}</Text>
        </HStack>
      </Link>

      <Spacer />

      <HStack spacing="8px">
        <Flag width={18} height={13} />
        <Text fontFamily="body" fontSize="12px">
          {t.footer.dataSource}
        </Text>
      </HStack>
    </Flex>
  );
}
