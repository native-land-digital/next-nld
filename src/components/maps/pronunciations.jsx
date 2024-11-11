import AudioPlayer from '@/components/maps/utils/audio-player';

export default async function Pronunciations({ pronunciations }) {

  return (
    <>
      <div>
        {pronunciations.map((pronunciation, i) => {
          return (
            <div key={`pronunciation-${i}`}>
              <p>
                {pronunciation.text}
                <AudioPlayer audio={pronunciation} />
              </p>
            </div>
          )
        })}
      </div>
    </>
  );
}
