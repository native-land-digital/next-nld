import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import EntryCard from '@/components/static/entry-card';

export const revalidate = false;

export default async function Page({ searchParams, params : { locale } }) {

  setLocaleCache(locale);
  const t = await getTranslations('Listings');
  const tNav = await getTranslations('Navigation');
  const tCommon = await getTranslations('Common');

  let page = 0;
  let search = false;
  if(searchParams.page) {
    page = Number(searchParams.page);
  }
  if(searchParams.search) {
    search = searchParams.search;
  }

  let totalQuery = db.selectFrom('Entry')
    .where('published', '=', true)
    .select((eb) => eb.fn.count('id').as('num_entries'))

  let query = db.selectFrom('Entry')
    .where('published', '=', true)
    .leftJoin('Media', 'Media.entryId', 'Entry.id')
    .select(['Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug', 'Entry.updatedAt', 'Media.url as media_url'])
    .distinctOn('Entry.id')
    .limit(24)
    .offset(24 * page)

  if(searchParams.search) {
    query = query.where((eb) => eb.or([
      eb(eb.fn('lower', 'Entry.name'), 'like', `%${searchParams.search.toLowerCase()}%`),
      eb(eb.fn('lower', 'Entry.slug'), 'like', `%${searchParams.search.toLowerCase()}%`),
    ]));
    totalQuery = totalQuery.where((eb) => eb.or([
      eb(eb.fn('lower', 'Entry.name'), 'like', `%${searchParams.search.toLowerCase()}%`),
      eb(eb.fn('lower', 'Entry.slug'), 'like', `%${searchParams.search.toLowerCase()}%`),
    ]));
  }

  const entries = await query.execute()
  const totalEntries = await totalQuery.execute()

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title="Listings" />
      <div className="w-full nld-bg-brown-500 text-center px-8 py-16">
        <div className="w-full md:w-2/3 m-auto">
          <p className="nld-text-lg font-semibold text-white">{t('search-text')}</p>
          <form className="flex items-center mt-4">
            <div className="w-full bg-white rounded-full flex items-center">
              <svg className="ml-2.5" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="16" fill="#EBDFD8"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 6C19.9706 6 24 10.0294 24 15C24 17.125 23.2619 19.0766 22.0303 20.6162L25.707 24.293C26.0974 24.6835 26.0975 25.3166 25.707 25.707C25.3166 26.0975 24.6835 26.0974 24.293 25.707L20.6162 22.0303C19.0766 23.2619 17.125 24 15 24C10.0294 24 6 19.9706 6 15C6 10.0294 10.0294 6 15 6ZM15 8C11.134 8 8 11.134 8 15C8 18.866 11.134 22 15 22C18.866 22 22 18.866 22 15C22 11.134 18.866 8 15 8Z" fill="#76533C"/>
              </svg>
              <input type="text" defaultValue={search ? search : ""} name="search" placeholder={t('search-placeholder')} className="nld-button-md nld-text-brown-500 w-full px-4 py-3 rounded-full outline-none" />
            </div>
            <button className="nld-bg-yellow-500 nld-text-brown-500 px-4 py-3 rounded-full ml-4 nld-button-md font-semibold">{tCommon('search')}</button>
          </form>
        </div>
      </div>

      <div className="w-full md:w-4/5 min-h-screen m-auto mt-12 text-black">
        <div className="col-span-2 mt-5">
          <div className="px-4 pb-4 break-words">
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 justify-center text-center">
              <Link className="nld-bg-grey-50 px-4 py-3 nld-button-md nld-text-grey-300 rounded-full" prefetch={false} href="/listings">{tNav('all-listings')}</Link>
              <Link className="nld-bg-grey-50 px-4 py-3 nld-button-md nld-text-grey-300 rounded-full" prefetch={false} href="/listings/territories">{tNav('territories-list')}</Link>
              <Link className="nld-bg-grey-50 px-4 py-3 nld-button-md nld-text-grey-300 rounded-full" prefetch={false} href="/listings/languages">{tNav('languages-list')}</Link>
              <Link className="nld-bg-grey-50 px-4 py-3 nld-button-md nld-text-grey-300 rounded-full" prefetch={false} href="/listings/treaties">{tNav('treaties-list')}</Link>
              <Link className="nld-bg-grey-50 px-4 py-3 nld-button-md nld-text-grey-300 rounded-full" prefetch={false} href="/listings/placenames">{tNav('placenames-list')}</Link>
              <Link className="nld-bg-grey-50 px-4 py-3 nld-button-md nld-text-grey-300 rounded-full" prefetch={false} href="/listings/risks">{tNav('risks-list')}</Link>
              <Link className="nld-bg-grey-50 px-4 py-3 nld-button-md nld-text-grey-300 rounded-full" prefetch={false} href="/listings/renewals">{tNav('renewals-list')}</Link>
            </div>
            <div className="mt-8">
              <p className="nld-font-jost nld-text-grey-300 nld-font-h5 uppercase">{new Intl.NumberFormat().format(totalEntries[0].num_entries)} {t('total-all')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {entries.map(entry => {
                return <EntryCard key={`entry-${entry.id}`} entry={entry} />
              })}
            </div>
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
