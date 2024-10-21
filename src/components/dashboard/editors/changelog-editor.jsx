'use client'
import { useTranslations } from '@/i18n/client-i18n';

import AddButton from '@/components/dashboard/editors/common/add-button';
import RemoveButton from '@/components/dashboard/editors/common/remove-button';

export default function ChangelogEditor({ changelog, setChangelog }) {

  const t = useTranslations('Dashboard');

  const changeChangelog = (value, action, prop, index) => {
    const newChangelog = [...changelog];
    if(action === 'add') {
      newChangelog.push({ createdAt : new Date().toISOString(), description : "" })
    } else if(action === 'edit') {
      newChangelog[index][prop] = value;
    } else if (action === 'remove') {
      newChangelog.splice(index, 1);
    }
    setChangelog(newChangelog)
  }

  return (
    <>
      {changelog.map((change, i) => {
        return (
          <div key={`change-${i}`} className="relative flex items-center gap-2 mb-2.5">
            <input value={change.createdAt.split('T')[0]} onChange={(e) => {
              const date = new Date(e.target.value)
              const userTimezoneOffset = date.getTimezoneOffset() * 60000;
              const selectedDate = new Date(date.getTime() + userTimezoneOffset);
              changeChangelog(selectedDate.toISOString(), 'edit', 'createdAt', i)
            }} type="date" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('date-placeholder')} />
            <input value={change.description} onChange={(e) => changeChangelog(e.target.value, 'edit', 'description', i)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('description-placeholder')} />
            <RemoveButton removeFunction={() => changeChangelog(null, 'remove', null, i)} />
          </div>
        )
      })}
      <AddButton addFunction={() => changeChangelog(null, 'add')} />
    </>
  );
}
