'use client'

import AddButton from '@/components/dashboard/editors/common/add-button';
import RemoveButton from '@/components/dashboard/editors/common/remove-button';

export default function ChangelogEditor({ changelog, setChangelog }) {

  const changeChangelog = (value, action, prop, index) => {
    const newChangelog = [...changelog];
    if(action === 'add') {
      newChangelog.push({ createdAt : new Date().toISOString().split('T')[0], description : "" })
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
        let displayedDate = change.createdAt;
        if(typeof change.createdAt === 'object') {
          displayedDate = new Date(change.createdAt).toISOString().split('T')[0]
        }
        return (
          <div key={`change-${i}`} className="relative flex items-center gap-2 mb-2.5">
            <input value={displayedDate} onChange={(e) => changeChangelog(e.target.value, 'edit', 'createdAt', i)} type="date" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter date" />
            <input value={change.description} onChange={(e) => changeChangelog(e.target.value, 'edit', 'description', i)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter description" />
            <RemoveButton removeFunction={() => changeChangelog(null, 'remove', i)} />
          </div>
        )
      })}
      <AddButton addFunction={() => changeChangelog(null, 'add')} />
    </>
  );
}
