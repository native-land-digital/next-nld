import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import { notFound } from 'next/navigation';
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/root/auth";
import { setLocaleCache } from '@/i18n/server-i18n';
import EditContribution from '@/components/dashboard/edit-contribution'

export const revalidate = false;

export default async function Page({ params : { locale, id } }) {

  setLocaleCache(locale);
  const session = await getServerSession(authOptions);

  const contribution = await db.selectFrom('Contribution')
    .where('Contribution.id', '=', parseInt(id))
    .leftJoin('Contribution', 'Polygon.entryId', 'Entry.id')
    .leftJoin('Line', 'Line.entryId', 'Entry.id')
    .leftJoin('Point', 'Point.entryId', 'Entry.id')
    .select((eb) => [
      'Contribution.id', 'Contribution.name', 'Contribution.open', 'Contribution.createdAt',
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
          .whereRef('Contribution.id', '=', 'ContributionComment.contributionId')
      ).as('comments'),
      jsonArrayFrom(
        eb.selectFrom('CategoriesOnContributions')
          .innerJoin('ContributionCategory', 'ContributionCategory.id', 'CategoriesOnContributions.categoryId')
          .select(['ContributionCategory.id', 'ContributionCategory.name', 'ContributionCategory.color'])
          .whereRef('Contribution.id', '=', 'CategoriesOnContributions.contributionId')
      ).as('categories')
    ])
    .executeTakeFirst()

  if(!session.user.global_permissions.find(perm => perm.entity === "contributions") && !session.user.item_permissions.find(perm => perm.entity === "contributions" && perm.entry === parseInt(id))) {
    notFound();
  }

  if(!contribution) {
    notFound();
  }

  return (
    <EditContribution contribution={contribution} />
  );
}
