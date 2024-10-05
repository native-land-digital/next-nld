import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Switch from "react-switch";
import AsyncSelect from 'react-select/async';
import { Link } from '@/i18n/routing';

import { makeBoundsFromPoly } from '@/components/front-map/map-utils';

import './map.geocoder.css';

export default function SelectorControl({ allLayers, map, currentLayers, setCurrentLayers, selectedFeatures, setSelectedFeatures, territoryOptions, languageOptions, treatyOptions }) {

    const t = useTranslations('FrontMap');

    const [ toggledFeatures, setToggledFeatures ] = useState([])

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
      fetch(`/api/polygons/search/${id}`).then(resp => resp.json()).then(polygon => {
        const bounds = makeBoundsFromPoly(polygon)
        map.fitBounds(bounds, { padding : 20 })
        adjustCurrentLayers(true, category);
      })
    }

    const loadTerritoryOptions = (inputValue, callback) => {
      if(inputValue.length >= 2) {
        fetch(`/api/polygons/search?s=${inputValue}&category=territories`).then(resp => resp.json()).then(response => {
          callback(response.map(polygon => {
            return {
              value : polygon.id,
              label : polygon.name
            }
          }));
        })
      }
    };

    const loadLanguageOptions = (inputValue, callback) => {
      if(inputValue.length >= 2) {
        fetch(`/api/polygons/search?s=${inputValue}&category=languages`).then(resp => resp.json()).then(response => {
          callback(response.map(polygon => {
            return {
              value : polygon.id,
              label : polygon.name
            }
          }));
        })
      }
    };

    const loadTreatyOptions = (inputValue, callback) => {
      if(inputValue.length >= 2) {
        fetch(`/api/polygons/search?s=${inputValue}&category=treaties`).then(resp => resp.json()).then(response => {
          callback(response.map(polygon => {
            return {
              value : polygon.id,
              label : polygon.name
            }
          }));
        })
      }
    };

    return (
      <div className="w-72 absolute z-10 left-0 top-0 m-2.5">
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
          </div>
          <hr className="mt-1.5 border-slate-300" />
          <div>
            <p className="hidden md:block text-xs text-black mt-2.5">{t('search-address')} <Link prefetch={false} href="https://native-land.ca/teachers-guide/">{t('think-critically')}</Link>.</p>
            <div id="nld_geocoder" className="m-0" />
          </div>
        </div>
        <div className="hidden md:block mt-2.5 text-black">
          <AsyncSelect
            instanceId="territories-select"
            placeholder={t('territories')}
            onChange={(e) => selectDropdown(e.value, 'territories')}
            defaultOptions={territoryOptions.map(territory => { return { value : territory.id, label : territory.name }})}
            cacheOptions
            loadOptions={loadTerritoryOptions} />
        </div>
        <div className="hidden md:block mt-2.5 text-black">
          <AsyncSelect
            instanceId="languages-select"
            placeholder={t('languages')}
            cacheOptions
            onChange={(e) => selectDropdown(e.value, 'languages')}
            defaultOptions={languageOptions.map(language => { return { value : language.id, label : language.name }})}
            loadOptions={loadLanguageOptions} />
        </div>
        <div className="hidden md:block mt-2.5 text-black">
          <AsyncSelect
            instanceId="treaties-select"
            placeholder={t('treaties')}
            cacheOptions
            onChange={(e) => selectDropdown(e.value, 'treaties')}
            defaultOptions={treatyOptions.map(treaty => { return { value : treaty.id, label : treaty.name }})}
            loadOptions={loadTreatyOptions} />
        </div>
        {selectedFeatures.length > 0 ?
          <div className="shadow-lg shadow-gray-500/40 bg-white rounded p-2.5 mt-2.5 relative">
            <div className="absolute top-0 right-0 block md:hidden p-1" onClick={() => setSelectedFeatures([])}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </div>
            <p className="text-sm text-black mb-1.5">{t('contact-nations')}</p>
            <ul className="list-none">
              {selectedFeatures.map(feature => {
                return (
                  <li key={`selected-features-${feature.properties.Slug}`}>
                    <input type="checkbox" checked={toggledFeatures.indexOf(feature.properties.Slug) === -1} className="mr-1.5" onChange={() => nationToggle(feature.properties.Slug)} />
                    <Link prefetch={false} href={process.env.VERCEL_ENV && process.env.VERCEL_ENV === 'preview' ? feature.properties.description.substring(feature.properties.description.indexOf('/')) : feature.properties.description} target="_blank">{feature.properties.Name} ↗</Link>
                  </li>)
              })}
            </ul>
          </div>
        : false}
      </div>
    )
}
