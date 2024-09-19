import { useState } from 'react';
import Switch from "react-switch";
import Select from 'react-select';

import { exportMap } from '@/components/map/map-utils';

import './map.geocoder.css';
import styles from './map.module.css';

export default function TogglesControl({ allLayers, map }) {

    const [ textZoomed, setTextZoomed ] = useState(false);
    const [ colorsOn, setColorsOn ] = useState(true);
    const [ labelsOn, setLabelsOn ] = useState(false);

    const zoomText = () => {
      allLayers.forEach(layer => {
        if(textZoomed) {
          map.setLayoutProperty(layer + "_text", "text-size", {
            base: 1,
            stops: [
              [0, 8],
              [22, 18],
            ],
          });
        } else {
          map.setLayoutProperty(layer + "_text", "text-size", {
            base: 1,
            stops: [
              [0, 15],
              [22, 30],
            ],
          });
        }
      })
      setTextZoomed(!textZoomed)
    }

    const printMap = () => {

    }

    const toggleColors = () => {
      allLayers.forEach(layer => {
        if(colorsOn) {
          map.setPaintProperty(layer, "fill-color", "rgba(255,255,255,0)");
        } else {
          map.setPaintProperty(layer, "fill-color", ["get", "color"]);
        }
      })
      setColorsOn(!colorsOn)
    }

    const toggleLabels = () => {
      allLayers.forEach(layer => {
        map.getStyle().layers.forEach((layer) => {
          if((layer.type === "symbol" ||
            layer["source-layer"] === "admin" ||
            layer["source-layer"] === "road" ||
            layer["source-layer"] === "landuse") &&
          !(
            layer.id.indexOf("territories") > -1 ||
            layer.id.indexOf("languages") > -1 ||
            layer.id.indexOf("treaties") > -1
          )) {
            if(labelsOn) {
              map.setLayoutProperty(layer.id, "visibility", "none");
            } else {
              map.setLayoutProperty(layer.id, "visibility", "visible");
            }
          }
        });
      })
      setLabelsOn(!labelsOn)
    }

    return (
      <div className={styles.nld_toggles_control_container}>
        <button onClick={() => zoomText()} className={styles.nld_toggles_button}>Zoom</button>
        <button onClick={() => exportMap(map)} className={styles.nld_toggles_button}>Print</button>
        <button onClick={() => toggleColors()} className={styles.nld_toggles_button}>Colors</button>
        <button onClick={() => toggleLabels()} className={styles.nld_toggles_button}>OpenStreetMap Labels</button>
      </div>
    )
}
