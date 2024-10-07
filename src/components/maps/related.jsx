import Link from 'next/link'
import { getTranslations } from 'next-intl/server';

export default async function Related({ relatedTo, relatedFrom }) {

  const t = await getTranslations('Maps');

  if(relatedTo.length === 0 && relatedFrom.length === 0) {
    return (<p>{t('no-related')}</p>)
  }

  let singleRelationSet = [];
  relatedTo.forEach(relation => {
    singleRelationSet.push(relation)
  })
  relatedFrom.forEach(relation => {
    if(!singleRelationSet.find(thisRelation => thisRelation.slug === relation.slug)) {
      singleRelationSet.push(relation)
    }
  })

  return (
    <>
      {singleRelationSet.map((relation, i) => {
        return (
          <div key={`relation-${i}`} className="mb-2.5">
            <p className="text-black">
              <Link prefetch={false} href={`/maps/${relation.category}/${relation.slug}`}>{relation.name} ({relation.category})</Link> {relation.description ? `- ${relation.description}` : ''}
            </p>
          </div>
        )
        return false;
      })}
    </>
  );
}
