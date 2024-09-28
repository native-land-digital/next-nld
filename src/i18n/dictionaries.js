import 'server-only'

import enNav from './locales/en/nav.json5'
import frNav from './locales/fr/nav.json5'
import esNav from './locales/es/nav.json5'

import enFrontPage from './locales/en/front-page.json5'

import enFrontPagemap from './locales/en/front-page-map.json5'

import enAboutHowitworks from './locales/en/about/how-it-works.json5'
import frAboutHowitworks from './locales/fr/about/how-it-works.json5'

const dictionaries = {
  "nav" : {
    en : enNav,
    fr : frNav,
    es : esNav
  },
  "front-page" : {
    en : enFrontPage
  },
  "front-page-map" : {
    en : enFrontPagemap
  },
  "about/how-it-works" : {
    en : enAboutHowitworks,
    fr : frAboutHowitworks
  }
}

export const getDictionary = async(locale, path) => {

  const dictionary = await dictionaries[path]['en'];
  console.log('loading language', locale);

  if(locale === 'en') {
    console.log('english', dictionary);
    return dictionary;
  } else {
    if(dictionaries[path][locale]) {
      const translatedDictionary = await dictionaries[path][locale];
      // Replace english terms
      for(const prop in translatedDictionary) {
        dictionary[prop] = translatedDictionary[prop];
      }
      console.log(locale, dictionary);
      return dictionary;
    } else {
      // No translation file found, use english
      console.log('english after check', dictionary);
      return dictionary;
    }
  }

}
