import { db } from '@/lib/db/kysely'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import Map from '@/components/maps/map';
import Websites from '@/components/maps/websites';
import Related from '@/components/maps/related';
import Media from '@/components/maps/media';
import Changelog from '@/components/maps/changelog';

export const generateStaticParams = async () => {
  if(process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'production') {
    const polygon = await db.selectFrom('Polygon')
      .where('published', '=', true)
      .select(['id', 'category', 'slug'])
      .distinctOn('id')
      .execute();

    return polygon.map(thisPolygon => {
      return {
        locale : 'en',
        category : thisPolygon.category,
        slug : thisPolygon.slug
      }
    })
  } else {
    return [];
  }
}

export const revalidate = false;

export default async function Page({ params : { category, slug }}) {

  const t = await getTranslations('Maps');

  const polygon = await db.selectFrom('Polygon')
    .where('slug', '=', slug.toLowerCase())
    .where('category', '=', category)
    .where('published', '=', true)
    .select((eb) => [
      'id', 'name', 'category', 'slug', 'sources', 'pronunciation', 'createdAt', 'updatedAt',
      eb.fn('ST_AsGeoJSON', 'geometry').as('geometry'),
      jsonArrayFrom(
        eb.selectFrom('Media')
          .select(['url', 'caption', 'title'])
          .whereRef('Media.polygonId', '=', 'Polygon.id')
      ).as('media'),
      jsonArrayFrom(
        eb.selectFrom('Website')
          .select(['url', 'title'])
          .whereRef('Website.polygonId', '=', 'Polygon.id')
      ).as('websites'),
      jsonArrayFrom(
        eb.selectFrom('Change')
          .select(['createdAt', 'description'])
          .whereRef('Change.polygonId', '=', 'Polygon.id')
      ).as('changelog'),
      jsonArrayFrom(
        eb.selectFrom('Relation')
          .innerJoin('Polygon as RelatedPolygon', 'RelatedPolygon.id', 'Relation.relatedFromId')
          .select([
            'Relation.description as description',
            'RelatedPolygon.name as name', 'RelatedPolygon.category as category', 'RelatedPolygon.slug as slug'
          ])
          .whereRef('Relation.relatedToId', '=', 'Polygon.id')
      ).as('relatedFrom'),
      jsonArrayFrom(
        eb.selectFrom('Relation')
          .innerJoin('Polygon as RelatedPolygon', 'RelatedPolygon.id', 'Relation.relatedToId')
          .select([
            'Relation.description as description',
            'RelatedPolygon.name as name', 'RelatedPolygon.category as category', 'RelatedPolygon.slug as slug'
          ])
          .whereRef('Relation.relatedFromId', '=', 'Polygon.id')
      ).as('relatedTo')
    ])
    .executeTakeFirst()

  if(polygon) {
    if(polygon.geometry) {
      polygon.geometry = JSON.parse(polygon.geometry)
    }
  } else {
    notFound();
  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={polygon.name} crumbs={[{ url : "/maps", title : "Maps" }, { url : `/maps/${polygon.category}`, title : polygon.category }]} />
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
          <Map geometry={polygon.geometry} />
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="websites">{t('websites')}</h3>
            <Websites websites={polygon.websites} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="related-maps">{t('related')}</h3>
            <Related relatedTo={polygon.relatedTo} relatedFrom={polygon.relatedFrom} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="media">{t('media')}</h3>
            <Media media={polygon.media} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="sources">{t('sources')}</h3>
            <div className="sources-text" dangerouslySetInnerHTML={{ __html : polygon.sources }} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="changelog">{t('changelog')}</h3>
            <Changelog changelog={polygon.changelog} createdAt={polygon.createdAt} updatedAt={polygon.updatedAt} />
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
