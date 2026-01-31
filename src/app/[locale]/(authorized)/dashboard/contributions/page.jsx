import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/root/auth";
import CreateContribution from '@/components/dashboard/create-contribution'

export default async function Page({ params : { locale }, searchParams }) {

  setLocaleCache(locale);
  const tCommon = await getTranslations('Common');
  const t = await getTranslations('Dashboard');
  const session = await getServerSession(authOptions);

  let page = 0;
  if(searchParams.page) {
    page = Number(searchParams.page);
  }

  let query = db.selectFrom('Contribution')
    .select(['id', 'name', 'open'])
    .orderBy('createdAt', 'desc')
    .limit(25)
    .offset(25 * page)

  // If atomized permissions, only return results they are allowed to see
  if(!session.user.global_permissions.find(perm => perm.entity === "contributions") && session.user.item_permissions.find(perm => perm.entity === "contributions")) {
    const allowedContributionIDs = session.user.item_permissions.filter(perm => perm.entity === "contributions").map(perm => perm.entry);
    query = query.where('id', 'in', allowedContributionIDs);
  }

  if(searchParams.search) {
    query = query.where((eb) => eb(eb.fn('lower', 'name'), 'like', `%${searchParams.search.toLowerCase()}%`));
  }

  const contributions = await query.execute()

  return (
    <div>
      <h2 className="font-semibold text-3xl">{t('contributions')}</h2>
      <hr className="mt-3 mb-3" />
      <div className="w-full mb-5 bg-gray-100 p-2.5 rounded">
        <div className="grid grid-cols-4 gap-2.5">
          <form className="grid grid-cols-4 md:grid-cols-5 col-span-4 md:col-span-3 gap-2.5">
            <div className="col-span-3 md:col-span-2">
              <input type="text" defaultValue={searchParams.search ? searchParams.search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
            </div>
            <div className="col-span-3 md:col-span-2">
              <button className="border border-gray-300 px-4 py-3 rounded md:ml-2.5 mr-2.5 text-sm">{tCommon('search')}</button>
              {searchParams.search ?
                <Link prefetch={false} className="inline-block border border-gray-300 px-4 py-3 rounded" href="/dashboard/contributions">{tCommon('clear')}</Link>
              : false}
            </div>
          </form>
          <div className="col-span-4 md:col-span-1 text-sm justify-end">
            <CreateContribution />
          </div>
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="hidden md:table-row">
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('id')}</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('name')}</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('open')}</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">{t('edit')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {contributions.map(contribution => {
            return (
              <tr className="grid md:table-row grid-cols-1 md:grid-cols-none bg-gray-100 m-2.5 md:m-0 md:odd:bg-white md:even:bg-gray-100" key={`contribution-row-${contribution.id}`}>
                <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black">{contribution.id}</td>
                <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black">{contribution.name}</td>
                <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black">{contribution.open ? "Open" : "Closed"}</td>
                <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black"><Link prefetch={false} href={`/dashboard/contributions/${contribution.id}`}>➜</Link></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {contributions.length >= 24 || page > 0 ?
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
          {contributions.length >= 24 ?
            <form>
              <input type="hidden" name="page" value={page + 1} />
              <button type="submit" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                <span>{tCommon('next')}</span>
                <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </form>
          : false }
        </nav>
      : false}
    </div>
  );
}
