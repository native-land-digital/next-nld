import { db } from '@/lib/db/kysely'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import { notFound } from 'next/navigation';

import Map from '@/components/maps/map';
import Websites from '@/components/maps/websites';
import Related from '@/components/maps/related';
import Media from '@/components/maps/media';
import Changelog from '@/components/maps/changelog';

export const generateStaticParams = async () => {
  if(process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'production') {
    const entries = await db.selectFrom('Entry')
      .where('published', '=', true)
      .select(['id', 'category', 'slug'])
      .distinctOn('id')
      .execute();

    return entries.map(entry => {
      return {
        locale : 'en',
        category : entry.category,
        slug : encodeURIComponent(entry.slug).toLowerCase()
      }
    })
  } else {
    return [];
  }
}

export const revalidate = false;

export default async function Page({ params : { locale, category, slug }}) {

  setLocaleCache(locale);
  const t = await getTranslations('Maps');

  const entry = await db.selectFrom('Entry')
    .where('slug', '=', slug.toLowerCase())
    .where('category', '=', category)
    .where('published', '=', true)
    .leftJoin('Polygon', 'Polygon.entryId', 'Entry.id')
    .select((eb) => [
      'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug', 'Entry.sources', 'Entry.pronunciation', 'Entry.createdAt', 'Entry.updatedAt',
      eb.fn('ST_AsGeoJSON', 'Polygon.geometry').as('geometry'),
      jsonArrayFrom(
        eb.selectFrom('Media')
          .select(['url', 'caption', 'title'])
          .whereRef('Media.entryId', '=', 'Entry.id')
      ).as('media'),
      jsonArrayFrom(
        eb.selectFrom('Website')
          .select(['url', 'title'])
          .whereRef('Website.entryId', '=', 'Entry.id')
      ).as('websites'),
      jsonArrayFrom(
        eb.selectFrom('Change')
          .select(['createdAt', 'description'])
          .whereRef('Change.entryId', '=', 'Entry.id')
      ).as('changelog'),
      jsonArrayFrom(
        eb.selectFrom('Relation')
          .innerJoin('Entry as RelatedEntry', 'RelatedEntry.id', 'Relation.relatedFromId')
          .select([
            'Relation.description as description',
            'RelatedEntry.name as name', 'RelatedEntry.category as category', 'RelatedEntry.slug as slug'
          ])
          .whereRef('Relation.relatedToId', '=', 'Entry.id')
      ).as('relatedFrom'),
      jsonArrayFrom(
        eb.selectFrom('Relation')
          .innerJoin('Entry as RelatedEntry', 'RelatedEntry.id', 'Relation.relatedToId')
          .select([
            'Relation.description as description',
            'RelatedEntry.name as name', 'RelatedEntry.category as category', 'RelatedEntry.slug as slug'
          ])
          .whereRef('Relation.relatedFromId', '=', 'Entry.id')
      ).as('relatedTo')
    ])
    .executeTakeFirst()

  if(entry) {
    if(entry.geometry) {
      entry.geometry = JSON.parse(entry.geometry)
    }
  } else {
    notFound();
  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={entry.name} crumbs={[{ url : "/maps", title : "Maps" }, { url : `/maps/${entry.category}`, title : entry.category }]} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 min-h-screen w-full md:w-2/3 px-5 md:px-0 m-auto -mt-12 text-black">
        <Sidebar picks={3}>
          <ol className="hidden md:block list-inside text-gray-400">
            <li className="mb-2.5"><a href="#map">{t('map')}</a></li>
            <li className="mb-2.5"><a href="#websites">{t('websites')}</a></li>
            <li className="mb-2.5"><a href="#media">{t('media')}</a></li>
            <li className="mb-2.5"><a href="#sources">{t('sources')}</a></li>
            <li className="mb-2.5"><a href="#related-maps">{t('related')}</a></li>
            <li className="mb-2.5"><a href="#changelog">{t('changelog')}</a></li>
            <li className="mb-2.5"><a href="#send-correction">{t('correction')}</a></li>
          </ol>
          <span />
        </Sidebar>
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <Map geometry={entry.geometry} />
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="websites">{t('websites')}</h3>
            <Websites websites={entry.websites} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="related-maps">{t('related')}</h3>
            <Related relatedTo={entry.relatedTo} relatedFrom={entry.relatedFrom} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="media">{t('media')}</h3>
            <Media media={entry.media} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="sources">{t('sources')}</h3>
            <div className="sources-text" dangerouslySetInnerHTML={{ __html : entry.sources }} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="changelog">{t('changelog')}</h3>
            <Changelog changelog={entry.changelog} createdAt={entry.createdAt} updatedAt={entry.updatedAt} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="send-correction">{t('correction')}</h3>
            <p>{t('contact')}</p>
          </section>

        </div>
      </div>
    </div>
  );
}
