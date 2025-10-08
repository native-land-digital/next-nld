import { db } from '@/lib/db/kysely'
import { availableLocales } from '@/i18n/config'
import { setLocaleCache } from '@/i18n/server-i18n';

import MapContainer from '@/components/front-map/map-container';
import AIChatbot from '@/components/ai/chatbot';

// import defaultContent from "./en.mdx"

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default async function Home({ params : { locale } }) {

  setLocaleCache(locale);

  // Querying for select2 list initial options
  const territoryOptions = await db.selectFrom('Entry')
    .where('category', '=', 'territories')
    .where('published', '=', true)
    .select(['id', 'name'])
    .limit(25)
    .execute()

  const languageOptions = await db.selectFrom('Entry')
    .where('category', '=', 'languages')
    .where('published', '=', true)
    .select(['id', 'name'])
    .limit(25)
    .execute()

  const treatyOptions = await db.selectFrom('Entry')
    .where('category', '=', 'treaties')
    .where('published', '=', true)
    .select(['id', 'name'])
    .limit(25)
    .execute()

  // let Content = defaultContent;
  // try {
  //   const TranslatedContent = (await import(`./${locale}.mdx`)).default;
  //   Content = TranslatedContent;
  // } catch {

  // }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapContainer territoryOptions={territoryOptions} languageOptions={languageOptions} treatyOptions={treatyOptions} />
      <AIChatbot />
    </div>
  );
}
