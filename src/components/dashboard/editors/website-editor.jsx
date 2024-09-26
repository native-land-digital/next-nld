'use client'

import AddButton from '@/components/dashboard/editors/common/add-button';
import RemoveButton from '@/components/dashboard/editors/common/remove-button';

export default function WebsiteEditor({ websites, setWebsites }) {

  const changeWebsites = (value, action, prop, index) => {
    const newWebsites = JSON.parse(JSON.stringify(websites));
    if(action === 'add') {
      newWebsites.push({ url : "", title : "" })
    } else if(action === 'edit') {
      newWebsites[index][prop] = value;
    } else if (action === 'remove') {
      newWebsites.splice(index, 1);
    }
    setWebsites(newWebsites)
  }

  return (
    <>
      {websites.map((website, i) => {
        return (
          <div key={`website-${i}`} className="relative flex items-center gap-2 mb-2.5">
            <input value={website.url} onChange={(e) => changeWebsites(e.target.value, 'edit', 'url', i)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter website URL" />
            <input value={website.title} onChange={(e) => changeWebsites(e.target.value, 'edit', 'title', i)} type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter title" />
            <RemoveButton removeFunction={() => changeWebsites(null, 'remove', null, i)} />
          </div>
        )
      })}
      <AddButton addFunction={() => changeWebsites(null, 'add')} />
    </>
  );
}
