import prisma from "@/lib/db/prisma";
import { Link } from '@/i18n/routing';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'

export default async function Page({ params : { locale }}) {

  unstable_setRequestLocale(locale);
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
      <SubHeader title={t('user-management')} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4 mt-5">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
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
                  <tr className="odd:bg-white even:bg-gray-100" key={`user-row-${user.id}`}>
                    <td className="px-6 py-4 text-sm font-medium text-black">{user.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black">{user.name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black">{user.email}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black">{user.organization}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black">{user.permissions.join(', ')}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black"><Link href={`/dashboard/users/${user.id}`}>➜</Link></td>
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
