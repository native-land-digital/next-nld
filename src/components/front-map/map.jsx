import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { randomStartingPosition, createSetFeatureCollection, makeBoundsFromPoly, getUniqueFeatures } from '@/components/front-map/map-utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function MainMap({ allLayers, map, setMap, setSelectedFeatures, currentLayers }) {

  const t = useTranslations('FrontMap');

  const currentLayersRef = useRef(currentLayers);
  const [ popup, setPopup ] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    mapboxgl.clearStorage();
    const newMap = new mapboxgl.Map({
      ...randomStartingPosition(),
      container: "nld-mapbox-map",
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
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
      setLayerEvents();
    }
  }, [map, popup])

  useEffect(() => {
    // A bit crappy, but needed to pass the reference to events already defined
    currentLayersRef.current = currentLayers;
    // Adjusting layer visibility
    if(map) {
      allLayers.forEach(layer => {
        map.setLayoutProperty(
          layer,
          "visibility",
          currentLayers.indexOf(layer) > -1 ? "visible" : "none"
        );
        map.setLayoutProperty(
          layer + "_text",
          "visibility",
          currentLayers.indexOf(layer) > -1 ? "visible" : "none"
        );
      })
    }
  }, [currentLayers])

  const polygonQuery = async (query) => {
    if(query && query.length > 3) {
      return fetch(`/api/polygons/search?s=${query}&geosearch=true`)
        .then(resp => resp.json())
        .then(response => {
          const features = response.map((polygon, i) => {
            return {
              type : "Feature",
              id : `feature-from-db-${i}`,
              place_name : polygon.name + ` (${polygon.category})`,
              center : polygon.centroid.coordinates,
              bbox : makeBoundsFromPoly(polygon)
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
      externalGeocoder : polygonQuery,
      flyTo : {
        maxDuration : 100,
        maxZoom : 12
      }
    });
    geocoder.on('result', ({ result }) => {
      setTimeout(() => {
        const createSelectedFeatures = createSetFeatureCollection("isSelected", map);
        const point = map.project(result.center);
        const featuresUnderMouse = map.queryRenderedFeatures(point, { layers: currentLayersRef.current });
        const noDuplicates = getUniqueFeatures(featuresUnderMouse, 'id');
        createSelectedFeatures(noDuplicates);
        setSelectedFeatures(noDuplicates);
      }, 500)
    })
    document.getElementById('nld_geocoder').appendChild(geocoder.onAdd(map));
  }

  const setLayerEvents = () => {
    const loadCheck = setInterval(() => {
      if(map.loaded()) {
        clearInterval(loadCheck)
        allLayers.forEach(layer => {
          // Ensuring popup disappears
          map.on('mouseout', layer, () => popup.remove());
          // Setting hover opacity effects
          // These are tied to the custom feature states defined in the events created below
          map.setPaintProperty(layer, "fill-opacity", [
            "case",
            ["to-boolean", ["feature-state", "isHovered"]], 0.5,
            ["to-boolean", ["feature-state", "isSelected"]], 0.4,
            0.2,
          ]);
          map.setPaintProperty(layer, "fill-outline-color", [
            "case",
            ["to-boolean", ["feature-state", "isHovered"]], "#000000",
            ["to-boolean", ["feature-state", "isSelected"]], "#1212A0",
            ["get", "color"]
          ]);
        });

        // Events to assign custom feature state
        const createHoveredFeatures = createSetFeatureCollection("isHovered", map);
        const createSelectedFeatures = createSetFeatureCollection("isSelected", map);
        map.on("mousemove", function (e) {
          const featuresUnderMouse = map.queryRenderedFeatures(e.point, { layers: currentLayersRef.current });
          createHoveredFeatures(featuresUnderMouse);
          // Add popup
          let html = "";
          featuresUnderMouse.forEach(function (feature) {
            const itemMarkup = "<p style='color: #333;'>" + feature.properties.Name + "</p>";
            if (!html.includes(itemMarkup)) {
              html += itemMarkup;
            }
          });
          if (html) {
            popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
          }
        });

        map.on("click", (e) => {
          const featuresUnderMouse = map.queryRenderedFeatures(e.point, { layers: currentLayersRef.current });
          const noDuplicates = getUniqueFeatures(featuresUnderMouse, 'id');
          createSelectedFeatures(noDuplicates);
          setSelectedFeatures(noDuplicates);
        });

      }
    }, 100)
  }

  return (
    <div id="nld-mapbox-map" className="w-full h-full"></div>
  );
}
