import { 
    ButtonGroup,
    Flex,
    IconButton,
    Text,
    HStack,
    VStack,
    Link,
    LinkProps, 
    Icon
} from '@chakra-ui/react'
import { FaGithub, FaHeart } from 'react-icons/fa'

const CustomLink = ({ children, ...props }: LinkProps) => {
    return (
      <Link href={props.href} fontSize="sm" isExternal _hover={{ textDecoration: 'underline' }} {...props}>
        {children}
      </Link>
    );
  };

export default function Footer () {
    return (
        <Flex sx={{ position: 'sticky', bottom: '0',  }} bg='#363c31' w='100%' justifyContent="space-around" maxW='100%' as="footer" role="contentinfo" p={{ base: '4', md: '4' }} >            
        <HStack
          spacing={20}
          justifyContent={{ sm: 'space-between', md: 'normal' }}
          alignItems='center'
        >
          <VStack spacing={4} alignItems="flex-center" color='white'>
            <HStack spacing={2} alignItems='center'>
                <CustomLink href={'https://github.com/sponsors/Mteheran'}>
                    <HStack spacing={2} alignItems='center'>
                        <Text>Contribuir</Text>
                        <Icon color='red' as={FaHeart}></Icon>
                    </HStack>
                </CustomLink>
            </HStack>
          </VStack>

          <VStack spacing={4} alignItems="flex-center" color='white'>
              <CustomLink href={'https://mteheran.dev'}>Conoce al autor</CustomLink>
          </VStack>

          <VStack spacing={4} alignItems="flex-center" color='white'>
            <ButtonGroup variant="tertiary">
            <IconButton as="a" href={'https://github.com/Mteheran/invasivespecie-colombia'}
                          target='_blank'
                          aria-label="GitHub" icon={<FaGithub />} />
            </ButtonGroup>
          </VStack>
        </HStack>

      </Flex>
    )
}

