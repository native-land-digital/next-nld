import { useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import Switch from "react-switch";
import AsyncSelect from 'react-select/async';
import Link from 'next/link'

import { makeBoundsFromPoly, isMobile } from '@/components/front-map/map-utils';

import './map.geocoder.css';

export default function SelectorControl({ allLayers, map, currentLayers, setCurrentLayers, selectedFeatures, setSelectedFeatures, territoryOptions, languageOptions, treatyOptions }) {

    const t = useTranslations('FrontMap');
    const tMaps = useTranslations('Listings');

    const [ toggledFeatures, setToggledFeatures ] = useState([])
    const [ showLists, setShowLists ] = useState(false)
    const [ resultsSlided, setResultsSlided ] = useState(false)

    const adjustCurrentLayers = (checked, layer) => {
      const newCurrentLayers = JSON.parse(JSON.stringify(currentLayers));
      if(checked) {
        newCurrentLayers.push(layer);
      } else {
        newCurrentLayers.splice(newCurrentLayers.indexOf(layer), 1);
      }
      setCurrentLayers(newCurrentLayers);
    }

    const nationToggle = (slug) => {
      const newToggledFeatures = JSON.parse(JSON.stringify(toggledFeatures))
      if(newToggledFeatures.indexOf(slug) > -1) {
        newToggledFeatures.splice(newToggledFeatures.indexOf(slug), 1)
      } else {
        newToggledFeatures.push(slug);
      }
      allLayers.forEach(layer => {
        map.setFilter(layer, [
          "!",
          ["in", ["get", "Slug"], ["literal", newToggledFeatures]],
        ]);
        map.setFilter(layer + "_text", [
          "!",
          ["in", ["get", "Slug"], ["literal", newToggledFeatures]],
        ]);
      })
      setToggledFeatures(newToggledFeatures)
    }

    const selectDropdown = (id, category) => {
      fetch(`/api/entry/searcher?id=${id}&geosearch=true`).then(resp => resp.json()).then(entry => {
        const bounds = makeBoundsFromPoly(entry[0])
        map.fitBounds(bounds, { padding : 20 })
        adjustCurrentLayers(true, category);
      })
    }

    const loadTerritoryOptions = (inputValue, callback) => {
      if(inputValue.length >= 3) {
        fetch(`/api/entry/searcher?s=${inputValue}&category=territories`).then(resp => resp.json()).then(response => {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : entry.name
            }
          }));
        })
      }
    };

    const loadLanguageOptions = (inputValue, callback) => {
      if(inputValue.length >= 3) {
        fetch(`/api/entry/searcher?s=${inputValue}&category=languages`).then(resp => resp.json()).then(response => {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : entry.name
            }
          }));
        })
      }
    };

    const loadTreatyOptions = (inputValue, callback) => {
      if(inputValue.length >= 3) {
        fetch(`/api/entry/searcher?s=${inputValue}&category=treaties`).then(resp => resp.json()).then(response => {
          callback(response.map(entry => {
            return {
              value : entry.id,
              label : entry.name
            }
          }));
        })
      }
    };

    const setGreetingsLayer = (checked) => {
      if(checked && map) {
        setCurrentLayers(['greetings'])
        map.flyTo({ center : [-100.1953125, 47.27922900257082] })
      } else {
        setCurrentLayers([])
      }
    }

    return (
      <div className="w-80 absolute z-10 left-0 top-0 m-2.5">
        <div className="w-full shadow-lg shadow-gray-500/40 bg-white rounded p-2.5">
          <div className="flex justify-between items-center text-center text-sm text-black">
            <div>
              <Switch
                checked={currentLayers.indexOf('territories') > -1}
                onChange={(checked) => adjustCurrentLayers(checked, 'territories')}
                width={40}
                height={20}
                onColor={"#1e3a8a"} // blue-900
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={15} />
              <p>{t('territories')}</p>
            </div>
            <div>
              <Switch
                checked={currentLayers.indexOf('languages') > -1}
                onChange={(checked) => adjustCurrentLayers(checked, 'languages')}
                width={40}
                height={20}
                onColor={"#1e3a8a"} // blue-900
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={15} />
              <p>{t('languages')}</p>
            </div>
            <div>
              <Switch
                checked={currentLayers.indexOf('treaties') > -1}
                onChange={(checked) => adjustCurrentLayers(checked, 'treaties')}
                width={40}
                height={20}
                onColor={"#1e3a8a"} // blue-900
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={15} />
              <p>{t('treaties')}</p>
            </div>
            <div className="hidden bg-white rounded md:absolute md:right-0 md:-mr-[90px] md:shadow-lg md:p-2.5">
              <span className="md:hidden bg-green-700 p-1 rounded text-xs text-white absolute right-0 -mt-4 -mr-4">{t('new')}</span>
              <Switch
                checked={currentLayers.indexOf('greetings') > -1}
                onChange={(checked) => setGreetingsLayer(checked)}
                width={40}
                height={20}
                onColor={"#1e3a8a"} // blue-900
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={15} />
              <p>{tMaps('greetings')}</p>
              <span className="hidden md:block bg-green-700 p-1 rounded text-xs text-white ml-3.5 absolute mt-1">{t('new')}</span>
            </div>
          </div>
          <hr className="mt-1.5 border-slate-300" />
          <div>
            <p className="hidden md:block text-xs text-black mt-2.5">{t('search-address')} <Link prefetch={false} href="/resources/teachers-guide/">{t('think-critically')}</Link>.</p>
            <div id="nld_geocoder" className="m-0" />
          </div>
          <div className="block md:hidden mt-1 rounded bg-slate-100 p-1" onClick={() => setShowLists(!showLists)}>
            <p>
              <svg className={`inline-block transition ${showLists ? '' : '-rotate-90'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
              </svg>
              <span className="ml-1 text-xs text-black">Click here to search Indigenous nations</span>
            </p>
          </div>
        </div>
        <div className={`${showLists ? 'block' : 'hidden'} md:block mt-2.5 text-black`}>
          <AsyncSelect
            instanceId="territories-select"
            placeholder={t('search-territories')}
            onChange={(e) => selectDropdown(e.value, 'territories')}
            defaultOptions={territoryOptions.map(territory => { return { value : territory.id, label : territory.name }})}
            cacheOptions
            loadOptions={loadTerritoryOptions} />
        </div>
        <div className={`${showLists ? 'block' : 'hidden'} md:block mt-2.5 text-black`}>
          <AsyncSelect
            instanceId="languages-select"
            placeholder={t('search-languages')}
            cacheOptions
            onChange={(e) => selectDropdown(e.value, 'languages')}
            defaultOptions={languageOptions.map(language => { return { value : language.id, label : language.name }})}
            loadOptions={loadLanguageOptions} />
        </div>
        <div className={`${showLists ? 'block' : 'hidden'} md:block mt-2.5 text-black`}>
          <AsyncSelect
            instanceId="treaties-select"
            placeholder={t('search-treaties')}
            cacheOptions
            onChange={(e) => selectDropdown(e.value, 'treaties')}
            defaultOptions={treatyOptions.map(treaty => { return { value : treaty.id, label : treaty.name }})}
            loadOptions={loadTreatyOptions} />
        </div>
        {selectedFeatures.length > 0 ?
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
            <p className="text-sm text-black mb-1.5">{t('contact-nations')}</p>
            <ul className="list-none">
              {selectedFeatures.map(feature => {
                const icon = feature.layer.id !== "greetings" ? "↗" : "🕪";
                return (
                  <li key={`selected-features-${feature.properties.Slug}`}>
                    <input type="checkbox" checked={toggledFeatures.indexOf(feature.properties.Slug) === -1} className="mr-1" onChange={() => nationToggle(feature.properties.Slug)} />
                    <Link prefetch={false} href={process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'preview' ? feature.properties.description.substring(feature.properties.description.indexOf('/')) : feature.properties.description} target="_blank">{feature.properties.Name} {icon}</Link>
                  </li>)
              })}
            </ul>
          </div>
        : false}
      </div>
    )
}
