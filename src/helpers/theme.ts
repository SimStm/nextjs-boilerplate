// @ts-nocheck
import { createTheme, MantineColorsTuple, Button, Card } from '@mantine/core'

import { Outfit } from 'next/font/google'
import Local from 'next/font/local'

const ProximaNova = Local({
  src: '../assets/fonts/proxima-nova/ProximaNova-Bold.woff2'
})
const outfit = Outfit({ subsets: ['latin'] })

const pinkInfleux: MantineColorsTuple = [
  '#ffe7f2',
  '#ffcedf',
  '#ff9bbc',
  '#ff6397',
  '#ff3677',
  '#ff1863',
  '#ff0259',
  '#e50049',
  '#cc0040',
  '#b30036'
]

const purpleInfleux: MantineColorsTuple = [
  '#ffebff',
  '#fcd2f9',
  '#f8a3f1',
  '#f470e9',
  '#f047e2',
  '#ee2ede',
  '#ee21dd',
  '#d416c4',
  '#bd0caf',
  '#a50099'
]

const oceanBlue: MantineColorsTuple = [
  '#7AD1DD',
  '#5FCCDB',
  '#44CADC',
  '#2AC9DE',
  '#1AC2D9',
  '#11B7CD',
  '#09ADC3',
  '#0E99AC',
  '#128797',
  '#147885'
]
const brightPink: MantineColorsTuple = [
  '#F0BBDD',
  '#ED9BCF',
  '#EC7CC3',
  '#ED5DB8',
  '#F13EAF',
  '#F71FA7',
  '#FF00A1',
  '#E00890',
  '#C50E82',
  '#AD1374'
]

const theme = createTheme({
  colors: {
    pinkInfleux,
    purpleInfleux,
    'ocean-blue': oceanBlue,
    'bright-pink': brightPink
  },
  headings: {
    fontFamily: ProximaNova.style.fontFamily
  },
  fontFamily: outfit.style.fontFamily,
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.variant === 'secondary') {
          return {
            root: {
              ...props,
              background: props.background ?? 'lightgray',
              color: props.color ?? 'black',
              borderRadius: props.borderRadius ?? '12px'
            }
          }
        }

        if (props.variant === 'outline') {
          return {
            root: {
              ...props,
              borderRadius: props.borderRadius ?? '12px',
              borderColor: props.borderColor ?? oceanBlue[2],
              color: props.color ?? oceanBlue[2]
            }
          }
        }

        if (props.variant === 'notified') {
          return {
            root: {
              ...props,
              borderRadius: props.borderRadius ?? '12px',
              background: props.background ?? '#D7FFC5',
              color: props.color ?? '#009521'
            }
          }
        }

        if (props.variant === 'filled' || !props.variant) {
          return {
            root: {
              ...props,
              background: props.background ?? oceanBlue[2],
              color: props.color ?? 'white',
              borderRadius: props.borderRadius ?? '12px'
            }
          }
        }
      }
    }),
    Card: Card.extend({
      vars: (theme, props) => {
        return {
          root: {
            ...props,
            borderRadius: props.borderRadius ?? '12px',
            boxShadow: props.boxShadow ?? '0px 2px 4px 0px #00000026'
          }
        }
      }
    })
  }
})

export default theme
