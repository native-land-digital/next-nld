import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function Related({ relatedTo, relatedFrom }) {

  const t = await getTranslations('Maps');

  if(relatedTo.length === 0 && relatedFrom.length === 0) {
    return (<p>{t('no-related')}</p>)
  }

  let singleRelationSet = [];
  relatedTo.forEach(relation => {
    singleRelationSet.push({
      description : relation.description,
      relationToShow : relation.relatedTo
    })
  })
  relatedFrom.forEach(relation => {
    if(!singleRelationSet.find(thisRelation => thisRelation.relationToShow.id === relation.relatedFrom.id)) {
      singleRelationSet.push({
        description : relation.description,
        relationToShow : relation.relatedFrom
      })
    }
  })

  return (
    <>
      {singleRelationSet.map((relation, i) => {
        return (
          <div key={`relation-${i}`} className="mb-2.5">
            <p className="text-black">
              <Link prefetch={false} href={`/maps/${relation.relationToShow.category}/${relation.relationToShow.slug}`}>{relation.relationToShow.name}</Link> {relation.description ? `- ${relation.description}` : ''}
            </p>
          </div>
        )
        return false;
      })}
    </>
  );
}
