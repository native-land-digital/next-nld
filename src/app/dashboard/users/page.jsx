import prisma from "@/lib/db/prisma";
import Link from 'next/link'
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'

export default async function Page({ searchParams }) {

  const tCommon = await getTranslations('Common');
  const t = await getTranslations('Dashboard');

  let page = 0;
  let search = false;
  if(searchParams.page) {
    page = Number(searchParams.page);
  }
  if(searchParams.search) {
    search = searchParams.search;
  }
  const query = {
    select : {
      id : true,
      name : true,
      email : true,
      organization : true,
      permissions : true
    },
    orderBy : {
      createdAt : 'desc'
    },
    skip : page * 25,
    take : 25
  }
  if(search) {
    query['where'] = {
      name : {
        contains : search,
        mode: 'insensitive'
      }
    }
  }
  const users = await prisma.user.findMany(query);

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('user-management')} crumbs={[{ url : "/dashboard", title : "Dashboard" }]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <div className="w-full mb-5 bg-gray-100 p-2.5 rounded">
            <div className="grid grid-cols-4 gap-2.5">
              <form className="grid grid-cols-4 md:grid-cols-5 col-span-4 md:col-span-3 gap-2.5">
                <div className="col-span-3 md:col-span-2">
                  <input type="text" defaultValue={search ? search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <button className="border border-gray-300 px-4 py-3 rounded md:ml-2.5 mr-2.5 text-sm">{tCommon('search')}</button>
                  {search ?
                    <Link prefetch={false} className="inline-block border border-gray-300 px-4 py-3 rounded" href="/dashboard/users">{tCommon('clear')}</Link>
                  : false}
                </div>
              </form>
              <div className="col-span-4 md:col-span-1 text-sm justify-end">
              </div>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="hidden md:table-row">
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Organization</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Permissions</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(user => {
                return (
                  <tr className="grid md:table-row grid-cols-1 md:grid-cols-none bg-gray-100 m-2.5 md:m-0 md:odd:bg-white md:even:bg-gray-100" key={`user-row-${user.id}`}>
                    <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black">{user.id}</td>
                    <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black">{user.name}</td>
                    <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black">{user.email}</td>
                    <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black">{user.organization}</td>
                    <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black">{user.permissions.join(', ')}</td>
                    <td className="px-2.5 py-2.5 md:px-6 md:py-4 text-sm font-medium text-black"><Link prefetch={false} href={`/dashboard/users/${user.id}`}>➜</Link></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {users.length >= 25 || page > 0 ?
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
              {users.length >= 25 ?
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
  );
}
