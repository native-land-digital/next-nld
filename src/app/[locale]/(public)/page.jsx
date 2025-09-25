import { db } from '@/lib/db/kysely'

import { availableLocales } from '@/i18n/config'
import { setLocaleCache } from '@/i18n/server-i18n';
import FrontPage from '@/components/static/front-page';
import AIChatbot from '@/components/ai/chatbot';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default async function Home({ params : { locale } }) {

  setLocaleCache(locale);

  return (
    <div>
      <FrontPage />
      <AIChatbot />
    </div>
  );
}
