import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";

export const GET = async () => {

	const users = await db.selectFrom('User')
		.select(['id', 'permissions'])
		.execute()

  const permissionActions = await db.selectFrom('PermissionAction').select(['id', 'name']).execute();
  const permissionEntities = await db.selectFrom('PermissionEntity').select(['id', 'name']).execute();

	if(users) {

    for (const user of users) {

      for(const permissionIndex in user.permissions) {

        const permission = user.permissions[permissionIndex];
        const thisEntity = permissionEntities.find(entity => entity.name === permission);
        const thisAction = permissionActions.find(action => action.name === "update");

        if(thisEntity) {
        	const permissionExists = await db.selectFrom('GlobalPermission')
            .where('actionId', '=', thisAction.id)
            .where('entityId', '=', thisEntity.id)
            .where('userId', '=', user.id)
        		.select(['id'])
        		.executeTakeFirst();
          if(!permissionExists) {
            await db.insertInto('GlobalPermission')
              .values({
                actionId: thisAction.id,
                entityId: thisEntity.id,
                userId : user.id
              })
              .execute();
          }
        }

      }
    }

    return NextResponse.json({ updated : true });
	} else {
    return NextResponse.json({ error : "No users found." }, { status: 400 });
	}
}
