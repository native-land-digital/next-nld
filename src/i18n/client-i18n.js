 import { useContext } from 'react';
 import { LocaleContext } from '@/i18n/locale-provider';

 export const useTranslations = (section) => {
   const { messages } = useContext(LocaleContext)
   const messagesSection = messages[section];
   return (term) => {
     return messagesSection[term];
   }
 }
