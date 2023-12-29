import { defineStyleConfig } from '@chakra-ui/react'

const Button = defineStyleConfig({

  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base',
  },

  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4,
      py: 3,
    },
    md: {
      fontSize: 'md',
      px: 6,
      py: 4,
    },
  },

  variants: {
    ghost: {
      bg: 'gray.100',
    },
  },

  defaultProps: {
    size: 'md',
  },
});

export default Button;