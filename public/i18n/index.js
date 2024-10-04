import translations from './translations'

const ptbr = Object.entries(translations).reduce((a, [key, { ptbr }]) => {
  a[key] = ptbr
  return a
}, {})

const es = Object.entries(translations).reduce((a, [key, { es }]) => {
  a[key] = es
  return a
}, {})

const en = Object.entries(translations).reduce((a, [key]) => {
  a[key] = key
  return a
}, {})

const translationsByLanguage = {
  ptbr,
  en,
  es
}

export default translationsByLanguage
