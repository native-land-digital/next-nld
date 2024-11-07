import { db } from '@/lib/db/kysely'
import { headers } from 'next/headers'
import { NextResponse } from "next/server";

export const GET = async (req, route) => {
  const referer = headers().get('referer');
  if(referer && referer.indexOf(process.env.NEXTAUTH_URL) > -1) {

    try {

      const type = req.nextUrl.searchParams.get('type');
      const search = req.nextUrl.searchParams.get('s');

      let results = [];
      if(type === 'users') {
        results = await db.selectFrom('User')
          .where((eb) => eb.or([
            eb(eb.fn('lower', 'User.name'), 'like', `%${search.toLowerCase()}%`)
          ]))
          .select(['User.id', 'User.name'])
          .limit(5)
          .execute();
      }
      if(type === 'entries') {
        results = await db.selectFrom('Entry')
          .where((eb) => eb.or([
            eb(eb.fn('lower', 'Entry.name'), 'like', `%${search.toLowerCase()}%`),
            eb(eb.fn('lower', 'Entry.slug'), 'like', `%${search.toLowerCase()}%`),
          ]))
          .select(['Entry.id', 'Entry.name', 'Entry.category'])
          .limit(5)
          .execute();
      }
      if(type === 'issue-categories') {
        results = await db.selectFrom('IssueCategory')
          .where((eb) => eb.or([
            eb(eb.fn('lower', 'IssueCategory.name'), 'like', `%${search.toLowerCase()}%`),
          ]))
          .select(['IssueCategory.id', 'IssueCategory.name'])
          .limit(5)
          .execute();
      }

      if(results.length > 0) {
        return NextResponse.json(results);
      } else {
        return NextResponse.json({ error : `No results found` }, { status: 400 });
      }

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `This is a endpoint restricted to Native Land only` }, { status: 500 });
  }
}
