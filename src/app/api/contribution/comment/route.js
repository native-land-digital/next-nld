import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const POST = async (req) => {
  const token = await getToken({ req })

	if(token && token.id) {

		if(token.global_permissions.find(perm => perm.entity === "contributions")) {
			const body = await req.json();

   	  if (!body.contributionId === "") {
    		return NextResponse.json({ error : "You are trying to comment on a contribution that doesn't exist." }, { status: 400 });
      }
	  	if (!body.comment || body.comment === "") {
	  		return NextResponse.json({ error : "Please provide a comment." }, { status: 400 });
      }
      if (token.id !== body.authorId) {
        return NextResponse.json({ error : "You may be logged in incorrectly, try logging in again." }, { status: 400 });
      }

	  	try {
	      // Inserting into db
				const [comment] = await db.insertInto('ContributionComment')
          .values({
            contributionId: body.contributionId,
            createdAt: new Date(),
            updatedAt: new Date(),
	  				comment: body.comment,
						authorId : body.authorId
				  })
					.returningAll()
				  .execute()

	  		return NextResponse.json({
	  			id : comment.id
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
