import { db } from '@/lib/db/kysely'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import { notFound } from 'next/navigation';

import Map from '@/components/maps/map';
import Pronunciations from '@/components/maps/pronunciations';
import Greetings from '@/components/maps/greetings';
import Websites from '@/components/maps/websites';
import Related from '@/components/maps/related';
import Media from '@/components/maps/media';
import Changelog from '@/components/maps/changelog';
import Disclaimer from '@/components/maps/disclaimer';

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
      'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug', 'Entry.sources', 'Entry.pronunciation', 'Entry.createdAt', 'Entry.updatedAt',
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

  console.log(entry)

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={entry.name} crumbs={[{ url : "/listings", title : "Listings" }, { url : `/listings/${category}`, title : category }]} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 min-h-screen w-full md:w-2/3 px-5 md:px-0 m-auto -mt-12 text-black">
        <Sidebar picks={3}>
          <ol className="hidden md:block list-inside text-gray-400">
            <li className="mb-2.5"><a href="#map">{t('map')}</a></li>
            {entry.websites.length > 0 ?
              <li className="mb-2.5"><a href="#websites">{t('websites')}</a></li>
            : false}
            {entry.pronunciations.length > 0 ?
              <li className="mb-2.5"><a href="#pronunciations">{t('pronunciations')}</a></li>
            : false}
            {entry.greetings.length > 0 ?
              <li className="mb-2.5"><a href="#greetings">{t('greetings')}</a></li>
            : false}
            {entry.media.length > 0 ?
              <li className="mb-2.5"><a href="#media">{t('media')}</a></li>
            : false}
            <li className="mb-2.5"><a href="#sources">{t('sources')}</a></li>
            {entry.relatedTo.length > 0 || entry.relatedFrom.length > 0 ?
              <li className="mb-2.5"><a href="#related-maps">{t('related')}</a></li>
            : false}
            {entry.changelog.length > 0 ?
              <li className="mb-2.5"><a href="#changelog">{t('changelog')}</a></li>
            : false}
            <li className="mb-2.5"><a href="#send-correction">{t('correction')}</a></li>
          </ol>
          <span />
        </Sidebar>
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          {category !== 'greetings' ?
            <div>
              <Map geometry={entry.geometry} geometry_type={entry.geometry_type} category={entry.category} />
              {entry.websites.length > 0 ?
                <section className="mt-5">
                  <h3 className="text-xl font-bold mb-3" id="websites">{t('websites')}</h3>
                  <Websites websites={entry.websites} />
                </section>
              : false}
              {entry.pronunciations.length > 0 ?
                <section className="mt-5">
                  <h3 className="text-xl font-bold mb-3" id="pronunciations">{tDash('pronunciations')}</h3>
                  <Pronunciations pronunciations={entry.pronunciations} />
                </section>
              : false}
              {entry.greetings.length > 0 ?
                <section className="hidden mt-5">
                  <h3 className="text-xl font-bold mb-3" id="greetings">{t('greetings')}</h3>
                  <Greetings greetings={entry.greetings} />
                </section>
              : false}
              {entry.relatedTo.length > 0 || entry.relatedFrom.length > 0 ?
                <section className="mt-5">
                  <h3 className="text-xl font-bold mb-3" id="related-maps">{t('related')}</h3>
                  <Related relatedTo={entry.relatedTo} relatedFrom={entry.relatedFrom} />
                </section>
              : false}
              {entry.media.length > 0 ?
                <section className="mt-5">
                  <h3 className="text-xl font-bold mb-3" id="media">{t('media')}</h3>
                  <Media media={entry.media} />
                </section>
              : false}
              {entry.sources !== "" ?
                <section className="mt-5">
                  <h3 className="text-xl font-bold mb-3" id="sources">{t('sources')}</h3>
                  <div className="sources-text" dangerouslySetInnerHTML={{ __html : entry.sources }} />
                </section>
              : false}
              {entry.changelog.length > 0 ?
                <section className="mt-5">
                  <h3 className="text-xl font-bold mb-3" id="changelog">{t('changelog')}</h3>
                  <Changelog changelog={entry.changelog} createdAt={entry.createdAt} updatedAt={entry.updatedAt} />
                </section>
              : false}
              {entry.disclaimer && entry.disclaimer !== "" ?
                <Disclaimer disclaimer={entry.disclaimer} />
              : false}
              <section className="mt-5">
                <h3 className="text-xl font-bold mb-3" id="send-correction">{t('correction')}</h3>
                <p>{t('contact')}</p>
              </section>
            </div>
          : false}
          {category === 'greetings' ?
            <div>
              <h3 className="text-xl font-bold mb-3" id="greetings">{t('greetings')}</h3>
              <Greetings greetings={entry.greetings} />
              <section className="mt-5">
                <Map geometry={entry.geometry} />
              </section>
              <section className="mt-5">
                <h3 className="text-xl font-bold mb-3" id="greetings">About this Project</h3>
                <p>This project is a collaboration between the Canadian Commission for UNESCO, nativeland.ca and Dr. Onowa McIvor, President’s Chair at the University of Victoria and supports of the UN International Decade of Indigenous Languages. Read more here (link to UNESCO landing page).</p>
              </section>
            </div>
          : false}
        </div>
      </div>
    </div>
  );
}
