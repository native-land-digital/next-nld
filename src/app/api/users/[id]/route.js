import { db } from '@/lib/db/kysely'
import { submitRevalidation } from '@/lib/actions'
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export const PATCH = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

    const { id: userId } = route.params;

		if(user.permissions.includes('manage_users') || parseInt(userId) === token.id) {
  		const body = await req.json();

  		try {

        await db.updateTable('User')
          .set(body)
          .where('id', '=', parseInt(userId))
          .execute()

        submitRevalidation(`/dashboard/users/${userId}`);

  			return NextResponse.json({ user });
  		} catch (error) {
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

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

  	if(user && user.permissions.includes('manage_users')) {
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
