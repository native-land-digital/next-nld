import prisma from "@/lib/db/prisma";
import Link from 'next/link'
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'

export default async function Page() {

  const t = await getTranslations('Dashboard');

  const users = await prisma.user.findMany({
    select : {
      id : true,
      name : true,
      email : true,
      organization : true,
      permissions : true
    }
  });

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('user-management')} crumbs={[{ url : "/dashboard", title : "Dashboard" }]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4 mt-5">
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
        </div>
      </div>
    </div>
  );
}
