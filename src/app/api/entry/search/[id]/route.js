import { db } from '@/lib/db/kysely'
import { headers } from 'next/headers'
import { NextResponse } from "next/server";

export const GET = async (req, route) => {
  const referer = headers().get('referer');
  if(referer && referer.indexOf(process.env.NEXTAUTH_URL) > -1) {
    const { id: entryId } = route.params;
    try {

      const entry = await db.selectFrom('Entry')
        .where('id', '=', parseInt(entryId))
        .where('published', '=', true)
        .leftJoin('Polygon', 'Polygon.entryId', 'Entry.id')
        .select((eb) => [
          'Entry.id', 'Entry.name', 'Entry.category',
          eb.fn('ST_AsGeoJSON', db.fn('ST_Envelope', 'Polygon.geometry')).as('bounds')
        ])
        .executeTakeFirst();
        
      if(entry) {
  			try {
  				entry.bounds = JSON.parse(entry.bounds);
      		return NextResponse.json(entry);
  			} catch (err) {
  				console.log(`An error with parsing the geometry, ${JSON.stringify(err)}`)
  			}
      } else {
        return NextResponse.json({ error : `No entry found with this id` }, { status: 500 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
    }
	} else {
		return NextResponse.json({ error : `This is a endpoint restricted to Native Land only` }, { status: 500 });
	}
}
