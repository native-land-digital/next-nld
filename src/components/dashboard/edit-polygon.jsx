'use client'
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { navigate } from '@/lib/actions'
import { SwatchesPicker } from 'react-color';
import { Link } from '@/i18n/routing';

import MainMap from '@/components/dashboard/editors/map-editor';
import WYSIWYGEDitor from '@/components/dashboard/editors/wysiwyg-editor';
import MediaEditor from '@/components/dashboard/editors/media-editor';
import WebsiteEditor from '@/components/dashboard/editors/website-editor';
import ChangelogEditor from '@/components/dashboard/editors/changelog-editor';
import RelationEditor from '@/components/dashboard/editors/relation-editor';

import { availableCategories } from '@/lib/map/categories';

export default function EditPolygon({ polygon }) {

  const t = useTranslations('Dashboard');
  const tMaps = useTranslations('Maps');
  const tCommon = useTranslations('Common');

  const [ name, setName ] = useState(polygon.name);
  const [ category, setCategory ] = useState(polygon.category);
  const [ sources, setSources ] = useState(polygon.sources);
  const [ pronunciation, setPronunciation ] = useState(polygon.pronunciation);
  const [ color, setColor ] = useState(polygon.color);
  const [ published, setPublished ] = useState(polygon.published);
  const [ media, setMedia ] = useState(polygon.media);
  const [ websites, setWebsites ] = useState(polygon.websites);
  const [ changelog, setChangelog ] = useState(polygon.changelog);
  const [ relatedTo, setRelatedTo ] = useState(polygon.relatedTo);
  const [ geometry, setGeometry ] = useState(polygon.geometry);

  const [ showSwatches, setShowSwatches ] = useState(false);

  const savePolygon = () => {
    fetch(`/api/polygons/${polygon.id}`, {
      method : "PATCH",
      headers : { 'Content-Type': 'application/json' },
      body : JSON.stringify({
        name : name,
        category : category,
        sources : sources,
        color : color,
        pronunciation : pronunciation,
        published : published,
        websites : websites,
        media : media,
        changelog : changelog,
        relatedTo : relatedTo.map(related => {
          return {
            relatedToId : related.relatedTo.id,
            description : related.description
          }
        }),
        geometry : geometry
      })
    }).then(resp => resp.json()).then(results => {
      if(results.error) {
        toast(results.error)
      } else {
        toast(t('saved-polygon'))
      }
    });
  }

  const deletePolygon = () => {
    if(window.confirm(t('deleted-polygon-confirm'))) {
      fetch(`/api/polygons/${polygon.id}`, {
        method : "DELETE"
      }).then(resp => resp.json()).then(results => {
        if(results.error) {
          toast(results.error)
        } else {
          setTimeout(() => {
            navigate(`/dashboard/research/`);
          }, 500)
          toast(t('deleted-polygon'))
        }
      })
    }
  }

  return (
    <div>
      <Link href="/dashboard/research"><div className="inline-block rotate-180 mr-2.5 mb-2.5">➜</div>{tCommon('back')}</Link>
      <h2 className="font-semibold text-3xl">{polygon.name}</h2>
      <p className="text-xs mt-1" suppressHydrationWarning>{t('polygon-created')} {new Date(polygon.createdAt).toLocaleString()}, {t('polygon-updated')} {new Date(polygon.updatedAt).toLocaleString()}</p>
      <hr className="mt-3 mb-3" />

      <MainMap geometry={geometry} setGeometry={setGeometry} />

      <div className="w-full md:w-1/2">

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">{t('name')}</label>
          <div className="relative flex items-center">
            <input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('enter-name')} />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">{t('category')}</label>
          <div className="relative flex items-center">
            <select onChange={(e) => setCategory(e.target.value)} value={category ? category : ""} className="text-sm capitalize h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none" >
              <option>({t('none')})</option>
              {availableCategories.map(category => {
                return (<option key={`option-${category}`} value={category}>{category}</option>)
              })}
            </select>
          </div>
        </div>


        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">{t('color')}</label>
          <div className="relative flex items-center">
            <div className="w-10 h-10" style={{backgroundColor : color }}></div>
            <button className="ml-2.5 py-1 px-2.5 text-sm tracking-wide rounded-lg text-black bg-gray-100 hover:bg-gray-200 focus:outline-none" onClick={() => setShowSwatches(true)}>{t('pick-color')}</button>
            <div className={`${showSwatches ? 'absolute block' : 'hidden'} ml-40 z-30`}>
              <div className="fixed top-0 bottom-0 right-0 left-0" onClick={() => setShowSwatches(false)}></div>
              <SwatchesPicker
                color={color}
                onChangeComplete={(color) => { setColor(color.hex); setShowSwatches(false); }}
              />
            </div>
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">{t('pronunciation')}</label>
          <div className="relative flex items-center">
            <input value={pronunciation ? pronunciation : ""} onChange={(e) => setPronunciation(e.target.value)} name="pronunciation" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder={t('pronunciation-placeholder')} />
          </div>
        </div>

        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">{t('public')}</label>
          <div className="relative">
            <label htmlFor="published" className='capitalize text-sm'>
              <input id="published" type="checkbox" checked={published} name="published" onChange={(e) => setPublished(e.target.checked)} className="mr-1.5" />
              {t('published')}
            </label>
          </div>
        </div>

      </div>

      <div className="w-full">
        <div className="mt-2.5">
          <label className="text-gray-800 text-sm mb-1 block">{tMaps('sources')}</label>
          <WYSIWYGEDitor sources={sources} setSources={setSources} />
        </div>
      </div>


      <div className="mt-6">
        <label className="text-gray-800 text-normal mb-1 block">{tMaps('media')}</label>
        <MediaEditor media={media} setMedia={setMedia} />
      </div>

      <div className="mt-6">
        <label className="text-gray-800 text-normal mb-1 block">{tMaps('websites')}</label>
        <WebsiteEditor websites={websites} setWebsites={setWebsites} />
      </div>

      <div className="mt-6">
        <label className="text-gray-800 text-normal mb-1 block">{tMaps('related')}</label>
        <RelationEditor relatedTo={relatedTo} setRelatedTo={setRelatedTo} />
      </div>

      <div className="mt-6">
        <label className="text-gray-800 text-normal mb-1 block">{tMaps('changelog')}</label>
        <ChangelogEditor changelog={changelog} setChangelog={setChangelog} />
      </div>

      <div className="flex">
        <div className="w-full md:w-1/2">
          <div className="!mt-8">
            <button onClick={() => savePolygon()} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              {tCommon('save')}
            </button>
          </div>

        </div>

        <div className="w-full md:w-1/2">
          <div className="!mt-8 flex justify-end">
            <button onClick={() => deletePolygon()} className="py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none">
              {tCommon('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
