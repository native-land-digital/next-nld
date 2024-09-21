import { useState } from 'react';
import Switch from "react-switch";
import Select from 'react-select';

import './map.geocoder.css';

export default function SelectorControl({ allLayers, map, currentLayers, setCurrentLayers, selectedFeatures }) {

    const [ toggledFeatures, setToggledFeatures ] = useState([])

    const adjustCurrentLayers = (checked, layer) => {
      let newCurrentLayers = JSON.parse(JSON.stringify(currentLayers));
      if(checked) {
        newCurrentLayers.push(layer);
      } else {
        newCurrentLayers.splice(newCurrentLayers.indexOf(layer), 1);
      }
      setCurrentLayers(newCurrentLayers);
    }

    const nationToggle = (slug) => {
      let newToggledFeatures = JSON.parse(JSON.stringify(toggledFeatures))
      if(newToggledFeatures.indexOf(slug) > -1) {
        newToggledFeatures.splice(newToggledFeatures.indexOf(slug), 1)
      } else {
        newToggledFeatures.push(slug);
      }
      console.log(newToggledFeatures);
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
              <p>Territories</p>
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
              <p>Languages</p>
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
              <p>Treaties</p>
            </div>
          </div>
          <hr className="mt-1.5 border-slate-300" />
          <div>
            <p className="text-xs text-black mt-2.5">Search your address, or toggle switches above to add shapes. Click around! <a href="https://native-land.ca/teachers-guide/">Think critically about this map</a>.</p>
            <div id="nld_geocoder" className="m-0" />
          </div>
        </div>
        <div className="mt-2.5">
          <Select
            placeholder="Territories"
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' }
            ]} />
        </div>
        <div className="mt-2.5">
          <Select
            placeholder="Languages"
            options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]} />
        </div>
        <div className="mt-2.5">
          <Select
            placeholder="Treaties"
            options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]} />
        </div>
        {selectedFeatures.length > 0 ?
          <div className="shadow-lg shadow-gray-500/40 bg-white rounded p-2.5 mt-2.5">
            <p className="text-sm text-black mb-1.5">Contact local nations to verify:</p>
            <ul className="list-none">
              {selectedFeatures.map(feature => {
                return (
                  <li key={`selected-features-${feature.properties.Slug}`}>
                    <input type="checkbox" checked={toggledFeatures.indexOf(feature.properties.Slug) === -1} className="mr-1.5" onChange={() => nationToggle(feature.properties.Slug)} />
                    <a href={feature.properties.description} target="_blank">{feature.properties.Name} ↗</a>
                  </li>)
              })}
            </ul>
          </div>
        : false}
      </div>
    )
}
