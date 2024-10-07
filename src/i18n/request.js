import { getRequestConfig } from 'next-intl/server';
// import deepmerge from 'deepmerge';

export default getRequestConfig(async () => {
  // const availableLocales = ['bxk', 'en', 'es', 'fa', 'fr', 'hi', 'kbh', 'ko', 'pen', 'pt-br', 'qu', 'sel', 'sw', 'yo', 'zh-CN'];

  const locale = "en";

  // const translatedMessages = (await import(`./messages/${locale}.json`)).default;
  const defaultMessages = (await import(`./messages/en.json`)).default;

  return {
    locale : locale,
    messages : defaultMessages
    // messages: deepmerge(defaultMessages, translatedMessages)
  };
});
