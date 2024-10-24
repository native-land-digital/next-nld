import { db } from '@/lib/db/kysely'

import { setLocaleCache } from '@/i18n/server-i18n';
import EditUser from '@/components/dashboard/edit-user'

export const revalidate = false;

export default async function Page({ params : { locale, id }}) {

  setLocaleCache(locale);

  const user = await db.selectFrom('User')
    .where('id', '=', Number(id))
    .select(['id', 'name', 'email', 'organization', 'permissions', 'createdAt', 'api_key'])
    .executeTakeFirst()

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={user.name} crumbs={[{ url : "/dashboard", title : "Dashboard" }, { url : '/dashboard/users', title : "Users" }]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <EditUser user={user} isAdmin={true} />
        </div>
      </div>
    </div>
  );
}
