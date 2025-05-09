import { useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import Switch from "react-switch";
import AsyncSelect from 'react-select/async';
import Link from 'next/link'

import { makeBoundsFromPoly, isMobile } from '@/components/front-map/map-utils';

import '@/components/front-map/map.geocoder.css';

export default function SelectorControl({ map, selectedFeature, setSelectedFeature }) {

    const t = useTranslations('FrontMap');
    const tMaps = useTranslations('Maps');

    const [ toggledFeatures, setToggledFeatures ] = useState([])
    const [ showLists, setShowLists ] = useState(false)
    const [ resultsSlided, setResultsSlided ] = useState(false)

    const selectDropdown = (id, category) => {
      fetch(`/api/entry/searcher?id=${id}&geosearch=true`).then(resp => resp.json()).then(entry => {
        const bounds = makeBoundsFromPoly(entry[0])
        map.fitBounds(bounds, { padding : 20 })
        adjustCurrentLayers(true, category);
      })
    }

    const loadPlacenameOptions = (inputValue, callback) => {
      if(inputValue.length >= 3) {
        fetch(`/api/entry/searcher?s=${inputValue}&category=placenames`).then(resp => resp.json()).then(response => {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : entry.name
            }
          }));
        })
      }
    };

    return (
      <div className="w-80 absolute z-10 left-0 top-0 m-2.5">
        <div className="w-full shadow-lg shadow-gray-500/40 bg-white rounded p-2.5">
          <div>
            <p className="hidden md:block text-xs text-black">{tMaps('search-address-placenames')}</p>
            <div id="nld_geocoder" className="m-0" />
          </div>
          <div className="block md:hidden mt-1 rounded bg-slate-100 p-1" onClick={() => setShowLists(!showLists)}>
            <p>
              <svg className={`inline-block transition ${showLists ? '' : '-rotate-90'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
              <span className="ml-1 text-xs text-black">Click here to search Indigenous placenames</span>
            </p>
          </div>
        </div>
        <div className={`${showLists ? 'block' : 'hidden'} md:block mt-2.5 text-black`}>
          <AsyncSelect
            instanceId="placenames-select"
            placeholder={t('search-placenames')}
            onChange={(e) => selectDropdown(e.value, 'placenames')}
            cacheOptions
            loadOptions={loadPlacenameOptions} />
        </div>
        {selectedFeature ?
          <div className={`shadow-lg shadow-gray-500/40 bg-white rounded p-2.5 mt-2.5 relative transition ease-in-out ${resultsSlided ? 'w-full -translate-x-64' : ''}`}>
            <div className="absolute top-0 right-0 block md:hidden p-1" onClick={() => {
              if(isMobile()) {
                setResultsSlided(!resultsSlided)
              } else {
                setSelectedFeatures([])
              }
            }}>
              {resultsSlided ?
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#000" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                  <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>
              :
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
              }
            </div>
            <p className="text-sm text-black mb-1.5">{tMaps('placename-disclaimer')}</p>
            <ul className="list-none">
              <li>
                <Link prefetch={false} href={process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'preview' ? selectedFeature.properties.description.substring(selectedFeature.properties.description.indexOf('/')) : selectedFeature.properties.description} target="_blank">{selectedFeature.properties.Name} ↗</Link>
              </li>
            </ul>
          </div>
        : false}
      </div>
    )
}
