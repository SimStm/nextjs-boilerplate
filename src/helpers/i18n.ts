import i18n from 'i18next'
import translations from '../../public/i18n'
import LanguageDetector from 'i18next-browser-languagedetector'

const onInit = (err: any, t: any) => {
  if (err) {
    console.error('Error initializing i18n:', err)
  } else {
    console.log('i18n initialized successfully')
  }
}

i18n.use(LanguageDetector).init(
  {
    debug: false,
    detection: {
      order: [
        'localStorage',
        'navigator',
        'querystring',
        'cookie',
        'htmlTag',
        'path',
        'subdomain'
      ],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupQuerystring: 'lng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ['cookie'],
      excludeCacheFor: ['cimode']
    },
    keySeparator: '\\',
    nsSeparator: '|',
    fallbackLng: 'pt-br',
    lowerCaseLng: true,
    resources: {
      'pt-br': {
        translation: translations.ptbr
      },
      es: {
        translation: translations.es
      },
      en: {
        translation: translations.en
      }
    }
  },
  onInit
)

export default i18n
