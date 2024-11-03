import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import { notFound } from 'next/navigation';

import SubHeader from '@/components/nav/sub-header';
import Sidebar from '@/components/static/sidebar';
import EntryCard from '@/components/static/entry-card';

export const generateStaticParams = () => {
  return [
    { locale : 'en', category : 'territories' },
    { locale : 'en', category : 'languages' },
    { locale : 'en', category : 'treaties' },
    { locale : 'en', category : 'placenames' },
    { locale : 'en', category : 'greetings' }
  ]
}

export const revalidate = false;

export default async function Page({ searchParams, params : { locale, category }}) {

  let allowedCategories = ["territories", "languages", "treaties", "placenames", "greetings"]
  if(!allowedCategories.includes(category)) {
    notFound()
  }

  setLocaleCache(locale);
  const t = await getTranslations('Maps');
  const tCommon = await getTranslations('Common');

  let page = 0;
  let search = false;
  if(searchParams.page) {
    page = parseInt(searchParams.page);
  }
  if(searchParams.search) {
    search = searchParams.search;
  }

  let categoryToSearch = category;
  if(category === 'greetings') {
    categoryToSearch = 'languages';
  }

  let totalQuery = db.selectFrom('Entry')
    .where('published', '=', true)
    .where('category', '=', categoryToSearch)
    .select((eb) => eb.fn.count('Entry.id').as('num_entries'))


  let query = db.selectFrom('Entry')
    .where('published', '=', true)
    .where('category', '=', categoryToSearch)
    .leftJoin('Media', 'Media.entryId', 'Entry.id')
    .select(['Entry.id as id', 'Entry.name as name', 'Entry.category as category', 'Entry.slug as slug', 'Entry.updatedAt as updatedAt', 'Media.url as media_url'])
    .distinctOn('id')
    .limit(24)
    .offset(24 * page)

  if(category === 'greetings') {
    query = query.innerJoin('Greeting', 'Entry.id', 'Greeting.entryId')
    totalQuery = totalQuery.innerJoin('Greeting', 'Entry.id', 'Greeting.entryId')
  }

  if(searchParams.search) {
    query = query.where((eb) => eb(eb.fn('lower', 'Entry.name'), 'like', `%${searchParams.search.toLowerCase()}%`));
    totalQuery = totalQuery.where((eb) => eb(eb.fn('lower', 'Entry.name'), 'like', `%${searchParams.search.toLowerCase()}%`));
  }

  const entries = await query.execute()
  const totalEntries = await totalQuery.execute()

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={category} crumbs={[{ url : "/listings", title : "Listings" }]} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
        <Sidebar>
          <ol className="list-inside text-gray-400">
            <li className="mb-2.5"><Link prefetch={false} href="/listings">{t('all-maps')}</Link></li>
            <li className="mb-2.5"><Link prefetch={false} href="/listings/territories">{t('territories-list')}</Link></li>
            <li className="mb-2.5"><Link prefetch={false} href="/listings/languages">{t('languages-list')}</Link></li>
            <li className="mb-2.5"><Link prefetch={false} href="/listings/treaties">{t('treaties-list')}</Link></li>
            <li className="mb-2.5"><Link prefetch={false} href="/listings/greetings">{t('greetings-list')}</Link></li>
            <li className="mb-2.5"><Link prefetch={false} href="/listings/placenames">{t('placenames-list')}</Link></li>
          </ol>
          <span />
        </Sidebar>
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <div className="flex w-full mb-5 bg-gray-100 p-2.5 rounded">
            <div className="w-full">
              <form className="flex">
                <input type="text" defaultValue={search ? search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                <button className="border border-gray-300 px-4 py-3 rounded ml-2.5">{tCommon('search')}</button>
                {search ?
                  <Link prefetch={false} className="border border-gray-300 px-4 py-3 rounded ml-2.5 text-slate-600" href="/listings/territories">{tCommon('clear')}</Link>
                : false}
              </form>
            </div>
          </div>
          <p className="mb-2.5 text-sm">{totalEntries[0].num_entries} {category}.</p>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
            {entries.map(entry => {
              return <EntryCard key={`entry-${entry.id}`} entry={entry} />
            })}
            {entries.length >= 24 || page > 0 ?
              <nav className="flex items-center mt-2.5" aria-label="Pagination">
                {page > 0 ?
                  <form>
                    <input type="hidden" name="page" value={page - 1} />
                    <button type="submit" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous">
                      <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                      </svg>
                      <span>{tCommon('prev')}</span>
                    </button>
                  </form>
                : false}
                {entries.length >= 24 ?
                  <form>
                    <input type="hidden" name="page" value={page + 1} />
                    <button type="submit" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                      <span>{tCommon('next')}</span>
                      <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>
                  </form>
                : false}
              </nav>
            : false}
          </div>
        </div>
      </div>
    </div>
  );
}
