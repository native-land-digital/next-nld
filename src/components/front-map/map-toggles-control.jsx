import { useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import Link from 'next/link'

import { exportMap } from '@/components/front-map/map-utils';

export default function TogglesControl({ setModalOpen, allLayers, map }) {

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
      <div className="absolute right-0 top-0 m-4 z-10">
        <div className="rounded-full border nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer hover:bg-sky-800">
          <Link prefetch={false} href="/">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 17L21 12L16 7" stroke="#A0C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 12H9" stroke="#A0C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#A0C6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </Link>
        </div>
        <div onClick={() => setModalOpen(true)} className="mt-4 rounded-full border nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer hover:bg-sky-800">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11C12.5523 11 13 11.4477 13 12V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V12C11 11.4477 11.4477 11 12 11Z" fill="#A0C6CD"/>
            <path d="M12.0098 7C12.5621 7 13.0098 7.44772 13.0098 8C13.0098 8.55228 12.5621 9 12.0098 9H12C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7H12.0098Z" fill="#A0C6CD"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="#A0C6CD"/>
          </svg>
        </div>
        <div onClick={() => zoomText()} className="mt-4 rounded-full border nld-text-teal-100 nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer hover:bg-sky-800">
          Zoom
        </div>
        <div onClick={() => exportMap(map)} className="hidden md:block mt-4 rounded-full border nld-text-teal-100 nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer hover:bg-sky-800">
          Print
        </div>
        <div onClick={() => toggleColors()} className="mt-4 rounded-full border nld-text-teal-100 nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer hover:bg-sky-800">
          Colors
        </div>
        <div onClick={() => toggleLabels()} className="mt-4 rounded-full border nld-text-teal-100 nld-border-teal-100 nld-bg-blue-800 p-2.5 cursor-pointer hover:bg-sky-800">
          Labels
        </div>
      </div>
    )
  }
