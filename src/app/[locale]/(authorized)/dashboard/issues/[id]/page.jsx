import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres';
import Link from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SetCategories from '@/components/dashboard/issues/set-categories';

export default async function Page({ params : { locale, id : issueId } }) {

  setLocaleCache(locale);
  const t = await getTranslations('Dashboard');
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-US')

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

  return (
    <div>
      <h1 className="font-semibold text-3xl">{issue.name}</h1>
      <p className="text-sm">{issue.author.name}, {timeAgo.format(issue.createdAt)}</p>
      {issue.open ?
        <div className="my-2.5"><span className="rounded-full shadow bg-green-800 text-white p-2.5 my-2.5 text-sm">Open</span></div>
      :
        <div className="my-2.5"><span className="rounded-full shadow bg-red-800 text-white p-2.5 my-2.5 text-sm">Closed</span></div>
      }
      <div className="grid grid-cols-4 pt-2.5 gap-2.5">
        <div className="col-span-3">
          {issue.comments.map((comment, i) => {
            return (
              <div className="rounded shadow w-full" key={`comment-${i}`}>
                <div className="w-full bg-slate-200 p-2.5">{comment.authorName}, {timeAgo.format(new Date(comment.createdAt))}</div>
                <div className="p-2.5 mb-2.5" dangerouslySetInnerHTML={{ __html : comment.comment}} />
              </div>
            )
          })}
        </div>
        <div className="col-span-1">
          <div className="mb-2.5">
            <h3 className="text-xs">Users</h3>
            <div className="text-sm mt-2.5">
              {issue.users.length > 0 ?
                <div>
                  {issue.users.map((user, i) => {
                    return (
                      <p>{user.name}</p>
                    )
                  })}
                </div>
              :
                <p>No related users.</p>
              }
            </div>
          </div>
          <hr className="my-2.5"/>
          <SetCategories issueId={issue.id} categories={issue.categories} />
          <hr className="my-2.5"/>
          <div>
            <h3 className="text-xs">Related To</h3>
            <div className="text-sm mt-2.5">
              {issue.entry ?
                <p>{issue.entry.name}</p>
              :
                <p>No related entry.</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
