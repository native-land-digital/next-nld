import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import slugify from 'slugify'

export const POST = async (req) => {
  const token = await getToken({ req })

	if(token && token.id) {

		if(token.global_permissions.find(perm => perm.entity === "contributions")) {
			const body = await req.json();

	  	if (!body.name) {
	  		return NextResponse.json({ error : "Please provide a name" }, { status: 400 });
	  	}

	  	try {
	      // Inserting into db
				const stage = await db.selectFrom('ContributionStage')
					.select(['id'])
					.where('name', "=", "Submitted")
					.executeTakeFirst();
				
					console.log(stage)

				const [contribution] = await db.insertInto('Contribution')
				  .values({
	  				name: body.name,
						stageId : stage.id,
						authorId : body.authorId
				  })
					.returningAll()
				  .execute()

	  		return NextResponse.json({
	  			id : contribution.id
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
