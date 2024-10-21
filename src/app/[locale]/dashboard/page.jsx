import { db } from '@/lib/db/kysely'
import { getServerSession } from "next-auth/next"
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import EditUser from '@/components/dashboard/edit-user'
import { authOptions } from "@/root/auth";

export default async function Page({ params : { locale } }) {
  const session = await getServerSession(authOptions);

  setLocaleCache(locale);
  const t = await getTranslations('Dashboard');

  const user = await db.selectFrom('User')
    .where('id', '=', Number(session.user.id))
    .select(['id', 'name', 'email', 'organization', 'createdAt', 'api_key'])
    .executeTakeFirst()

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('dashboard')} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4 mt-5">
          <EditUser user={user} isAdmin={false} />
        </div>
      </div>
    </div>
  );
}
