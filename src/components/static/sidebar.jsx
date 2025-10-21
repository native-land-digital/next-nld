import { db } from '@/lib/db/kysely'

import ListingButton from '@/components/listings/listing-button';
import SidebarChatbot from '@/components/ai/sidebar-bot';

export default async function Sidebar({ picks = 3 }) {

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
    <div className="nld-sidebar hidden lg:block absolute pt-12 ml-[10%]">
      <ListingButton entries={entries} />
      <SidebarChatbot startHidden={true} />
      <div className="mt-4 rounded-full w-[7px] h-[7px] nld-bg-teal-100 m-auto" />
    </div>
  )
}
