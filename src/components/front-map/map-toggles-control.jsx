import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { exportMap } from '@/components/front-map/map-utils';

export default function TogglesControl({ allLayers, map }) {

    const t = useTranslations('FrontMap');

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
      setLabelsOn(!labelsOn)
    }

    return (
      <div className="flex absolute z-10 bottom-0 right-0 mr-10 mb-8">
        <button onClick={() => zoomText()} className="bg-blue-900 px-4 py-2 text-sm rounded text-white mr-2.5 hover:bg-blue-600">{t('zoom')}</button>
        <button onClick={() => exportMap(map)} className="bg-blue-900 px-4 py-2 text-sm rounded text-white mr-2.5 hover:bg-blue-600">{t('print')}</button>
        <button onClick={() => toggleColors()} className="bg-blue-900 px-4 py-2 text-sm rounded text-white mr-2.5 hover:bg-blue-600">{t('colors')}</button>
        <button onClick={() => toggleLabels()} className="bg-blue-900 px-4 py-2 text-sm rounded text-white mr-2.5 hover:bg-blue-600">{t('osm')}</button>
      </div>
    )
}
