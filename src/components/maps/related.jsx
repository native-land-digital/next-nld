import Link from 'next/link';

export default function Related({ relatedTo, relatedFrom }) {

  if(relatedTo.length === 0 && relatedFrom.length === 0) {
    return (<p>No related maps are currently entered.</p>)
  }

  let singleRelationSet = relatedTo;
  relatedFrom.forEach(relation => {
    singleRelationSet.push(relation);
  })

  return (
    <>
      {singleRelationSet.map((relation, i) => {
        return (
          <div key={`relation-${i}`} className="mb-2.5">
            <p className="text-black">
              <Link href={`/maps/${relation.relatedTo.category}/${relation.relatedTo.slug}`}>{relation.relatedTo.name}</Link> {relation.description ? `- ${relation.description}` : ''}
            </p>
          </div>
        )
        return false;
      })}
    </>
  );
}
