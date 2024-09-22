'use client'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import MainMap from '@/components/dashboard/editors/map-editor';
import WYSIWYGEDitor from '@/components/dashboard/editors/wysiwyg-editor';
import MediaEditor from '@/components/dashboard/editors/media-editor';
import WebsiteEditor from '@/components/dashboard/editors/website-editor';
import ChangelogEditor from '@/components/dashboard/editors/changelog-editor';
import RelationEditor from '@/components/dashboard/editors/relation-editor';

import { availableCategories } from '@/lib/map/categories';

export default function EditPolygon({ polygon }) {

  const [ name, setName ] = useState(polygon.name);
  const [ category, setCategory ] = useState(polygon.category);
  const [ description, setDescription ] = useState(polygon.description);
  const [ pronunciation, setPronunciation ] = useState(polygon.pronunciation);
  const [ published, setPublished ] = useState(polygon.published);
  const [ media, setMedia ] = useState(polygon.media);
  const [ websites, setWebsites ] = useState(polygon.websites);
  const [ changelog, setChangelog ] = useState(polygon.changelog);
  const [ relatedTo, setRelatedTo ] = useState(polygon.relatedTo);
  const [ geometry, setGeometry ] = useState(polygon.geometry);

  const savePolygon = () => {
    fetch(`/api/polygons/${polygon.id}`, {
      method : "PATCH",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        name : name,
        category : category,
        description : description,
        pronunciation : pronunciation,
        published : published,
        websites : websites,
        media : media,
        changelog : changelog,
        relatedTo : relatedTo,
        geometry : geometry
      })
    }).then(resp => resp.json()).then(results => {
      console.log(results)
      if(results.error) {
        toast(results.error)
      } else {
        toast("Polygon saved successfully")
      }
    });
  }

  return (
    <div>
      <a href="/dashboard/research"><div className="inline-block rotate-180 mr-2.5 mb-2.5">➜</div>Back</a>
      <h2 className="font-semibold text-3xl">{polygon.name}</h2>
      <p className="text-xs mt-1" suppressHydrationWarning>Polygon created {new Date(polygon.createdAt).toLocaleString()}, updated {new Date(polygon.updatedAt).toLocaleString()}</p>
      <hr className="mt-3 mb-3" />

      <MainMap geometry={geometry} setGeometry={setGeometry} />

      <div className="w-full md:w-1/2">

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Name</label>
          <div className="relative flex items-center">
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter new name" />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Category</label>
          <div className="relative flex items-center">
            <select onChange={(e) => setCategory(e.target.value)} value={category ? category : ""} className="text-sm capitalize h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none" >
              <option>(none)</option>
              {availableCategories.map(category => {
                return (<option key={`option-${category}`} value={category}>{category}</option>)
              })}
            </select>
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Pronunciation</label>
          <div className="relative flex items-center">
            <input value={pronunciation ? pronunciation : ""} onChange={(e) => setPronunciation(e.target.value)} name="pronunciation" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter pronunciation" />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Public</label>
          <div className="relative">
            <label htmlFor="published" className='capitalize text-sm'>
              <input id="published" type="checkbox" checked={published} name="published" onChange={(e) => setPublished(e.target.checked)} className="mr-1.5" />
              Published
            </label>
          </div>
        </div>

      </div>

      <div className="w-full">
        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">Description</label>
          <WYSIWYGEDitor description={description} setDescription={setDescription} />
        </div>
      </div>


      <div className="mt-6">
        <label className="text-gray-800 text-normal mb-1 block">Media</label>
        <MediaEditor media={media} setMedia={setMedia} />
      </div>

      <div className="mt-6">
        <label className="text-gray-800 text-normal mb-1 block">Websites</label>
        <WebsiteEditor websites={websites} setWebsites={setWebsites} />
      </div>

      <div className="mt-6">
        <label className="text-gray-800 text-normal mb-1 block">Related To</label>
        <RelationEditor relatedTo={relatedTo} setRelatedTo={setRelatedTo} />
      </div>

      <div className="mt-6">
        <label className="text-gray-800 text-normal mb-1 block">Changelog</label>
        <ChangelogEditor changelog={changelog} setChangelog={setChangelog} />
      </div>

      <div className="w-full md:w-1/2">
        <div className="!mt-8">
          <button onClick={() => savePolygon()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}



  //
  // <div className="mt-2.5">
  //   <label className="text-gray-800 text-sm mb-1 block">Email</label>
  //   <div className="relative flex items-center">
  //     <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter new email" />
  //   </div>
  // </div>
  //
  // <div className="mt-2.5">
  //   <label className="text-gray-800 text-sm mb-1 block">Password</label>
  //   <div className="relative flex items-center">
  //     <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter new password" />
  //   </div>
  // </div>
  //
  // <div className="mt-2.5">
  //   <label className="text-gray-800 text-sm mb-1 block">Organization</label>
  //   <div className="relative flex items-center">
  //     <input value={organization} onChange={(e) => setOrganization(e.target.value)} name="name" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="Enter new name" />
  //   </div>
  // </div>
  //
  // <div className="mt-2.5">
  //   <label className="text-gray-800 text-sm mb-1 block">API Key</label>
  //   <div className="relative flex items-center">
  //     <input value={user.api_key} name="api_key" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" disabled={true} />
  //   </div>
  // </div>
  //
  // <div className="mt-2.5">
  //   <label className="text-gray-800 text-sm mb-1 block">Permissions</label>
  //   <div className="relative">
  //     <p className="text-gray-500 text-xs mb-2.5">Users will need to log out and back in before any permission changes take effect.</p>
  //     {possiblePermissions.map(permission => {
  //       return (
  //         <div key={`checkbox-${permission}`}>
  //           <label htmlFor={permission} className='capitalize text-sm'>
  //             <input id={permission} type="checkbox" checked={permissions.includes(permission)} name={permission} onChange={(e) => savePermissions(e.target.checked, permission)} className="mr-1.5" />
  //             {permission}
  //           </label>
  //         </div>
  //       )
  //     })}
  //   </div>
  // </div>
