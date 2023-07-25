import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const primary = defineStyle({
  background: 'blue.500',
  color: 'gray.900',
  fontWeight: '600'
})

const lg = defineStyle({
  fontSize: 'lg'
})

const sm = defineStyle({
  fontSize: '10px'
})

export const badgeTheme = defineStyleConfig({
  variants: { primary },
  sizes: { lg, sm }
})
