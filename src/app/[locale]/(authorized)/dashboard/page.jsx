import { db } from '@/lib/db/kysely'
import { getServerSession } from "next-auth/next"
import { setLocaleCache } from '@/i18n/server-i18n';

import EditUser from '@/components/dashboard/edit-user'
import { authOptions } from "@/root/auth";

export default async function Page({ params : { locale } }) {
  const session = await getServerSession(authOptions);

  setLocaleCache(locale);

  const user = await db.selectFrom('User')
    .where('id', '=', Number(session.user.id))
    .select(['id', 'name', 'email', 'organization', 'createdAt', 'api_key'])
    .executeTakeFirst()

  return (
    <EditUser user={user} isAdmin={false} />
  );
}
