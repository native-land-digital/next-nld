import { useState } from 'react';
import Switch from "react-switch";
import Select from 'react-select';

import './map.geocoder.css';
import styles from './map.module.css';

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
      <div className={styles.nld_selector_control_container}>
        <div className={styles.nld_search_control}>
          <div className={styles.nld_switch_container}>
            <div>
              <Switch
                checked={currentLayers.indexOf('territories') > -1}
                onChange={(checked) => adjustCurrentLayers(checked, 'territories')}
                width={40}
                height={20}
                onColor={"#1e325b"}
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
                onColor={"#1e325b"}
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
                onColor={"#1e325b"}
                uncheckedIcon={false}
                checkedIcon={false}
                handleDiameter={15} />
              <p>Treaties</p>
            </div>
          </div>
          <hr className={styles.hr} />
          <div>
            <p className={styles.info_text}>Search your address, or toggle switches above to add shapes. Click around! <a href="https://native-land.ca/teachers-guide/">Think critically about this map</a>.</p>
            <div id="nld_geocoder" className={styles.nld_geocoder} />
          </div>
        </div>
        <div className={styles.nld_select_container}>
          <Select
            placeholder="Territories"
            options={[
              { value: 'chocolate', label: 'Chocolate' },
              { value: 'strawberry', label: 'Strawberry' },
              { value: 'vanilla', label: 'Vanilla' }
            ]} />
        </div>
        <div className={styles.nld_select_container}>
          <Select
            placeholder="Languages"
            options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]} />
        </div>
        <div className={styles.nld_select_container}>
          <Select
            placeholder="Treaties"
            options={[
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
          ]} />
        </div>
        {selectedFeatures.length > 0 ?
          <div className={styles.nld_results_container}>
            <p className={styles.results_text}>Contact local nations to verify:</p>
            <ul className={styles.results_list}>
              {selectedFeatures.map(feature => {
                return <li><input type="checkbox" checked={toggledFeatures.indexOf(feature.properties.Slug) === -1} className={styles.results_checkbox} onChange={() => nationToggle(feature.properties.Slug)} /><a href={feature.properties.description} target="_blank">{feature.properties.Name} ↗</a></li>
              })}
            </ul>
          </div>
        : false}
      </div>
    )
}
