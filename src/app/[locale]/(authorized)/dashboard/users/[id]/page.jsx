import { db } from '@/lib/db/kysely'
import { notFound } from 'next/navigation';
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/root/auth";
import { setLocaleCache } from '@/i18n/server-i18n';
import EditUser from '@/components/dashboard/edit-user'

export const revalidate = false;

export default async function Page({ params : { locale, id }}) {

  setLocaleCache(locale);
  const session = await getServerSession(authOptions);

  const user = await db.selectFrom('User')
    .where('id', '=', Number(id))
    .select(['id', 'name', 'email', 'organization', 'permissions', 'createdAt', 'api_key'])
    .executeTakeFirst()

  if(!session.user.global_permissions.find(perm => perm.entity === "users") && !session.user.item_permissions.find(perm => perm.entity === "users" && perm.user === parseInt(id))) {
    notFound();
  }

  return (
    <EditUser user={user} isAdmin={true} />
  );
}
