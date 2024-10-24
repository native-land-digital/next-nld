import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import ViewAPI from '@/components/dashboard/view-api'
import { authOptions } from "@/root/auth";

export default async function Page({ params : { locale }, searchParams }) {
  const session = await getServerSession(authOptions);

  setLocaleCache(locale);
  const tNav = await getTranslations('Navigation');
  const tCommon = await getTranslations('Common');
  const t = await getTranslations('Dashboard');

  const user = await db.selectFrom('User')
    .where('id', '=', Number(session.user.id))
    .select(['id', 'api_key', 'agreed_treaty'])
    .executeTakeFirst()

  let polygons = [];
  if(searchParams.search) {
    polygons = await db.selectFrom('Entry')
      .where((eb) => eb.fn('lower', eb.ref('name')), 'like', `%${searchParams.search.toLowerCase()}%`)
      .select(['id', 'name', 'category', 'slug'])
      .distinctOn('id')
      .orderBy('id')
      .orderBy('createdAt')
      .limit(50)
      .execute();
  }

  return (
    <div>
      <h2 className="font-semibold text-3xl">{t('api-key')}</h2>
      <hr className="mt-3 mb-3" />
      <p className="my-2.5">{t('use-key')}</p>
      <div className="w-full md:w-1/2">
        <ViewAPI user={user} />
      </div>
      <h2 className="font-semibold text-3xl mt-5">{t('slug-finder')}</h2>
      <p className="my-2.5">{t('use-slug-finder')}</p>
      <div className="w-full mb-5 bg-gray-100 p-2.5 rounded">
        <form className="grid grid-cols-4 gap-2.5">
          <div className="col-span-3 md:col-span-2">
            <input type="text" defaultValue={searchParams.search ? searchParams.search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
          </div>
          <div className="col-span-1">
            <button className="w-full border border-gray-300 px-4 py-3 rounded text-sm">{tCommon('search')}</button>
          </div>
          <div className="col-span-4 md:col-span-1">
          {searchParams.search ?
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
  );
}
