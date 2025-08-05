import { useEffect, useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { getUniqueFeatures } from '@/components/front-map/map-utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function MainMap({ map, setMap, setSelectedFeature }) {

  const t = useTranslations('FrontMap');

  const [ popup, setPopup ] = useState(false);
  const reciprocityLayers = ["next-nld-risks-source-layer", "next-nld-renewals-source-layer"];

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
      mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js', null, true);
    }
    mapboxgl.clearStorage();
    const newMap = new mapboxgl.Map({
      center : [151.48, -34.21],
      zoom : 3,
      container: "nld-reciprocity-map",
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_RISKS_RENEWALS,
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
        addEventListeners();
        pointAnimation(map)
      })
    }
  }, [map, popup])

  const pointAnimation = (map) => {
    let risksWidth = 1;
    setInterval(() => {
      risksWidth = risksWidth >= 5 ? 1 : risksWidth + 0.2;
      map.setPaintProperty('next-nld-risks-source-layer', 'circle-stroke-width', risksWidth);
    }, 30);
    let renewalsWidth = 1;
    setInterval(() => {
      renewalsWidth = renewalsWidth >= 5 ? 1 : renewalsWidth + 0.2;
      map.setPaintProperty('next-nld-renewals-source-layer', 'circle-stroke-width', renewalsWidth);
    }, 50);
  }

  const addEventListeners = () => {
    reciprocityLayers.forEach(reciprocityLayer => {
      map.on('mouseover', reciprocityLayer, () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseout', reciprocityLayer, () => {
        map.getCanvas().style.cursor = ''
      })
    })
    
    map.on("click", (e) => {
      const featuresUnderMouse = map.queryRenderedFeatures(e.point, { layers: ["next-nld-risks-source-layer", "next-nld-renewals-source-layer"] });
      const noDuplicates = getUniqueFeatures(featuresUnderMouse, 'id');
      setSelectedFeature(noDuplicates[0]);
    });
  }
  
    const entryQuery = async (query) => {
      if(query && query.length > 2) {
        return fetch(`/api/entry/searcher?s=${query}&geosearch=true&category=risks,renewals`)
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
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
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
    <div id="nld-reciprocity-map" className="w-full h-full"></div>
  );
}
