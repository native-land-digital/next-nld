export default function Related({ relatedTo }) {

  if(relatedTo.length === 0) {
    return (<p>No related maps are currently entered.</p>)
  }

  return (
    <>
      {relatedTo.map(() => {
        // return (
        //   <div key={`website-${i}`} className="mb-2.5">
        //     <a href={website.url}>{website.title && website.title !== "" ? website.title : website.url}</a>
        //   </div>
        // )
        return false;
      })}
    </>
  );
}
