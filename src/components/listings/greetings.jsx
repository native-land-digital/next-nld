import { getTranslations } from '@/i18n/server-i18n';

import AudioPlayer from '@/components/listings/utils/audio-player';

export default async function Greetings({ greetings }) {

  const t = await getTranslations('Listings');

  if(greetings.length === 0) {
    return (<p>{t('no-greetings')}</p>)
  }

  return (
    <>
      <div>
        {greetings.filter(greeting => !greeting.parentId).map((greeting, i) => {
          return (
            <div key={`greeting-${i}`}>
              <p>
                <u>{greeting.text}</u>
                <AudioPlayer audio={greeting} />
              </p>
              <p className="mb-1">{greeting.translation}</p>
              {greeting.usage ? <p>{greeting.usage}</p> : false}
              {greetings.filter(thisGreeting => thisGreeting.parentId === greeting.id).map((response, ii) => {
                return (
                  <div key={`greeting-${i}-response-${ii}`} className="mt-2.5 ml-5">
                    <p>
                      <u>{response.text}</u>
                      <AudioPlayer greeting={response} />
                    </p>
                    <p className="mb-1">{response.translation}</p>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  );
}
