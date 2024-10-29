import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const POST = async (req) => {

  const token = await getToken({ req })
  if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

    if(user.permissions.includes('issues')) {

    	const body = await req.json();
    	if (!body.comment) {
    		return NextResponse.json({ error : "Please provide a body for the comment" }, { status: 400 });
    	}
    	if (!body.issueId) {
    		return NextResponse.json({ error : "This comment must belong to an existing issue" }, { status: 400 });
    	}

  		const issueComment = await db.insertInto('IssueComment')
  			.values({
          issueId : body.issueId,
          createdAt : new Date(),
          updatedAt : new Date(),
          authorId : token.id,
          comment : body.comment
        })
  			.returningAll()
  			.execute()

      return NextResponse.json(issueComment);

    } else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }
}
