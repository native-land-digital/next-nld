import { db } from '@/lib/db/kysely'
import { submitRevalidation } from '@/lib/actions'
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export const PATCH = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {

    const { id: userId } = route.params;

		if(token.global_permissions.find(perm => perm.entity === "users") || parseInt(userId) === token.id) {

  		const body = await req.json();

  		try {

        await db.transaction().execute(async (trx) => {

          // Deleting, updating, adding global permissions
          const globalPermissions = body.globalPermissions;
          const updatedGlobalPermissionIds = globalPermissions.map(perm => { return perm.id; });
          if(updatedGlobalPermissionIds.length > 0) {
            await trx.deleteFrom('GlobalPermission')
              .where('userId', '=', parseInt(userId))
              .where('id', 'not in', updatedGlobalPermissionIds)
              .execute();
          } else {
            await trx.deleteFrom('GlobalPermission')
              .where('userId', '=', parseInt(userId))
              .execute();
          }

          for (const globalPerm of globalPermissions) {
            const result = await trx.updateTable('GlobalPermission')
              .set({
                columnNames: globalPerm.columnNames,
              })
              .where('entityId', '=', globalPerm.entityId)
              .where('actionId', '=', globalPerm.actionId)
              .where('userId', '=', parseInt(userId))
              .executeTakeFirst();

            if(result.numUpdatedRows === 0n) {
              await trx.insertInto('GlobalPermission')
                .values({
                  columnNames: globalPerm.columnNames,
                  actionId: globalPerm.actionId,
                  entityId: globalPerm.entityId,
                  userId : parseInt(userId)
                })
                .execute();
            }
          }
          delete body.globalPermissions;

          // Deleting, updating, adding item permissions
          const itemPermissions = body.itemPermissions;
          const updatedItemPermissionIds = itemPermissions.map(perm => { return perm.id; });
          if(updatedItemPermissionIds.length > 0) {
            await trx.deleteFrom('ItemPermission')
              .where('userId', '=', parseInt(userId))
              .where('id', 'not in', updatedItemPermissionIds)
              .execute();
          } else {
            await trx.deleteFrom('ItemPermission')
              .where('userId', '=', parseInt(userId))
              .execute();
          }

          for (const itemPerm of itemPermissions) {
            const result = await trx.updateTable('ItemPermission')
              .set({
                columnNames: itemPerm.columnNames,
              })
              .where('entityId', '=', itemPerm.entityId)
              .where('actionId', '=', itemPerm.actionId)
              .where('entryId', '=', itemPerm.entryId)
              .where('userId', '=', parseInt(userId))
              .executeTakeFirst();

            if(result.numUpdatedRows === 0n) {
              await trx.insertInto('ItemPermission')
                .values({
                  columnNames: itemPerm.columnNames,
                  actionId: itemPerm.actionId,
                  entityId: itemPerm.entityId,
                  entryId: itemPerm.entryId,
                  userId : parseInt(userId)
                })
                .execute();
            }
          }
          delete body.itemPermissions;

          await db.updateTable('User')
            .set(body)
            .where('id', '=', parseInt(userId))
            .execute()

        })

        submitRevalidation(`/dashboard/users/${userId}`);

  			return NextResponse.json({ saved : true });
  		} catch (error) {
        console.log(error)
  			return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}`}, { status: 400 });
  		}
    } else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 400 });
  }
}

export const DELETE = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {

    if(token.global_permissions.find(perm => perm.entity === "users")) {
  		const { id: userId } = route.params;

  		try {

        await db.deleteFrom('User')
          .where('id', '=', parseInt(userId))
          .execute();

  			return NextResponse.json({ user });
  		} catch (error) {
  			return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
  		}
  	} else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  	}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
	}
}
