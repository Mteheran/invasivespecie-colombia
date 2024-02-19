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
    default: {
      bg: '#6d7862',
      h: '1rem',
      p: '1.5rem 1.5rem',
      my: '0.5rem',
      color: '#feeee4',
      '&:hover': {
        background:'#b8c1ac'
      }
    }
  },

  defaultProps: {
    size: 'md',
  },
});

export default Button;