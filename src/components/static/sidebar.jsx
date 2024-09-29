import prisma from "@/lib/db/prisma";
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

import PolygonCard from '@/components/static/polygon-card';

export default async function Sidebar({ children = (<div></div>), picks = 5 }) {

  const t = await getTranslations('Sidebar');
  const totalPolygons = await prisma.polygon.count()
  const randomIndex = Math.floor(Math.random() * (totalPolygons - picks));
  const query = {
    select : {
      id : true,
      name : true,
      category : true,
      slug : true,
      media : true,
      updatedAt : true
    },
    orderBy: { color : 'asc' },
    skip : randomIndex,
    take : picks
  }
  const polygons = await prisma.polygon.findMany(query);
  return (
    <div className="col-span-1 bg-white rounded-t shadow-lg p-4 mt-5 order-last md:order-first">
      <div>
        {children}
      </div>
      <h3 className="pt-0 !mt-0 font-bold text-xl">{picks} {t('random')}</h3>
      <p className="text-sm mb-2.5 !mt-2.5"><Link href="/maps">{t('visit-maps')}</Link>.</p>
      <div className="grid gap-5">
        {polygons.map(polygon => {
          return <PolygonCard key={`polygon-${polygon.id}`} polygon={polygon} />
        })}
      </div>
    </div>
  )
}
