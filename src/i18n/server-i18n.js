import { notFound } from 'next/navigation';
import { cache } from 'react';
import { availableLocales } from '@/i18n/config';
import deepmerge from 'deepmerge';

export const getMessages = async (locale) => {
  if (!availableLocales.includes(locale)) notFound();

  const translatedMessages = (await import(`./messages/${locale}.json`)).default;
  const defaultMessages = (await import(`./messages/en.json`)).default;

  return deepmerge(defaultMessages, translatedMessages)
};

// Doing caching minimicking next-intl
const setDefaultCache = () => {
  const value = { locale : 'en' }
  return value;
}

const cachedLocale = cache(setDefaultCache);

export const setLocaleCache = (locale) => {
  cachedLocale().locale = locale;
}

export const getTranslations = async (property) => {
  const translatedMessages = (await import(`./messages/${cachedLocale().locale}.json`)).default;
  const defaultMessages = (await import(`./messages/en.json`)).default;
  const messagesSection = deepmerge(defaultMessages, translatedMessages)[property]
  return (term) => {
    return messagesSection[term];
  }
}
