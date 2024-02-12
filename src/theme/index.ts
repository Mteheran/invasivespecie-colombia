import { extendTheme } from '@chakra-ui/react'
import { Button, Card, Input } from './components'

const theme = extendTheme({
  components: {
    Button,
    Card,
    Input
  },
})

export default theme;