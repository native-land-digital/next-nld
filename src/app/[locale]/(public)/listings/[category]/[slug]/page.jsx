import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import { notFound } from 'next/navigation';

import Map from '@/components/listings/map';
import Pronunciations from '@/components/listings/pronunciations';
import Greetings from '@/components/listings/greetings';
import Websites from '@/components/listings/websites';
import Related from '@/components/listings/related';
import Media from '@/components/listings/media';
import Changelog from '@/components/listings/changelog';
import Disclaimer from '@/components/listings/disclaimer';

export const generateStaticParams = async () => {
  if(process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'production') {
    const entries = await db.selectFrom('Entry')
      .where('published', '=', true)
      .where('category', '!=', 'placenames')
      .select(['id', 'category', 'slug'])
      .distinctOn('id')
      .execute();

    const entriesToGenerate = entries.map(entry => {
      return {
        locale : 'en',
        category : entry.category,
        slug : encodeURIComponent(entry.slug).toLowerCase()
      }
    })

    // Ensuring we create greetings from appropriate languages
    const greetingEntries = await db.selectFrom('Entry')
      .where('published', '=', true)
      .where('category', '=', 'languages')
      .select(['Entry.id', 'Entry.category', 'Entry.slug'])
      .innerJoin('Greeting', 'Entry.id', 'Greeting.entryId')
      .distinctOn('Entry.id')
      .execute();

    greetingEntries.forEach(entry => {
      entriesToGenerate.push({
        locale : 'en',
        category : 'greetings',
        slug : encodeURIComponent(entry.slug).toLowerCase()
      })
    })

    return entriesToGenerate;
  } else {
    return [];
  }
}

export const dynamic = 'force-static';
export const revalidate = false;

export default async function Page({ params : { locale, category, slug }}) {

  setLocaleCache(locale);
  const t = await getTranslations('Listings');

  let categoryToSearch = category;
  if(category === 'greetings') {
    categoryToSearch = 'languages';
  }

  const entry = await db.selectFrom('Entry')
    .where('slug', '=', slug.toLowerCase())
    .where('category', '=', categoryToSearch)
    .where('published', '=', true)
    .leftJoin('Polygon', 'Polygon.entryId', 'Entry.id')
    .leftJoin('Line', 'Line.entryId', 'Entry.id')
    .leftJoin('Point', 'Point.entryId', 'Entry.id')
    .select((eb) => [
      'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug', 'Entry.language', 'Entry.sources', 'Entry.disclaimer', 'Entry.createdAt', 'Entry.updatedAt',
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
    <div className="bg-white pb-5">
      <SubHeader 
        title={entry.name} 
        crumbs={[{ url : "/listings", title : "Listings" }, { url : `/listings/${category}`, title : category }]} 
        verification={entry.verification}
      />
      <div className="w-full md:w-3/5 min-h-screen m-auto mt-12 text-black">
        <div className="col-span-2 mt-5">
          <div className="px-4 pb-4 break-words">
            {category !== 'greetings' ?
              <div>
                <Map geometry={entry.geometry} geometry_type={entry.geometry_type} category={entry.category} />
                {entry.language && entry.language !== "" ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2" id="language">{t('language')}</h2>
                    <p>{entry.language}</p>
                  </section>
                : false}
                {entry.websites.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2" id="websites">{t('websites')}</h2>
                    <Websites websites={entry.websites} />
                  </section>
                : false}
                {entry.pronunciations.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2" id="pronunciations">{tDash('pronunciations')}</h2>
                    <Pronunciations pronunciations={entry.pronunciations} />
                  </section>
                : false}
                {entry.greetings.length > 0 ?
                  <section className="hidden mt-5">
                    <h2 className="nld-font-jost nld-font-h2" id="greetings">{t('greetings')}</h2>
                    <Greetings greetings={entry.greetings} />
                  </section>
                : false}
                {entry.relatedTo.length > 0 || entry.relatedFrom.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2" id="related-maps">{t('related')}</h2>
                    <Related relatedTo={entry.relatedTo} relatedFrom={entry.relatedFrom} />
                  </section>
                : false}
                {entry.media.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2" id="media">{t('media')}</h2>
                    <Media media={entry.media} />
                  </section>
                : false}
                {entry.sources !== "" ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2" id="sources">{t('sources')}</h2>
                    <div className="sources-text mt-4" dangerouslySetInnerHTML={{ __html : entry.sources }} />
                  </section>
                : false}
                {entry.changelog.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2" id="changelog">{t('changelog')}</h2>
                    <Changelog changelog={entry.changelog} createdAt={entry.createdAt} updatedAt={entry.updatedAt} />
                  </section>
                : false}
                {entry.disclaimer && entry.disclaimer !== "" ?
                  <Disclaimer disclaimer={entry.disclaimer} />
                : false}
                <section className="mt-5">
                  <h2 className="nld-font-jost nld-font-h2" id="send-correction">{t('correction')}</h2>
                  <p>{t('contact')}</p>
                </section>
              </div>
            : false}
            {category === 'greetings' ?
              <div>
                <h2 className="nld-font-jost nld-font-h2" id="greetings">{t('greetings')}</h2>
                <Greetings greetings={entry.greetings} />
                <section className="mt-5">
                  <Map geometry={entry.geometry} />
                </section>
              </div>
            : false}
          </div>
        </div>
      </div>
    </div>
  );
}
