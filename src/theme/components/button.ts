import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const brand = defineStyle({
  color: 'secondary.500',
  backgroundColor: 'brand.500',
  rounded: 'full',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 2px 20px 0px',
  _hover: {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: 'brand.500',
    backgroundColor: 'secondary.500',
    color: 'brand.500'
  },
  _active: {
    bg: 'brand.500',
    borderWidth: '1px'
  },
  _focus: {
    boxShadow: 'none'
  }
})

const lg = defineStyle({
  fontSize: 'lg'
})

const sm = defineStyle({
  fontSize: '10px'
})

export const buttonTheme = defineStyleConfig({
  variants: { brand },
  sizes: { lg, sm },
  defaultProps: {
    variant: 'brand'
  }
})
