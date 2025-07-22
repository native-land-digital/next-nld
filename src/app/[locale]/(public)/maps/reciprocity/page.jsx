import { db } from '@/lib/db/kysely'
import { availableLocales } from '@/i18n/config'
import { setLocaleCache } from '@/i18n/server-i18n';
import Sidebar from '@/components/static/sidebar';
import MapContainer from '@/components/maps/reciprocity/map-container';

import defaultContent from "./en.mdx"

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return availableLocales.map((locale) => ({ locale }));
}

// Querying for select2 list initial options
const risksRenewalsOptions = await db.selectFrom('Entry')
  .where((eb) =>
    eb('category', '=', 'risks').or('category', '=', 'renewals')
  )
  .where('published', '=', true)
  .select(['id', 'name'])
  .limit(25)
  .execute()

export default async function Home({ params : { locale } }) {

  setLocaleCache(locale);

  let Content = defaultContent;
  try {
    const TranslatedContent = (await import(`./${locale}.mdx`)).default;
    Content = TranslatedContent;
  } catch {

  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapContainer risksRenewalsOptions={risksRenewalsOptions} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto text-black static-page">
        <Sidebar />
        <div className="col-span-2 bg-white rounded-t shadow-lg mt-5">
          <div className="px-4 pb-4 break-words">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );
}
