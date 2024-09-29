import prisma from "@/lib/db/prisma";
import Link from 'next/link';
import { getServerSession } from "next-auth/next"
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import { authOptions } from "@/root/auth";

export default async function Page({ params : { locale }, searchParams }) {
  const session = await getServerSession(authOptions);
  
  unstable_setRequestLocale(locale);
  const tNav = await getTranslations('Navigation');
  const tCommon = await getTranslations('Common');
  const t = await getTranslations('Dashboard');

  const user = await prisma.user.findUnique({
    where : { id : session.user.id },
    select : {
      id : true,
      api_key : true
    }
  });

  let polygons = [];
  let search = false;
  if(searchParams.search) {
    search = searchParams.search;
  }
  if(search) {
    const query = {
      where : {
        name : {
          contains : search,
          mode: 'insensitive'
        }
      },
      select : {
        id : true,
        name : true,
        slug : true,
        category : true
      },
      orderBy : {
        updatedAt : 'desc'
      },
      take : 50
    }
    polygons = await prisma.polygon.findMany(query);
  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={tNav('api')} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t min-h-screen shadow-lg p-4 mt-5">
          <h2 className="font-semibold text-3xl">{t('api-key')}</h2>
          <p className="my-2.5">{t('use-key')}</p>
          <div className="w-full md:w-1/2">
            <div className="mt-2.5">
              <label className="text-gray-800 text-sm mb-1 block">{t('api-key')}</label>
              <div className="relative flex items-center">
                <input value={user.api_key} name="api_key" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" disabled={true} />
              </div>
            </div>
          </div>
          <h2 className="font-semibold text-3xl mt-5">{t('slug-finder')}</h2>
          <p className="my-2.5">{t('use-slug-finder')}</p>
          <div className="flex w-full mb-5 bg-gray-100 p-2.5 rounded">
            <div className="w-1/2">
              <form className="flex">
                <input type="text" defaultValue={search ? search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                <button className="border border-gray-300 px-4 py-3 rounded ml-2.5">{tCommon('search')}</button>
                {search ?
                  <Link className="border border-gray-300 px-4 py-3 rounded ml-2.5" href="/dashboard/api">{tCommon('clear')}</Link>
                : false}
              </form>
            </div>
          </div>
          {polygons.map(polygon => {
            return (
              <div key={`api-${polygon.id}`} className="mb-5 text-black">
                <p className="text-xl font-bold">{polygon.name} ({polygon.category}) <Link href={`/maps/${polygon.category}/${polygon.slug}`}>➜</Link></p>
                <pre>{polygon.slug}</pre>
                <p>{t('sample-request')}</p>
                <pre>https://native-land.ca/api/index.php?maps={polygon.category}&name={polygon.slug}</pre>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
