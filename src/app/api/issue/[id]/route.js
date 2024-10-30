import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres';
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const GET = async (req, route) => {
  const token = await getToken({ req })

  if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

    if(user.permissions.includes('issues')) {
  		const { id: issueId } = route.params;

      try {

        const issue = await db.selectFrom('Issue')
          .where('Issue.id', '=', parseInt(issueId))
          .select((eb) => [
            'Issue.name', 'Issue.open', 'Issue.createdAt',
            jsonObjectFrom(
              eb.selectFrom('User')
                .select(['User.id', 'User.name'])
                .whereRef('User.id', '=', 'Issue.authorId')
            ).as('author'),
            jsonObjectFrom(
              eb.selectFrom('Entry')
                .select(['Entry.id', 'Entry.name', 'Entry.category'])
                .whereRef('Entry.id', '=', 'Issue.entryId')
            ).as('entry'),
            jsonArrayFrom(
              eb.selectFrom('User')
                .innerJoin('UsersOnIssues', 'User.id', 'UsersOnIssues.userId')
                .innerJoin('Issue', 'UsersOnIssues.issueId', 'Issue.id')
                .select(['User.id', 'User.name'])
                .where('Issue.id', '=', parseInt(issueId))
            ).as('users'),
            jsonArrayFrom(
              eb.selectFrom('IssueCategory')
                .innerJoin('CategoriesOnIssues', 'IssueCategory.id', 'CategoriesOnIssues.categoryId')
                .innerJoin('Issue', 'CategoriesOnIssues.issueId', 'Issue.id')
                .select(['IssueCategory.id', 'IssueCategory.name'])
                .where('Issue.id', '=', parseInt(issueId))
            ).as('categories'),
            jsonArrayFrom(
              eb.selectFrom('IssueComment')
                .whereRef('IssueComment.issueId', '=', 'Issue.id')
                .innerJoin('User', 'User.id', 'IssueComment.authorId')
                .select((eb) => [
                  'IssueComment.id', 'IssueComment.comment', 'IssueComment.createdAt', 'IssueComment.updatedAt',
                  'User.name as authorName', 'User.id as authorId',
                  jsonArrayFrom(
                    eb.selectFrom('IssueMedia')
                      .select(['IssueMedia.id', 'IssueMedia.url'])
                      .whereRef('IssueMedia.issueCommentId', '=', 'IssueComment.id')
                  ).as('media')
                ])
                .orderBy('IssueComment.createdAt')
            ).as('comments')
          ])
          .executeTakeFirst();

        return NextResponse.json(issue);

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
  		const { id: issueId } = route.params;

  		try {

        const issue = await db.deleteFrom('Issue')
          .where('id', '=', Number(issueId))
          .execute();

  			return NextResponse.json({ issue });

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
