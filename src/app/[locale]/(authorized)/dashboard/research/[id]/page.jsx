import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import { notFound } from 'next/navigation';
import { getServerSession } from "next-auth/next"

import { authOptions } from "@/root/auth";
import { setLocaleCache } from '@/i18n/server-i18n';
import EditEntry from '@/components/dashboard/edit-entry'

export const revalidate = false;

export default async function Page({ params : { locale, id } }) {

  setLocaleCache(locale);
  const session = await getServerSession(authOptions);

  const entry = await db.selectFrom('Entry')
    .where('Entry.id', '=', parseInt(id))
    .leftJoin('Polygon', 'Polygon.entryId', 'Entry.id')
    .leftJoin('Line', 'Line.entryId', 'Entry.id')
    .leftJoin('Point', 'Point.entryId', 'Entry.id')
    .select((eb) => [
      'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug', 'Entry.color', 'Entry.published', 'Entry.sources', 'Entry.disclaimer', 'Entry.createdAt', 'Entry.updatedAt',
      eb.fn('COALESCE', [
        eb.fn('ST_AsGeoJSON', 'Polygon.geometry'),
        eb.fn('ST_AsGeoJSON', 'Line.geometry'),
        eb.fn('ST_AsGeoJSON', 'Point.geometry')
      ]).as('geometry'),
      eb.case()
        .when('Polygon.entryId', 'is not', null).then('Polygon')
        .when('Line.entryId', 'is not', null).then('Line')
        .when('Point.entryId', 'is not', null).then('Point')
        .end()
      .as('geometry_type'),
      jsonArrayFrom(
        eb.selectFrom('Pronunciation')
          .select(['id', 'url', 'text'])
          .whereRef('Pronunciation.entryId', '=', 'Entry.id')
      ).as('pronunciations'),
      jsonObjectFrom(
        eb.selectFrom('Verification')
          .select(['id', 'verified', 'details', 'updatedAt'])
          .whereRef('Verification.entryId', '=', 'Entry.id')
      ).as('verification'),
      jsonArrayFrom(
        eb.selectFrom('Greeting')
          .select(['id', 'url', 'text', 'translation', 'usage', 'parentId'])
          .whereRef('Greeting.entryId', '=', 'Entry.id')
      ).as('greetings'),
      jsonArrayFrom(
        eb.selectFrom('Media')
          .select(['id', 'url', 'caption', 'title'])
          .whereRef('Media.entryId', '=', 'Entry.id')
      ).as('media'),
      jsonArrayFrom(
        eb.selectFrom('Website')
          .select(['id', 'url', 'title'])
          .whereRef('Website.entryId', '=', 'Entry.id')
      ).as('websites'),
      jsonArrayFrom(
        eb.selectFrom('Change')
          .select(['id', 'createdAt', 'description'])
          .whereRef('Change.entryId', '=', 'Entry.id')
      ).as('changelog'),
      jsonArrayFrom(
        eb.selectFrom('Relation')
          .innerJoin('Entry as RelatedEntry', 'RelatedEntry.id', 'Relation.relatedToId')
          .select([
            'Relation.id as id', 'Relation.description as description',
            'RelatedEntry.id as relatedToId', 'RelatedEntry.name as name', 'RelatedEntry.category as category', 'RelatedEntry.slug as slug'
          ])
          .whereRef('Relation.relatedFromId', '=', 'Entry.id')
      ).as('relatedTo')
    ])
    .executeTakeFirst()

  if(!session.user.global_permissions.find(perm => perm.entity === "research") && !session.user.item_permissions.find(perm => perm.entity === "research" && perm.entry === parseInt(id))) {
    notFound();
  }

  if(entry) {
    if(entry.geometry) {
      entry.geometry = JSON.parse(entry.geometry)
    }
  } else {
    notFound();
  }

  return (
    <EditEntry entry={entry} />
  );
}
