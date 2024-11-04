import { db } from '@/lib/db/kysely'

import { availableLocales } from '@/i18n/config'
import { setLocaleCache } from '@/i18n/server-i18n';
import MapContainer from '@/components/maps/placenames/map-container';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

export default async function Home({ params : { locale } }) {

  setLocaleCache(locale);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapContainer />
    </div>
  );
}
