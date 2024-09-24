import 'server-only'

const navDictionary = {
  en: () => import('@/i18n/locales/en/nav.json').then((module) => module.default),
  fr: () => import('@/i18n/locales/fr/nav.json').then((module) => module.default),
  es: () => import('@/i18n/locales/es/nav.json').then((module) => module.default),
}

export const getNavDictionary = async (locale) => navDictionary[locale]()
