import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const brandPrimary = defineStyle({
  color: 'blue.400',
  fontSize: 18,
  _hover: {
    textDecoration: 'underline'
  }
})

export const linkTheme = defineStyleConfig({
  variants: { brandPrimary }
})
