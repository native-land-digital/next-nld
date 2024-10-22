import { getTranslations } from '@/i18n/server-i18n';

export default async function Greetings({ greetings }) {

  const t = await getTranslations('Maps');

  if(greeting.length === 0) {
    return (<p>{t('no-greetings')}</p>)
  }

  return (
    <>
      <div>
        {greetings.map((greeting, i) => {
          return (
            <a key={`greeting-${i}`} href={greeting.url} target="_blank" className="mb-2.5">Greeting link</a>
          )
        })}
      </div>
    </>
  );
}
