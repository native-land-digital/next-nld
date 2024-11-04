import { getTranslations } from '@/i18n/server-i18n';

export default async function Media({ media }) {

  const t = await getTranslations('Listings');

  if(media.length === 0) {
    return (<p>{t('no-media')}</p>)
  }

  return (
    <>
      <div>
        {media.map((thisMedia, i) => {
          return (
            <a key={`media-${i}`} href={thisMedia.url} target="_blank" className="mb-2.5"><img src={thisMedia.url} className="w-auto max-w-full" /></a>
          )
        })}
      </div>
    </>
  );
}
