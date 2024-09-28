export default function Media({ media }) {

  if(media.length === 0) {
    return (<p>No media yet.</p>)
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
