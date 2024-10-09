'use client'
import { useTranslations } from '@/i18n/client-i18n';
import AsyncSelect from 'react-select/async';

import AddButton from '@/components/dashboard/editors/common/add-button';
import RemoveButton from '@/components/dashboard/editors/common/remove-button';

export default function RelationEditor({ relatedTo, setRelatedTo }) {

  const t = useTranslations('Dashboard');

  const loadOptions = (inputValue, callback) => {
    if(inputValue.length >= 2) {
      fetch(`/api/polygons/search?s=${inputValue}`).then(resp => resp.json()).then(response => {
        callback(response.map(polygon => {
          return {
            value : polygon.id,
            label : `${polygon.name} (${polygon.category})`
          }
        }));
      })
    }
  };

  const changeRelatedTo = (value, action, prop, index) => {
    const newRelatedTo = [...relatedTo];
    if(action === 'add') {
      newRelatedTo.push({ relatedTo : { id : null, name : "" }, description : "" })
    } else if(action === 'edit') {
      newRelatedTo[index][prop] = value;
    } else if (action === 'remove') {
      newRelatedTo.splice(index, 1);
    }
    setRelatedTo(newRelatedTo)
  }

  return (
    <>
      {relatedTo.map((relation, i) => {
        return (
          <div key={`website-${i}`} className="relative flex items-center gap-2 mb-2.5">
            <div className="w-1/3">
              <AsyncSelect value={{ value : relation.relatedTo.id, label : relation.relatedTo.name }} onChange={(e) => changeRelatedTo({ id : e.value, name : e.label }, 'edit', 'relatedTo', i)} cacheOptions loadOptions={loadOptions} placeholder={t('type-search')} />
            </div>
            <input value={relation.description} onChange={(e) => changeRelatedTo(e.target.value, 'edit', 'description', i)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('relation-placeholder')} />
            <RemoveButton removeFunction={() => changeRelatedTo(null, 'remove', null, i)} />
          </div>
        )
      })}
      <AddButton addFunction={() => changeRelatedTo(null, 'add')} />
    </>
  );
}
