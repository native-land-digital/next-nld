import { db } from '@/lib/db/kysely'

import { availableLocales } from '@/i18n/config'
import { setLocaleCache } from '@/i18n/server-i18n';
import MapContainer from '@/components/front-map/map-container';
import MapModal from '@/components/front-map/modal';
import FrontPage from '@/components/static/front-page';

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

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapModal />
      <MapContainer territoryOptions={territoryOptions} languageOptions={languageOptions} treatyOptions={treatyOptions} />
      <FrontPage />
    </div>
  );
}
