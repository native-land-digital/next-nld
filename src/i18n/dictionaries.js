import 'server-only'
import json5 from "json5";
import path from 'path';
import { promises as fs } from 'fs';

export const getDictionary = async(locale, path) => {
  let englishTranslation = false;
  try {
    await fs.access(process.cwd() + `/src/i18n/locales/en/${path}.json5`)
    let translation = await fs.readFile(process.cwd() + `/src/i18n/locales/en/${path}.json5`)
    englishTranslation = json5.parse(translation);
    if(locale === 'en') {
      return englishTranslation
    }
  } catch (err) {
    console.error(`You haven't created an English translation for this page ${path}.`)
    return {};
  }

  try {
    await fs.access(process.cwd() + `/src/i18n/locales/${locale}/${path}.json5`)
    let translation = await fs.readFile(process.cwd() + `/src/i18n/locales/${locale}/${path}.json5`)
    let parsedTranslation = json5.parse(translation);
    let modifiedOriginal = JSON.parse(JSON.stringify(englishTranslation));
    for(let prop in parsedTranslation) {
      // This is done to replace every string BUT if any are missed, to avoid an error (it will just render the English)
      modifiedOriginal[prop] = parsedTranslation[prop]
    }
    return modifiedOriginal;
  } catch (err) {
    console.log(`Missing a translation file for ${path}, falling back to English.`)
    return englishTranslation;
  }

}
