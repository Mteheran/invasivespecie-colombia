import { extendBaseTheme } from '@chakra-ui/react'
import { theme as ChakraTheme } from '@chakra-ui/theme'

const { Button } = ChakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})

export default theme;