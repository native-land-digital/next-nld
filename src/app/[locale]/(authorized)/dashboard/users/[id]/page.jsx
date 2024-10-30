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
    <EditUser user={user} isAdmin={true} />
  );
}
