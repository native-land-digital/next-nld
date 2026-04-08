import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import Link from 'next/link'

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

import FrontPageGeocoder from '@/components/maps/front-page-geocoder';
import AIChatbot from '@/components/ai/chatbot';

// import defaultContent from "./en.mdx"

export default async function Home({ params: { locale }, searchParams: { center, placename } }) {

  const t = await getTranslations('Navigation');
  setLocaleCache(locale);


  let entries = [];
  if (center && center.length > 0) {
    const centerPoint = center.split(',');
    entries = await db.selectFrom('Entry')
      .leftJoin('Polygon', 'Polygon.entryId', 'Entry.id')
      .select([
        'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug',
      ])
      .where(sql`
        ST_Intersects(
          "Polygon".geometry,
          ST_SetSRID(ST_MakePoint(${centerPoint[0]}, ${centerPoint[1]}), 4326)
        )
      `)
      .execute()
  }

  const territories = entries.filter(entry => entry.category === "territories");
  const languages = entries.filter(entry => entry.category === "languages");
  const treaties = entries.filter(entry => entry.category === "treaties");

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('place-search')} crumbs={[{ url : "/place", title : "Place Search" }]} />
      <Sidebar />
      <div className="w-full lg:w-3/5 min-h-screen m-auto mt-12 text-black static-page">
        <div className="col-span-2 mt-5">
          <div className="px-4 pb-4 break-words">
            <div className="text-sm">
              <FrontPageGeocoder initialValue={placename} />
            </div>
            {!center || center.length < 2 ?
              <div className="mt-8 text-lg">Search a place above to see results.</div>
            : false}
            {center && entries && entries.length === 0 ?
              <div className="mt-8 text-lg">No results found for this search.</div>
            : false}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {territories.length > 0 ?
                <div>
                  <h2>Nations</h2>
                  {territories.map((entry, i) => {
                    return (
                      <div key={`entry-result-${i}`}>
                        <p><Link className="nld-text-teal-100 nld-text-lg" prefetch={false} href={`/listings/${entry.category}/${entry.slug}`}>{entry.name}</Link></p>
                      </div>
                    )
                  })}
                </div>
              : false}
              {languages.length > 0 ?
                <div>
                  <h2>Languages</h2>
                  {languages.map((entry, i) => {
                    return (
                      <div key={`entry-result-${i}`}>
                        <p><Link className="nld-text-teal-100 nld-text-lg" prefetch={false} href={`/listings/${entry.category}/${entry.slug}`}>{entry.name}</Link></p>
                      </div>
                    )
                  })}
                </div>
              : false}
              {treaties.length > 0 ?
                <div>
                  <h2>Treaties</h2>
                  {treaties.map((entry, i) => {
                    return (
                      <div key={`entry-result-${i}`}>
                        <p><Link className="nld-text-teal-100 nld-text-lg" prefetch={false} href={`/listings/${entry.category}/${entry.slug}`}>{entry.name}</Link></p>
                      </div>
                    )
                  })}
                </div>
              : false}
            </div>
            <AIChatbot />
          </div>
        </div>
      </div>
    </div>
  );
}
