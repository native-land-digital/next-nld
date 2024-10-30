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

    	if (!body.name) {
    		return NextResponse.json({ error : "Please provide a name for the category" }, { status: 400 });
    	}

      try {

        const issueCategory = await db.insertInto('IssueCategory')
        	.values({
            name : body.name
          })
        	.returningAll()
        	.execute()

  			return NextResponse.json({ issueCategory });

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
