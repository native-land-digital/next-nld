import 'server-only'
import json5 from "json5";
import { promises as fs } from 'fs';

export const getDictionary = async(locale, path) => {
  let raw = await fs.readFile(process.cwd() + `/src/i18n/locales/${locale}/${path}.json5`, 'utf8')
  let parsed = json5.parse(raw);
  return parsed;
}
