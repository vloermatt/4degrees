import { popoverAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  content: {
    padding: 3,
    bg: 'gray.700'
  },
  header: {
    fontSize: 20
  },
  closeButton: {
    _hover: {
      color: 'brand.700'
    }
  }
})

export const popoverTheme = defineMultiStyleConfig({ baseStyle })
