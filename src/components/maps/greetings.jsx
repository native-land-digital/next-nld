import { getTranslations } from '@/i18n/server-i18n';

import AudioPlayer from '@/components/maps/utils/audio-player';

export default async function Greetings({ greetings }) {

  const t = await getTranslations('Maps');

  if(greetings.length === 0) {
    return (<p>{t('no-greetings')}</p>)
  }

  return (
    <>
      <div>
        {greetings.filter(greeting => !greeting.parentId).map((greeting, i) => {
          return (
            <div key={`greeting-${i}`}>
              <h3 className="text-lg font-bold">Greeting {i + 1}</h3>
              <p>
                <u>{greeting.text}</u>
                <AudioPlayer greeting={greeting} />
              </p>
              <p className="mb-1">{greeting.translation}</p>
              {greeting.usage ? <p>{greeting.usage}</p> : false}
              {greetings.filter(thisGreeting => thisGreeting.parentId === greeting.id).map((response, ii) => {
                return (
                  <div key={`greeting-${i}-response-${ii}`} className="mt-2.5 ml-2.5">
                    <h3 className="text-lg font-bold">Response {ii + 1}</h3>
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
