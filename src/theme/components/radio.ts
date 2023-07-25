import { radioAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(radioAnatomy.keys)

const baseStyle = definePartsStyle({
  control: {
    borderRadius: '12px',
    borderColor: 'brand.700'
  }
})

export const radioTheme = defineMultiStyleConfig({ baseStyle })
