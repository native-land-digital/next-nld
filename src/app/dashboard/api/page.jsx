import prisma from "@/lib/db/prisma";
import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import ViewAPI from '@/components/dashboard/view-api'
import { authOptions } from "@/root/auth";

export default async function Page({ searchParams }) {
  const session = await getServerSession(authOptions);

  const tNav = await getTranslations('Navigation');
  const tCommon = await getTranslations('Common');
  const t = await getTranslations('Dashboard');

  const user = await prisma.user.findUnique({
    where : { id : session.user.id },
    select : {
      id : true,
      api_key : true,
      agreed_treaty : true
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
      <SubHeader title={tNav('api')} crumbs={[{ url : "/dashboard", title : "Dashboard" }]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t min-h-screen shadow-lg p-4 mt-5">
          <h2 className="font-semibold text-3xl">{t('api-key')}</h2>
          <p className="my-2.5">{t('use-key')}</p>
          <div className="w-full md:w-1/2">
            <ViewAPI user={user} />
          </div>
          <h2 className="font-semibold text-3xl mt-5">{t('slug-finder')}</h2>
          <p className="my-2.5">{t('use-slug-finder')}</p>
          <div className="w-full mb-5 bg-gray-100 p-2.5 rounded">
            <form className="grid grid-cols-4 gap-2.5">
              <div className="col-span-3 md:col-span-2">
                <input type="text" defaultValue={search ? search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
              </div>
              <div className="col-span-1">
                <button className="w-full border border-gray-300 px-4 py-3 rounded text-sm">{tCommon('search')}</button>
              </div>
              <div className="col-span-4 md:col-span-1">
              {search ?
                <Link prefetch={false} className="block w-full text-center border border-gray-300 px-4 py-3 text-sm rounded" href="/dashboard/api">{tCommon('clear')}</Link>
              : false}
              </div>
            </form>
          </div>
          {polygons.map(polygon => {
            return (
              <div key={`api-${polygon.id}`} className="mb-5 text-black break-words">
                <p className="text-xl font-bold mb-2.5">{polygon.name} ({polygon.category}) <Link prefetch={false} href={`/maps/${polygon.category}/${polygon.slug}`}>➜</Link></p>
                <p className="italic mb-2.5">{polygon.slug}</p>
                <p className="mb-2.5">{t('sample-request')}</p>
                <p className="italic">https://native-land.ca/api/index.php?maps={polygon.category}&name={polygon.slug}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
