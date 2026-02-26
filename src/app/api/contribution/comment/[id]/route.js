import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const PATCH = async (req, route) => {
  const token = await getToken({ req })

  if (token && token.id) {

	  const { id: commentId } = route.params;

		if(token.global_permissions.find(perm => perm.entity === "contributions")) {
      const body = await req.json();

   	  if (!body.commentId === "" || parseInt(commentId) !== parseInt(body.commentId)) {
    		return NextResponse.json({ error : "You are trying to edit a comment that doesn't exist." }, { status: 400 });
      }

      const existingComment = await db.selectFrom('ContributionComment')
        .select(['id', 'authorId'])
        .where('id', '=', parseInt(commentId))
        .executeTakeFirst()

      if (!existingComment) {
        return NextResponse.json({ error: "The comment you are trying to edit doesn't exist." }, { status: 400 });
      }

      if (existingComment.authorId !== token.id) {
    		return NextResponse.json({ error : "You do not have permission to edit this comment." }, { status: 400 });
      }

      try {
	      // Inserting into db
				await db.updateTable('ContributionComment')
          .set({
            updatedAt: new Date(),
	  				comment: body.comment
          })
          .where('id', '=', parseInt(commentId))
				  .execute()

	  		return NextResponse.json({
	  			id : existingComment.id
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
