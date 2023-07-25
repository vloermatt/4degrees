import { drawerAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(drawerAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style

  dialogContainer: {},
  dialog: { bg: 'secondary.500', color: 'brand.500' },
  // content: { },
  // header: { bg: 'green' },
  // body: { bg: 'yellow' },
  footer: { bg: 'orange' }
})

export const drawerTheme = defineMultiStyleConfig({ baseStyle })
