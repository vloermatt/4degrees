import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: 'secondary.500',
    boxShadow: 'lg'
  },
  header: {},
  body: {},
  footer: {}
})

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: 8
    }
  })
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })
