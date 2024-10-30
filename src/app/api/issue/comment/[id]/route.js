import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const PATCH = async (req) => {

  const token = await getToken({ req })

  if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

    if(user.permissions.includes('issues')) {

    	const body = await req.json();

      if (!body.id) {
    		return NextResponse.json({ error : "No comment ID provided" }, { status: 400 });
      }
    	if (!body.comment) {
    		return NextResponse.json({ error : "No comment text provided" }, { status: 400 });
    	}

      try {

        const issueComment = await db.updateTable('IssueComment')
          .set({
            comment : body.comment,
            updatedAt : new Date()
          })
          .where('id', '=', body.id)
        	.execute()

  			return NextResponse.json({ issueComment });

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

export const DELETE = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

		if(user.permissions.includes('issues')) {
  		const { id: commentId } = route.params;

  		try {

        const issueComment = await db.deleteFrom('IssueComment')
          .where('id', '=', Number(commentId))
          .execute();

  			return NextResponse.json({ issueComment });
  		} catch (error) {
  			console.error(error);

  			return NextResponse.json({ error : "Something went wrong deleting the comment" }, { status: 500 });
  		}
  	} else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  	}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
	}
}