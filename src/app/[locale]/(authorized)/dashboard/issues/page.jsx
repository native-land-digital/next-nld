import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres';
import Link from 'next/link'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import CreateIssue from '@/components/dashboard/create-issue'

export default async function Page({ params : { locale }, searchParams }) {

  setLocaleCache(locale);
  const tCommon = await getTranslations('Common');
  const t = await getTranslations('Dashboard');
  TimeAgo.addDefaultLocale(en)
  const timeAgo = new TimeAgo('en-US')

  let page = 0;
  if(searchParams.page) {
    page = Number(searchParams.page);
  }

  let totalQuery = db.selectFrom('Issue')
    .select((eb) => eb.fn.count('id').as('num_issues'))

  let query = db.selectFrom('Issue')
    .select((eb) => [
      'Issue.id', 'Issue.name', 'Issue.createdAt',
      jsonObjectFrom(
        eb.selectFrom('User')
          .select(['User.id', 'User.name'])
          .whereRef('User.id', '=', 'Issue.authorId')
      ).as('author'),
      jsonArrayFrom(
        eb.selectFrom('IssueCategory')
          .innerJoin('CategoriesOnIssues', 'IssueCategory.id', 'CategoriesOnIssues.categoryId')
          .innerJoin('Issue', 'CategoriesOnIssues.issueId', 'Issue.id')
          .select(['IssueCategory.id', 'IssueCategory.name'])
      ).as('categories'),
      eb.selectFrom('IssueComment')
        .whereRef('IssueComment.issueId', '=', 'Issue.id')
        .select(eb.fn.count('IssueComment.id').as('totalComments'))
        .as('total_comments')
    ])
    .orderBy('Issue.createdAt', 'desc')
    .limit(25)
    .offset(25 * page)

  if(searchParams.search) {
    query = query.where((eb) => eb(eb.fn('lower', 'name'), 'like', `%${searchParams.search.toLowerCase()}%`));
    totalQuery = totalQuery.where((eb) => eb(eb.fn('lower', 'name'), 'like', `%${searchParams.search.toLowerCase()}%`));
  }

  const issues = await query.execute()
  const totalIssues = await totalQuery.execute()

  return (
    <div>
      <h2 className="font-semibold text-3xl">{t('issues')}</h2>
      <hr className="mt-3 mb-3" />
      <div className="w-full mb-5 bg-gray-100 p-2.5 rounded">
        <div className="grid grid-cols-4 gap-2.5">
          <form className="grid grid-cols-4 md:grid-cols-5 col-span-4 md:col-span-3 gap-2.5">
            <div className="col-span-3 md:col-span-2">
              <input type="text" defaultValue={searchParams.search ? searchParams.search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
            </div>
            <div className="col-span-3 md:col-span-2">
              <button className="border border-gray-300 px-4 py-3 rounded md:ml-2.5 mr-2.5 text-sm">{tCommon('search')}</button>
              {searchParams.search ?
                <Link prefetch={false} className="inline-block border border-gray-300 px-4 py-3 rounded" href="/dashboard/issues">{tCommon('clear')}</Link>
              : false}
            </div>
          </form>
          <div className="col-span-4 md:col-span-1 text-sm justify-end">
            <CreateIssue />
          </div>
        </div>
      </div>
      <p className="mb-2.5 text-sm">{totalIssues[0].num_issues} issues.</p>
      {issues.map((issue, i) => {
        return (
          <div className="rounded shadow w-full mb-2.5 p-2.5 border-2 border-slate-100" key={`issue-${i}`}>
            <div className="float-right">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" className="bi bi-chat-left inline-block" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              </svg>
              <p className="inline-block text-sm ml-1.5">{issue.total_comments}</p>
            </div>
            <Link prefetch={false} href={`/dashboard/issues/${issue.id}`} className="text-black hover:text-blue-600">
              <h5 className="font-bold text-xl">{issue.name}</h5>
            </Link>
            <p className="text-sm">{issue.author.name}, {timeAgo.format(issue.createdAt)}</p>
          </div>
        )
      })}

      {issues.length >= 24 || page > 0 ?
        <nav className="flex items-center mt-2.5" aria-label="Pagination">
          {page > 0 ?
            <form>
              <input type="hidden" name="page" value={page - 1} />
              <button type="submit" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous">
                <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span>{tCommon('prev')}</span>
              </button>
            </form>
          : false}
          {issues.length >= 24 ?
            <form>
              <input type="hidden" name="page" value={page + 1} />
              <button type="submit" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                <span>{tCommon('next')}</span>
                <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </button>
            </form>
          : false}
        </nav>
      : false}
    </div>
  );
}
