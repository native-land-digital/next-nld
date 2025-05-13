import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { getTranslations } from '@/i18n/server-i18n';

import EntryCard from '@/components/static/entry-card';

export default async function Sidebar({ children = (<div></div>), picks = 5 }) {

  const t = await getTranslations('Sidebar');

  const totalEntries = await db.selectFrom('Entry')
    .select((eb) => eb.fn.count('id').as('num_entries'))
    .where('Entry.category', '!=', "placenames")
    .execute();

  const randomIndex = Math.floor(Math.random() * (totalEntries[0].num_entries - picks));

  let entries = await db.selectFrom('Entry')
    .leftJoin('Media', 'Media.entryId', 'Entry.id')
    .select(['Entry.id as id', 'Entry.name as name', 'Entry.category as category', 'Entry.slug as slug', 'Entry.updatedAt as updatedAt', 'Media.url as media_url'])
    .where('Entry.category', '!=', "placenames")
    .orderBy('Entry.color', 'asc')
    .limit(picks)
    .offset(randomIndex)
    .execute()


  return (
    <div className="col-span-1 bg-white rounded-t shadow-lg p-4 mt-5 order-last md:order-first">
      <div>
        {children}
      </div>
      {children.length > 0 ? <hr className="my-2.5" /> : false }
      {picks !== 0 ?
        <div>
          <h3 className="pt-0 !mt-0 font-bold text-xl">{picks} {t('random')}</h3>
          <p className="text-sm mb-2.5 !mt-2.5"><Link prefetch={false} href="/listings">{t('visit-listings')}.</Link></p>
          <div className="grid gap-5">
            {entries.map(entry => {
              return <EntryCard key={`entry-${entry.id}`} entry={entry} />
            })}
          </div>
        </div>
      : false}
    </div>
  )
}
