import { defineStyleConfig } from '@chakra-ui/react'

const Card = defineStyleConfig({
  baseStyle: {
    display: 'flex',
    flexDirection: 'column',
    background: 'white',
    alignItems: 'center',
    gap: 6,
  },
  variants: {
    rounded: {
      padding: 8,
      borderRadius: 'xl',
      boxShadow: 'xl',
    },
    smooth: {
      padding: 6,
      borderRadius: 'base',
      boxShadow: 'md',
    },
    green: {
      alignItems: "center",
      overflow: 'hidden',
      variant: 'elevated',
      boxShadow: "0px 4px 11px 1px gray",
      padding: "15px",
      borderRadius: "25px",
      background: 'linear-gradient(144deg, #b8c1ac, #47533d)' 
    }
  },
  defaultProps: {
    variant: 'smooth',
  },
})

export default Card