import { db } from '@/lib/db/kysely'
import { headers } from 'next/headers'
import { NextResponse } from "next/server";

export const GET = async (req, route) => {
  try {

    const search = req.nextUrl.searchParams.get('s');

    const users = await db.selectFrom('User')
      .where((eb) => eb.or([
        eb(eb.fn('lower', 'User.name'), 'like', `%${search.toLowerCase()}%`)
      ]));
      .select(['User.id', 'User.name'])
      .limit(5)
      .execute();

    if(users) {
      return NextResponse.json(users);
    } else {
      return NextResponse.json({ error : `No users found` }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
  }
}
