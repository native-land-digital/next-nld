import { useEffect, useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { randomPlacenameStartingPosition, getUniqueFeatures, isMobile } from '@/components/front-map/map-utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function MainMap({ map, setMap, setSelectedFeature }) {

  const t = useTranslations('FrontMap');

  const [ popup, setPopup ] = useState(false);
  const placenameLayers = ["next-nld-placenames-major", "next-nld-placenames-minor", "next-nld-placenames-mini"];

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
      mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js', null, true);
    }
    mapboxgl.clearStorage();
    const newMap = new mapboxgl.Map({
      ...randomPlacenameStartingPosition(),
      zoom : 2,
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
    placenameLayers.forEach(placenameLayer => {
      map.setPaintProperty(placenameLayer, 'text-color', [
        "case",
        ["boolean", ["feature-state", "hover"], false], '#333333',
        '#000000',
      ]);
    });
  }

  const addEventListeners = () => {
    placenameLayers.forEach(placenameLayer => {
      map.on('mouseover', placenameLayer, () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseout', placenameLayer, () => {
        map.getCanvas().style.cursor = ''
      })
    })
    
    map.on("click", (e) => {
      const featuresUnderMouse = map.queryRenderedFeatures(e.point, { layers: ["next-nld-placenames-major", "next-nld-placenames-minor", "next-nld-placenames-mini"] });
      const noDuplicates = getUniqueFeatures(featuresUnderMouse, 'id');
      console.log(noDuplicates)
      setSelectedFeature(noDuplicates[0]);
    });
  }
  
    const entryQuery = async (query) => {
      if(query && query.length > 2) {
        return fetch(`/api/entry/searcher?s=${query}&geosearch=true&category=placenames`)
          .then(resp => resp.json())
          .then(response => {
            const features = response.map((entry, i) => {
              return {
                type : "Feature",
                id : `feature-from-db-${i}`,
                place_name : entry.name + ` (${entry.category})`,
                center : entry.centroid.coordinates,
              }
            })
            return Promise.resolve(features);
          })
      } else {
        return []
      }
    }

  const addControls = () => {
    if(!isMobile()) {
      const nav = new mapboxgl.NavigationControl();
      map.addControl(nav, "bottom-right");
    }
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
      mapboxgl: mapboxgl,
      placeholder : t('search'),
      externalGeocoder : entryQuery,
      flyTo : {
        maxDuration : 100,
        maxZoom : 12
      }
    });
    document.getElementById('nld_geocoder').appendChild(geocoder.onAdd(map));
  }

  return (
    <div id="nld-placenames-map" className="w-full h-full"></div>
  );
}
