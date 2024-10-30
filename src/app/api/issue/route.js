import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const GET = async (req) => {
  const token = await getToken({ req })

  if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

    if(user.permissions.includes('issues')) {

      try {

        let issues = db.selectFrom('Issue')
          .select(['id', 'name', 'category'])
          .distinctOn('id')
          .orderBy('updatedAt')
          .execute();

        return NextResponse.json(issues);

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

export const POST = async (req) => {

  let isNewUser = true;
  const token = await getToken({ req })
  if(token && token.id) {
    isNewUser = false;
  }

	const body = await req.json();

	if (!body.name) {
		return NextResponse.json({ error : "Please provide a name for the issue" }, { status: 400 });
	}
	if (!body.comment) {
		return NextResponse.json({ error : "Please provide a description for the issue" }, { status: 400 });
	}

  if(isNewUser) {
		if (!body.newEmail || body.newEmail.length < 4) {
			return NextResponse.json({ error : "Please provide a valid email" }, { status: 400 });
		}
		if (!body.newName) {
			return NextResponse.json({ error : "Please provide your name" }, { status: 400 });
		}
  }

	try {

    let userId = null;
    if(isNewUser) {
	    const userExists = await db.selectFrom('User')
	      .where('email', '=', body.newEmail)
	      .select(['id'])
	      .executeTakeFirst()

      if(userExists) {

        userId = userExists.id;
        isNewUser = false;

      } else {

				const verification_key = uuidv4()
				const randomPassword = uuidv4()
				const newUser = await db.insertInto('User')
					.values({
						email: body.newEmail,
						name: body.newName,
						organization : body.newOrganization,
						verification_key : verification_key,
						password: hashPassword(randomPassword)
					})
					.returningAll()
					.execute()

        userId = newUser.id;

      }
    } else {
      userId = token.id;
    }

    let issueValues = {
      name : body.name,
      authorId : userId,
      createdAt : new Date()
    }
    if(body.entryId) {
      issueValues.entryId = body.entryId;
    }

    let newIssue = false;
    await db.transaction().execute(async (trx) => {

      newIssue = await trx.insertInto('Issue')
  			.values(issueValues)
  			.returningAll()
  			.executeTakeFirst()

      await trx.insertInto('UsersOnIssues')
  			.values({
          issueId : newIssue.id,
          userId : userId
        })
  			.execute()

      if(body.categories.length > 0) {
        for (const category of body.categories) {
          await trx.insertInto('CategoriesOnIssues')
      			.values({
              issueId : newIssue.id,
              categoryId : category.id
            })
      			.returningAll()
      			.execute()
        }
      }

      await trx.insertInto('IssueComment')
  			.values({
          issueId : newIssue.id,
          createdAt : new Date(),
          updatedAt : new Date(),
          authorId : userId,
          comment : body.comment
        })
  			.execute()
    })

    const issue = await db.selectFrom('Issue')
      .where('id', '=', newIssue.id)
      .select(['id'])
      .executeTakeFirst()

    if(isNewUser) {
			await sendEmail({
			   to: body.anonEmail,
			   subject: 'Native Land Digital has recieved your issue',
			   react: React.createElement(IssueRecievedTemplate, { email: body.anonEmail, name : body.anonName }),
		  })
    }

		return NextResponse.json(issue);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
	}
}
