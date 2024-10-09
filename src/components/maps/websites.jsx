import { getTranslations } from '@/i18n/server-i18n';

export default async function Websites({ websites }) {

  const t = await getTranslations('Maps');

  if(websites.length === 0) {
    return (<p>{t('no-websites')}</p>)
  }

  return (
    <>
      {websites.map((website, i) => {
        return (
          <div key={`website-${i}`} className="mb-2.5">
            <a href={website.url}>{website.title && website.title !== "" ? website.title : website.url}</a>
          </div>
        )
      })}
    </>
  );
}
