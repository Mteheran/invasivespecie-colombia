import { Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  size?: 'sm' | 'md';
}

/** Chip informativo de categoría/hábitat (no interactivo). */
export default function Chip({ children, size = 'sm' }: ChipProps) {
  return (
    <Text
      as="span"
      fontFamily="body"
      fontWeight={600}
      fontSize="11px"
      color="brand.700"
      bg="brand.100"
      borderRadius="6px"
      px={size === 'md' ? '10px' : '9px'}
      py={size === 'md' ? '5px' : '4px'}
      lineHeight={1.2}
      whiteSpace="nowrap"
    >
      {children}
    </Text>
  );
}
