import { db } from '@/lib/db/kysely'
import { availableLocales } from '@/i18n/config'
import { setLocaleCache } from '@/i18n/server-i18n';

import AIChatbot from '@/components/ai/chatbot';
import MapContainer from '@/components/maps/placenames/map-container';

import defaultContent from "./en.mdx"

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default async function Home({ params : { locale } }) {

  setLocaleCache(locale);
  
  const placenameOptions = await db.selectFrom('Entry')
    .where('category', '=', 'placenames')
    .where('published', '=', true)
    .select(['id', 'name'])
    .limit(25)
    .execute()

  let Content = defaultContent;
  try {
    const TranslatedContent = (await import(`./${locale}.mdx`)).default;
    Content = TranslatedContent;
  } catch {

  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapContainer placenameOptions={placenameOptions} />
      <AIChatbot />
    </div>
  );
}
