import { extendBaseTheme } from '@chakra-ui/react'
import { theme as ChakraTheme } from '@chakra-ui/theme'

const { Button, Input, Card } = ChakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
    Input,
    Card

  },
})

export default theme;