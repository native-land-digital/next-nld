import { db } from '@/lib/db/kysely'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import { notFound } from 'next/navigation';
import { getServerSession } from "next-auth/next"

import { hasResearchPermission, allowedResearchIDs } from '@/lib/auth/permissions'
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
    .select((eb) => [
      'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug', 'Entry.color', 'Entry.published', 'Entry.sources', 'Entry.pronunciation', 'Entry.createdAt', 'Entry.updatedAt',
      eb.fn('ST_AsGeoJSON', 'Polygon.geometry').as('geometry'),
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

  // Checking for specific permissions
  let userQuery = await db.selectFrom('User')
    .where('id', '=', session.user.id)
    .select(['permissions'])
    .executeTakeFirst();

  if(hasResearchPermission(userQuery.permissions) && !userQuery.permissions.includes('research')) {
    let allowedIDs = allowedResearchIDs(userQuery.permissions);
    if(allowedIDs.indexOf(entry.id) == -1) {
      notFound();
    }
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
