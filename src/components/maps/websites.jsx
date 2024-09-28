export default function Websites({ websites }) {

  if(websites.length === 0) {
    return (<p>No websites yet.</p>)
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
