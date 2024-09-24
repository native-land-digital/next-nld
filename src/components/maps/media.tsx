export default function Media({ media }) {

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
