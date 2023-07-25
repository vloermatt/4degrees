import { switchAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(switchAnatomy.keys)

const baseStyle = definePartsStyle({
  track: {
    bg: 'gray.400',
    _checked: {
      bg: 'brand.700'
    }
  }
})

export const switchTheme = defineMultiStyleConfig({ baseStyle })
