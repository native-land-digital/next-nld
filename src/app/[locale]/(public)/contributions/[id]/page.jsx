import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import SubHeader from '@/components/nav/sub-header'
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import { authOptions } from "@/root/auth";
import { HeaderSessionProvider } from '@/lib/auth/session-provider'
import { getServerSession } from "next-auth/next"

import AddComment from '@/components/contributions/add-comment';
import EditComment from '@/components/contributions/edit-comment';

export default async function Page({ params : { locale, id }}) {

  setLocaleCache(locale);
  const session = await getServerSession(authOptions);
  const t = await getTranslations('Contributions');

  const contribution = await db.selectFrom('Contribution')
    .where('Contribution.id', '=', parseInt(id))
    .select((eb) => [
      'Contribution.id', 'Contribution.name', 'Contribution.open', 'Contribution.createdAt', 'Contribution.stageId',
      jsonObjectFrom(
        eb.selectFrom('User')
          .select(['User.id', 'User.name', 'User.organization'])
          .whereRef('User.id', '=', 'Contribution.authorId')
      ).as('author'),
      jsonArrayFrom(
        eb.selectFrom('UsersOnContributions')
          .innerJoin('User', 'User.id', 'UsersOnContributions.userId')
          .select(['User.id', 'User.name', 'User.organization'])
          .whereRef('Contribution.id', '=', 'UsersOnContributions.contributionId')
      ).as('assignedUsers'),
      jsonObjectFrom(
        eb.selectFrom('ContributionStage')
          .select(['ContributionStage.id', 'ContributionStage.name', 'ContributionStage.color'])
          .whereRef('ContributionStage.id', '=', 'Contribution.stageId')
      ).as('stage'),
      jsonArrayFrom(
        eb.selectFrom('ContributionComment')
          .select((eb) => [
            'ContributionComment.id', 'ContributionComment.comment', 'ContributionComment.createdAt', 'ContributionComment.updatedAt',
            jsonObjectFrom(
              eb.selectFrom('User')
                .select(['User.id', 'User.name', 'User.organization'])
                .whereRef('User.id', '=', 'ContributionComment.authorId')
            ).as('author'),
            jsonArrayFrom(
              eb.selectFrom('ContributionMedia')
                .select(['ContributionMedia.id', 'ContributionMedia.url'])
                .whereRef('ContributionComment.id', '=', 'ContributionMedia.contributionCommentId')
            ).as('media'),
          ])
          .orderBy('ContributionComment.createdAt')
          .whereRef('Contribution.id', '=', 'ContributionComment.contributionId')
      ).as('comments'),
      jsonArrayFrom(
        eb.selectFrom('CategoriesOnContributions')
          .innerJoin('ContributionCategory', 'ContributionCategory.id', 'CategoriesOnContributions.categoryId')
          .select(['ContributionCategory.id', 'ContributionCategory.name', 'ContributionCategory.color'])
          .whereRef('Contribution.id', '=', 'CategoriesOnContributions.contributionId')
      ).as('categories'),
      jsonArrayFrom(
        eb.selectFrom('EntriesOnContributions')
          .innerJoin('Entry', 'Entry.id', 'EntriesOnContributions.entryId')
          .select(['Entry.id', 'Entry.name'])
          .whereRef('Contribution.id', '=', 'EntriesOnContributions.contributionId')
      ).as('entries')
    ])
    .executeTakeFirst()

  return (
    <div className="bg-white pb-5">
      <SubHeader
        title={contribution.name}
        crumbs={[{ url : "/contributions", title : "Contributions" }]}
      />
      <HeaderSessionProvider>
        <div className="w-full lg:w-3/5 min-h-screen m-auto mt-12 text-black">
          <div className="col-span-2 mt-5">
            <div className="pb-4 break-words">
              {/* <div className="mt-4">
                <div className="mt-2 text-xs py-1 px-2 bg-gray-200 rounded-lg">{contribution.stage.name}</div>
              </div>*/}
              <h1 className="text-lg font-semibold text-center">{contribution.name}</h1>
            </div>
            <div>
              {contribution.comments.map((comment, i) => {
                return (
                  <div key={`comment-${i}`} className="mb-4">
                    <div key={`comment-${i}`} className="border border-gray-100 rounded-lg p-4 shadow-sm">
                      <EditComment comment={comment} />
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="text-left text-[10px] mt-1 text-gray-400 italic">
                      </div>
                      <div className="text-right text-[10px] mt-1 text-gray-400 italic">
                        {comment.author.name} ({new Date(comment.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })})
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <AddComment contributionId={contribution.id} />
          </div>
        </div>
      </HeaderSessionProvider>
    </div>
  );
}
