import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { getTranslations } from '@/i18n/server-i18n';

import PolygonCard from '@/components/static/polygon-card';

export default async function Sidebar({ children = (<div></div>), picks = 5 }) {

  const t = await getTranslations('Sidebar');

  const totalPolygons = await db.selectFrom('Polygon')
    .select((eb) => eb.fn.count('id').as('num_polygons'))
    .execute();

  const randomIndex = Math.floor(Math.random() * (totalPolygons[0].num_polygons - picks));

  let polygons = await db.selectFrom('Polygon')
    .leftJoin('Media', 'Media.polygonId', 'Polygon.id')
    .select(['Polygon.id as id', 'Polygon.name as name', 'Polygon.category as category', 'Polygon.slug as slug', 'Polygon.updatedAt as updatedAt', 'Media.url as media_url'])
    .orderBy('color', 'asc')
    .limit(picks)
    .offset(randomIndex)
    .execute()


  return (
    <div className="col-span-1 bg-white rounded-t shadow-lg p-4 mt-5 order-last md:order-first">
      <div>
        {children}
      </div>
      {children.length > 0 ? <hr className="my-2.5" /> : false }
      <h3 className="pt-0 !mt-0 font-bold text-xl">{picks} {t('random')}</h3>
      <p className="text-sm mb-2.5 !mt-2.5"><Link prefetch={false} href="/maps">{t('visit-maps')}</Link>.</p>
      <div className="grid gap-5">
        {polygons.map(polygon => {
          return <PolygonCard key={`polygon-${polygon.id}`} polygon={polygon} />
        })}
      </div>
    </div>
  )
}
