import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import SubHeader from '@/components/nav/sub-header'
import { HeaderSessionProvider } from '@/lib/auth/session-provider'
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
import AddContribution from '@/components/contributions/add-contribution';

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
      ).as('relatedTo'),
      jsonArrayFrom(
        eb.selectFrom('Contribution')
          .innerJoin('EntriesOnContributions', 'EntriesOnContributions.contributionId', 'Contribution.id')
          .innerJoin('ContributionStage', 'ContributionStage.id', 'Contribution.stageId')
          .select(['Contribution.id', 'Contribution.name', 'Contribution.createdAt'])
          .whereRef('EntriesOnContributions.entryId', '=', 'Entry.id')
          .where('ContributionStage.name', '=', 'In Discussion')
      ).as('contributions')
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
      <div className="w-full lg:w-3/5 min-h-screen m-auto mt-12 text-black">
        <div className="col-span-2 mt-5">
          <div className="px-4 pb-4 break-words">
            {category !== 'greetings' ?
              <div>
                <Map geometry={entry.geometry} geometry_type={entry.geometry_type} category={entry.category} />
                <section className="mt-5">
                  <h2 className="nld-font-jost nld-font-h2 font-semibold pb-4" id="send-correction">{t('correction')}</h2>
                  {entry.contributions.map((contribution, i) => {
                    return (
                      <a key={`contribution-${i}`} href={`/contributions/${contribution.id}`} className="block mb-4 border border-gray-100 hover:bg-gray-50 rounded-lg p-4 shadow-sm">
                        {/* <div className="mt-4">
                          <div className="mt-2 text-xs py-1 px-2 bg-gray-200 rounded-lg">{contribution.stage.name}</div>
                        </div>*/}
                        <h1 className="text-lg font-semibold text-left flex items-center gap-4">
                          {contribution.name}
                          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16699 3.33301C9.62708 3.33318 10 3.70686 10 4.16699C9.99982 4.62697 9.62697 4.99982 9.16699 5H4.16699C3.94598 5 3.73343 5.08786 3.57715 5.24414C3.42105 5.40033 3.33309 5.61219 3.33301 5.83301V15.833C3.33301 16.054 3.42087 16.2666 3.57715 16.4229C3.73343 16.5791 3.94598 16.667 4.16699 16.667H14.167C14.3878 16.6669 14.5997 16.579 14.7559 16.4229C14.9121 16.2666 15 16.054 15 15.833V10.833C15.0002 10.373 15.373 10.0002 15.833 10C16.2931 10 16.6668 10.3729 16.667 10.833V15.833C16.667 16.4959 16.4032 17.1318 15.9346 17.6006C15.4658 18.0693 14.8299 18.3329 14.167 18.333H4.16699C3.50395 18.333 2.86825 18.0694 2.39941 17.6006C1.93057 17.1317 1.66699 16.496 1.66699 15.833V5.83301C1.66708 5.17008 1.93065 4.53419 2.39941 4.06543C2.86822 3.59679 3.5041 3.33301 4.16699 3.33301H9.16699ZM17.5 1.66699C17.5419 1.66699 17.5828 1.67176 17.623 1.67773C17.637 1.67982 17.6512 1.6808 17.665 1.68359C17.6796 1.68652 17.6937 1.69066 17.708 1.69434C17.7184 1.69701 17.729 1.69907 17.7393 1.70215C17.7525 1.70612 17.7653 1.71121 17.7783 1.71582C17.8917 1.75596 17.9982 1.82044 18.0889 1.91113C18.1188 1.94103 18.1455 1.97286 18.1699 2.00586C18.1782 2.01712 18.1866 2.02835 18.1943 2.04004C18.2322 2.09711 18.2618 2.15785 18.2842 2.2207C18.2888 2.23367 18.2939 2.24651 18.2979 2.25977C18.3093 2.29789 18.3164 2.33686 18.3223 2.37598C18.3283 2.41653 18.333 2.45776 18.333 2.5V7.5C18.333 7.96024 17.9602 8.33301 17.5 8.33301C17.0398 8.33301 16.667 7.96024 16.667 7.5V4.51074L10.5889 10.5889C10.2634 10.9143 9.73656 10.9143 9.41113 10.5889C9.08572 10.2634 9.08573 9.73657 9.41113 9.41113L15.4893 3.33301H12.5C12.0398 3.33301 11.667 2.96024 11.667 2.5C11.667 2.03976 12.0398 1.66699 12.5 1.66699H17.5Z" fill="#23282B"/>
                          </svg>
                        </h1>
                      </a>
                    )
                  })}
                  <HeaderSessionProvider>
                    <AddContribution entryId={entry.id} />
                  </HeaderSessionProvider>
                  <p className="mt-4">{t('contact')}</p>
                </section>
                {entry.language && entry.language !== "" ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2 font-semibold" id="language">{t('language')}</h2>
                    <p className="mt-4">{entry.language}</p>
                  </section>
                : false}
                {entry.websites.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2 font-semibold" id="websites">{t('websites')}</h2>
                    <Websites websites={entry.websites} />
                  </section>
                : false}
                {entry.pronunciations.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2 font-semibold" id="pronunciations">{tDash('pronunciations')}</h2>
                    <Pronunciations pronunciations={entry.pronunciations} />
                  </section>
                : false}
                {entry.greetings.length > 0 ?
                  <section className="hidden mt-5">
                    <h2 className="nld-font-jost nld-font-h2 font-semibold" id="greetings">{t('greetings')}</h2>
                    <Greetings greetings={entry.greetings} />
                  </section>
                : false}
                {entry.relatedTo.length > 0 || entry.relatedFrom.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2 font-semibold" id="related-maps">{t('related')}</h2>
                    <Related relatedTo={entry.relatedTo} relatedFrom={entry.relatedFrom} />
                  </section>
                : false}
                {entry.media.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2 font-semibold" id="media">{t('media')}</h2>
                    <Media media={entry.media} />
                  </section>
                : false}
                {entry.sources !== "" ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2 font-semibold" id="sources">{t('sources')}</h2>
                    <div className="sources-text mt-4" dangerouslySetInnerHTML={{ __html : entry.sources }} />
                  </section>
                : false}
                {entry.changelog.length > 0 ?
                  <section className="mt-5">
                    <h2 className="nld-font-jost nld-font-h2 font-semibold" id="changelog">{t('changelog')}</h2>
                    <Changelog changelog={entry.changelog} createdAt={entry.createdAt} updatedAt={entry.updatedAt} />
                  </section>
                : false}
                {entry.disclaimer && entry.disclaimer !== "" ?
                  <Disclaimer disclaimer={entry.disclaimer} />
                : false}
              </div>
            : false}
            {category === 'greetings' ?
              <div>
                <h2 className="nld-font-jost nld-font-h2 font-semibold" id="greetings">{t('greetings')}</h2>
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
