import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import SubHeader from '@/components/nav/sub-header';
import Sidebar from '@/components/static/sidebar';
import PolygonCard from '@/components/static/polygon-card';

export const generateStaticParams = () => {
  return [
    { locale : 'en', category : 'territories' },
    { locale : 'en', category : 'languages' },
    { locale : 'en', category : 'treaties' }
  ]
}

export const revalidate = false;

export default async function Page({ searchParams, params : { category }}) {

  let allowedCategories = ["territories","languages","treaties"]
  if(!allowedCategories.includes(category)) {
    notFound()
  }

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

  let totalQuery = db.selectFrom('Polygon')
    .where('published', '=', true)
    .where('category', '=', category)
    .select((eb) => eb.fn.count('id').as('num_polygons'))

  let query = db.selectFrom('Polygon')
    .where('published', '=', true)
    .where('category', '=', category)
    .leftJoin('Media', 'Media.polygonId', 'Polygon.id')
    .select(['Polygon.id as id', 'Polygon.name as name', 'Polygon.category as category', 'Polygon.slug as slug', 'Polygon.updatedAt as updatedAt', 'Media.url as media_url'])
    .distinctOn('id')
    .limit(24)
    .offset(24 * page)

  if(searchParams.search) {
    query = query.where((eb) => eb(eb.fn('lower', 'Polygon.name'), 'like', `%${searchParams.search.toLowerCase()}%`));
    totalQuery = totalQuery.where((eb) => eb(eb.fn('lower', 'Polygon.name'), 'like', `%${searchParams.search.toLowerCase()}%`));
  }

  const polygons = await query.execute()
  const totalPolygons = await totalQuery.execute()

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={category} crumbs={[{ url : "/maps", title : "Maps" }]} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
        <Sidebar>
          <ol className="list-inside text-gray-400">
            <li className="mb-2.5"><Link prefetch={false} href="/maps">{t('all-maps')}</Link></li>
            <li className="mb-2.5"><Link prefetch={false} href="/maps/territories">{t('territories-list')}</Link></li>
            <li className="mb-2.5"><Link prefetch={false} href="/maps/languages">{t('languages-list')}</Link></li>
            <li className="mb-2.5"><Link prefetch={false} href="/maps/treaties">{t('treaties-list')}</Link></li>
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
                  <Link prefetch={false} className="border border-gray-300 px-4 py-3 rounded ml-2.5 text-slate-600" href="/maps/territories">{tCommon('clear')}</Link>
                : false}
              </form>
            </div>
          </div>
          <p className="mb-2.5 text-sm">{totalPolygons[0].num_polygons} {category}.</p>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-5">
            {polygons.map(polygon => {
              return <PolygonCard key={`polygon-${polygon.id}`} polygon={polygon} />
            })}
            {polygons.length >= 24 ?
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
                <form>
                  <input type="hidden" name="page" value={page + 1} />
                  <button type="submit" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                    <span>{tCommon('next')}</span>
                    <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </form>
              </nav>
            : false}
          </div>
        </div>
      </div>
    </div>
  );
}
