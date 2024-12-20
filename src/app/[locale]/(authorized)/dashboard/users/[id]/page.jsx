import { db } from '@/lib/db/kysely'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
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
    .select((eb) => [
      'User.id', 'User.name', 'User.email', 'User.email_verified', 'User.password',
      jsonArrayFrom(
        eb.selectFrom('GlobalPermission')
          .leftJoin('PermissionAction', 'GlobalPermission.actionId', 'PermissionAction.id')
          .leftJoin('PermissionEntity', 'GlobalPermission.entityId', 'PermissionEntity.id')
          .select(['GlobalPermission.id', 'PermissionAction.id as actionId', 'GlobalPermission.columnNames', 'PermissionEntity.id as entityId'])
          .whereRef('GlobalPermission.userId', '=', 'User.id')
      ).as('global_permissions'),
      jsonArrayFrom(
        eb.selectFrom('ItemPermission')
          .leftJoin('PermissionAction', 'ItemPermission.actionId', 'PermissionAction.id')
          .leftJoin('PermissionEntity', 'ItemPermission.entityId', 'PermissionEntity.id')
          .leftJoin('Entry', 'ItemPermission.entryId', 'Entry.id')
          .select(['ItemPermission.id', 'PermissionAction.id as actionId', 'ItemPermission.columnNames', 'ItemPermission.entryId', 'Entry.name as entryName', 'PermissionEntity.id as entityId'])
          .whereRef('ItemPermission.userId', '=', 'User.id')
      ).as('item_permissions'),
    ])
    .executeTakeFirst()

  const permissionActions = await db.selectFrom('PermissionAction').select(['id', 'name']).execute();
  const permissionEntities = await db.selectFrom('PermissionEntity').select(['id', 'name']).execute();

  if(!session.user.global_permissions.find(perm => perm.entity === "users") && !session.user.item_permissions.find(perm => perm.entity === "users" && perm.user === parseInt(id))) {
    notFound();
  }

  return (
    <EditUser user={user} isAdmin={true} permissionActions={permissionActions} permissionEntities={permissionEntities} />
  );
}
