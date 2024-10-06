import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function PolygonCard({ polygon, hideCategory }) {

  const t = await getTranslations('Maps');

  return (
    <div className="h-40 w-full">
      <Link prefetch={false} href={`/maps/${polygon.category}/${polygon.slug}`}>
        <div className="h-full w-full bg-cover rounded" style={{backgroundImage : polygon.media_url ? `url(${polygon.media_url})` : ''}}>
          <div className="h-full w-full bg-slate-600/80 rounded flex justify-items-center align-items-center place-items-center hover:bg-slate-600/75 hover:border-2 hover:border-white">
            <div className="text-center w-full p-2.5">
              {!hideCategory ? <p className="text-xs text-white font-bold uppercase">{polygon.category}</p> : false}
              <h4 className="text-2xl font-bold text-white">{polygon.name}</h4>
              <p className="text-xs text-white">{t('last-updated')} {new Date(polygon.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
