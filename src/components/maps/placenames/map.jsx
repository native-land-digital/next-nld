import { useEffect, useState, useRef } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function MainMap({ map, setMap }) {

  const t = useTranslations('FrontMap');

  const [ popup, setPopup ] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    mapboxgl.clearStorage();
    const newMap = new mapboxgl.Map({
      center : [172.42, -40.83],
      zoom : 4.39,
      container: "nld-placenames-map",
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_PLACENAMES,
      showZoom: false,
      showCompass: false,
      preserveDrawingBuffer: true,
    });
    setMap(newMap)

    const newPopup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 10,
    });
    setPopup(newPopup)
  }, []);

  useEffect(() => {
    if(map && popup) {
      addControls();

      map.on('load', () => {
        addLayerStyles();
        addEventListeners();
      })
    }
  }, [map, popup])

  const addLayerStyles = () => {
    map.setPaintProperty('next-nld-placenames-major', 'text-color', [
      "case",
      ["boolean", ["feature-state", "hover"], false], '#333333',
      '#000000',
    ]);
  }

  const addEventListeners = () => {
    let hoveredId = false;
    map.on('mouseover', 'next-nld-placenames-major', (e) => {
      hoveredId = e.features[0].id;
      map.setFeatureState(
          { source: 'composite', sourceLayer : 'next_nld_place_local_source_layer', id: hoveredId },
          { hover: true }
      );
    })
    map.on('mouseout', 'next-nld-placenames-major', (e) => {
      map.setFeatureState(
          { source: 'composite', sourceLayer : 'next_nld_place_local_source_layer', id: hoveredId },
          { hover: false }
      );
      hoveredId = false;
    })
  }

  const addControls = () => {
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
  }

  return (
    <div id="nld-placenames-map" className="w-full h-full"></div>
  );
}
