import 'server-only'

const dictionaries = {
  "nav" : {
    en : () => import(`./locales/en/nav.json5`).then((module) => module.default),
    fr : () => import(`./locales/fr/nav.json5`).then((module) => module.default),
    es : () => import(`./locales/es/nav.json5`).then((module) => module.default)
  },
  "front-page" : {
    en : () => import(`./locales/en/front-page.json5`).then((module) => module.default)
  },
  "front-page-map" : {
    en : () => import(`./locales/en/front-page-map.json5`).then((module) => module.default)
  },
  "about/how-it-works" : {
    en : () => import(`./locales/en/about/how-it-works.json5`).then((module) => module.default),
    fr : () => import(`./locales/fr/about/how-it-works.json5`).then((module) => module.default)
  }
}

export const getDictionary = async(locale, path) => {

  const dictionary = await dictionaries[path]['en']();

  if(locale === 'en') {
    return dictionary;
  } else {
    if(dictionaries[path][locale]) {
      const translatedDictionary = await dictionaries[path][locale]();
      // Replace english terms
      for(const prop in translatedDictionary) {
        dictionary[prop] = translatedDictionary[prop];
      }
      return dictionary;
    } else {
      // No translation file found, use english
      return dictionary;
    }
  }

}
