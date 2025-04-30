import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import slugify from 'slugify'

export const GET = async (req) => {
	const secret = req.nextUrl.searchParams.get('secret');

	if(secret === process.env.MOBILE_APP_SECRET) {

		try {

		  let entries = db.selectFrom('Entry')
		    .select(['id', 'name', 'category'])
		    .distinctOn('id')
		    .orderBy('name')
				.execute();

	    return NextResponse.json(entries);

	  } catch (error) {
	    console.error(error);
	    return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
	  }
	} else {
	 	return NextResponse.json({ error : `This is an endpoint only meant for the mobile app.` }, { status: 500 });
	}
}

export const POST = async (req) => {
  const token = await getToken({ req })

	if(token && token.id) {

		if(token.global_permissions.find(perm => perm.entity === "research")) {
			const body = await req.json();

	  	if (!body.name) {
	  		return NextResponse.json({ error : "Please provide a name" }, { status: 400 });
	  	}

	  	try {
	      // Creating unique slug
	      let slug = slugify(body.name, { lower : true });
	      const slugSuffix = "-";
	      let slugNumber = 1;
	      let slugIsUnique = false;
	      while(!slugIsUnique) {
	        const currentSlug = slug + (slugNumber > 1 ? (slugSuffix + slugNumber.toString()) : "")

			    const foundSlug = await db.selectFrom('Entry')
			      .where('slug', '=', currentSlug)
			      .select(['id'])
			      .executeTakeFirst()

	        if(!foundSlug) {
	          slugIsUnique = true;
	          slug = currentSlug;
	        } else {
	          slugNumber = slugNumber + 1;
	        }
	      }

	      // Inserting into db
				const [entry] = await db.insertInto('Entry')
				  .values({
	  				name: body.name,
	          slug : slug,
						color : randomHslToHex(),
						updatedAt: new Date()
				  })
					.returningAll()
				  .execute()

				if(body.type === 'polygon') {
					// let polyGeometry = { type : "Polygon", coordinates : [] }
					await db.insertInto('Polygon')
						.values({
							geometry: null,
							entryId : parseInt(entry.id),
						})
						.execute();
				}
				if(body.type === 'line') {
					// let lineGeometry = { type : "LineString", coordinates : [] }
					await db.insertInto('Line')
						.values({
							geometry: null,
							entryId : parseInt(entry.id),
						})
						.execute();
				}
				if(body.type === 'point') {
					// let pointGeometry = { type : "Point", coordinates : [] }
					await db.insertInto('Point')
						.values({
							geometry: null,
							entryId : parseInt(entry.id),
						})
						.execute();
				}

	  		return NextResponse.json({
	  			id : entry.id
	  		});
	  	} catch (error) {
	  		console.error(error);
	  		return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
	  	}
		} else {
	    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
		}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }
}

const randomHslToHex = () => {
	let h = (360 * Math.random());
	let s = 70;
	let l = 72;
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
