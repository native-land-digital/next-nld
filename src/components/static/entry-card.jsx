import Link from 'next/link'
import { getTranslations } from '@/i18n/server-i18n';

export default async function EntryCard({ entry, hideCategory }) {

  const t = await getTranslations('Listings');

  return (
    <div className="h-40 w-full">
      <Link prefetch={false} href={`/listings/${entry.category}/${entry.slug}`}>
        <div className="h-full w-full bg-cover rounded" style={{backgroundImage : entry.media_url ? `url(${entry.media_url})` : ''}}>
          <div className="h-full w-full bg-slate-600/80 rounded flex justify-items-center align-items-center place-items-center hover:bg-slate-600/75 hover:border-2 hover:border-white">
            <div className="text-center w-full p-2.5">
              {!hideCategory ? <p className="text-xs text-white font-bold uppercase">{entry.category}</p> : false}
              <h4 className="text-2xl font-bold text-white">{entry.name}</h4>
              <p className="text-xs text-white">{t('last-updated')} {new Date(entry.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
