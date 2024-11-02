import { db } from '@/lib/db/kysely'
import { headers } from 'next/headers'
import { NextResponse } from "next/server";

export const GET = async (req, route) => {
  try {

    const search = req.nextUrl.searchParams.get('s');

    const entries = await db.selectFrom('Entry')
      .where((eb) => eb.or([
        eb(eb.fn('lower', 'Entry.name'), 'like', `%${search.toLowerCase()}%`),
        eb(eb.fn('lower', 'Entry.slug'), 'like', `%${search.toLowerCase()}%`),
      ]));
      .select(['Entry.id', 'Entry.name', 'Entry.category'])
      .limit(5)
      .execute();

    if(entries) {
      return NextResponse.json(entries);
    } else {
      return NextResponse.json({ error : `No entries found with this id` }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
  }
}
