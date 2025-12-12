import { useEffect, useState, useRef } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import mapboxgl from 'mapbox-gl';
import circle from '@turf/circle';
import bbox from '@turf/bbox';
import booleanContains from '@turf/boolean-contains';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { randomStartingPosition, createSetFeatureCollection, entryQuery, getUniqueFeatures, isMobile } from '@/components/maps/map-utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function MainMap({ allLayers, map, setMap, setSelectedFeatures, currentLayers }) {

  const t = useTranslations('FrontMap');

  const currentLayersRef = useRef(currentLayers);
  const [ loaded, setLoaded ] = useState(false);
  const [ popup, setPopup ] = useState(false);
  const [ hoveredFeatures, setHoveredFeatures ] = useState([])

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    // mapboxgl.clearStorage();
    if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
      mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js', null, true);
    }
    const newMap = new mapboxgl.Map({
      ...randomStartingPosition(),
      container: "nld-mapbox-map",
      style: isMobile() ? process.env.NEXT_PUBLIC_MAPBOX_STYLE_CONSTELLATIONS_MOBILE : process.env.NEXT_PUBLIC_MAPBOX_STYLE_CONSTELLATIONS,
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
      map.resize();
      addControls();
      setLayerEvents();
      setLoaded(true);
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

  const setPulsing = () => {
    let lastPulseUpdate = new Date().getTime();
    let pulseTime = 0;

    function animatePulse() {
      let timestamp = new Date().getTime()
      if (timestamp - lastPulseUpdate > 50) {
        pulseTime = (pulseTime + 0.1) % (Math.PI * 2);

        map.setPaintProperty('nation-small-dots', 'circle-radius', [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          3,
          [
            '+',
            2.5,
            [
              'sin',
              [
                '+',
                pulseTime,
                ['*', ['id'], 0.15] // <-- unique offset from feature ID
              ]
            ]
          ]
        ]);

        map.setPaintProperty('nation-large-dots', 'circle-radius', [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          6,
          [
            '+',
            4,
            [
              'sin',
              [
                '+',
                pulseTime,
                ['*', ['id'], 0.15] // <-- unique offset from feature ID
              ]
            ]
          ]
        ]);

        lastPulseUpdate = new Date().getTime()
      }
      requestAnimationFrame(animatePulse);
    }
    animatePulse();
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
            ["to-boolean", ["feature-state", "isHovered"]], 0.01,
            ["to-boolean", ["feature-state", "isSelected"]], 0.01,
            0,
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
          const noDuplicates = getUniqueFeatures(featuresUnderMouse, 'id');
          setHoveredFeatures(noDuplicates)
          // Add popup
          // let html = "";
          // featuresUnderMouse.forEach(function (feature) {
          //   const itemMarkup = "<p style='color: #333;'>" + feature.properties.Name + "</p>";
          //   if (!html.includes(itemMarkup)) {
          //     html += itemMarkup;
          //   }
          // });
          // if (html) {
          //   if(!isMobile()) {
          //     popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
          //   }
          // }
        });

        map.on("click", (e) => {
          const featuresUnderMouse = map.queryRenderedFeatures(e.point, { layers: currentLayersRef.current });
          const noDuplicates = getUniqueFeatures(featuresUnderMouse, 'id');
          createSelectedFeatures(noDuplicates);
          setSelectedFeatures(noDuplicates);
        });

        if(!isMobile()) {

          setPulsing()

          map.setPaintProperty('nation-names', 'text-opacity', [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0
          ]);

          const pointLayer = map.getStyle().layers.find(layer => layer['source-layer'].indexOf('nld_terr_p') > -1)
          const pointLayerSource = pointLayer['source-layer'];

          let storedFeatureIDs = []
          map.on('mousemove', (e) => {
            let newHoveredFeatures = []
            const mapZoom = map.getZoom();
            const circlePoint = circle([e.lngLat.lng, e.lngLat.lat], scaleZoomRadius(mapZoom))
            const bboxCircle = bbox(circlePoint)
            const swPoint = map.project({ lng : bboxCircle[0], lat : bboxCircle[1] })
            const nePoint = map.project({ lng : bboxCircle[2], lat : bboxCircle[3] })
            const features = map.queryRenderedFeatures([swPoint, nePoint], { layers : ["nation-small-dots"] })
            const circlePoint2 = circle([e.lngLat.lng, e.lngLat.lat], scaleZoomRadius(mapZoom))
            const circleFeatures = features.filter(feature => {
              if(booleanContains(circlePoint2, feature)) {
                return true;
              } else {
                return false;
              }
            })

            storedFeatureIDs.forEach(id => {
              map.setFeatureState(
                { source: 'composite', sourceLayer : pointLayerSource, id: id },
                { hover: false }
              );
            })
            storedFeatureIDs = circleFeatures.map(feature => feature.id);

            if(features.length > 0) {
              newHoveredFeatures = circleFeatures.map(feature => feature.id);
              newHoveredFeatures.forEach(id => {
                map.setFeatureState(
                  { source: 'composite', sourceLayer : pointLayerSource, id: id },
                  { hover: true }
                );
              })
            }
          })
        } else {
          // map.setPaintProperty('nation-names', 'text-opacity', 1)
        }
      }
    }, 100)
  }

  const scaleZoomRadius = (zoom) => {
    const minValue = 2000;
    const maxValue = 10;
    const maxZoom = 19;

    return minValue * Math.pow(maxValue / minValue, zoom / maxZoom);
  }

  return (
    <>
      <div id="nld-mapbox-map" className="w-full h-dvh lg:h-full"></div>
      {!isMobile() && hoveredFeatures.length > 0 ? 
        <div className="absolute nld-text-sm nld-text-teal-100 m-4 mt-0 nld-bg-blue-800-10 rounded-xl p-2.5 top-0 left-1/2 -translate-x-1/2 mt-8 shadow-lg">
          {hoveredFeatures.map((feature, i) => {
            return (
              <div key={`result-${i}`} className={`${hoveredFeatures.length - 1 === i ? "mb-0" : "mb-1"}`}>{feature.properties.Name}</div>
            )
          })}
        </div>
      : false}
      <div className={`absolute top-0 w-screen h-dvh bg-black z-999 flex items-center align-center transition-opacity duration-1000 ease-in-out ${loaded ? 'opacity-0 pointer-events-none' : ''}`}>
        <svg className="m-auto animate-spin" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.99438 2.70404C9.28933 0.278214 13.7175 -0.0267613 17.301 2.07025C19.4146 3.30929 21.0979 5.30671 21.9241 7.81243L22.0774 8.32025L22.1213 8.48138C23.3091 13.0644 20.6366 17.8335 16.095 19.1142L15.9553 19.1533C13.7147 19.7439 11.4497 19.3728 9.59691 18.289C6.13373 16.2626 4.21265 11.7077 6.33129 7.97161C8.14515 4.77374 12.1863 3.58624 15.3801 5.45404C16.808 6.28942 17.9238 7.6704 18.4045 9.40228L18.4338 9.5097C18.6495 10.3427 18.6336 11.1624 18.4387 11.914C18.2289 12.7212 17.8121 13.4497 17.2571 14.038C16.5248 14.8141 15.545 15.3568 14.4661 15.5234C13.5381 15.6668 12.5459 15.5352 11.5901 15.0478L11.3996 14.9452C10.7381 14.5722 10.1474 14.0286 9.75121 13.3622C9.35375 12.6934 9.17299 11.9467 9.23656 11.1659C9.3294 10.0161 9.99701 9.19989 10.8303 8.77435L10.9748 8.70501C11.7087 8.37642 12.5819 8.32879 13.3391 8.66595C14.0745 8.99344 14.6403 9.6551 14.7668 10.6484C14.8242 11.0995 14.524 11.5119 14.092 11.6171L14.0041 11.6337C13.5236 11.7019 13.0755 11.3733 13.0139 10.8896C12.9695 10.5421 12.7967 10.3497 12.5969 10.2607C12.3103 10.1339 11.9251 10.1683 11.6233 10.3222C11.296 10.4897 11.0354 10.8121 10.9973 11.2831C10.964 11.6966 11.0664 12.1034 11.2805 12.4638L11.3752 12.6113C11.6091 12.9455 11.9275 13.2175 12.2913 13.4228C12.9424 13.7896 13.6055 13.8893 14.2112 13.7958C14.8842 13.6919 15.5045 13.3497 15.9729 12.8534C16.3294 12.475 16.5955 12.0102 16.7278 11.4999L16.7688 11.3202C16.8514 10.8961 16.8433 10.4395 16.7219 9.97064L16.6995 9.88568C16.3425 8.59792 15.5183 7.57655 14.468 6.96282C12.1416 5.60253 9.20343 6.46251 7.8723 8.80853C6.2617 11.649 7.80496 15.1996 10.509 16.7822C11.9714 17.6372 13.7507 17.9301 15.5129 17.4658L15.6282 17.4355C19.2455 16.4135 21.3577 12.5995 20.4094 8.94134L20.3733 8.8056C19.7465 6.53086 18.2998 4.72216 16.4514 3.61907L16.385 3.58001C13.4255 1.8482 9.76329 2.09077 7.03539 4.09954C6.17961 4.72979 5.44766 5.51182 4.86938 6.39739C2.62835 9.83008 2.97248 13.9404 5.3557 17.1777C6.1137 18.2077 7.0609 19.1142 8.14379 19.8329C10.494 21.3935 13.4817 22.0613 16.5793 21.1982L16.6663 21.1777C17.1047 21.0993 17.5439 21.3578 17.6653 21.7978C17.794 22.266 17.5099 22.7452 17.0452 22.8769C13.4005 23.8933 9.89033 23.1102 7.14281 21.2861C5.89474 20.4577 4.80098 19.4106 3.92309 18.2177C1.11998 14.4092 0.737202 9.52454 3.38988 5.46185C4.08113 4.40384 4.9603 3.46525 5.99438 2.70404Z" fill="#A0C6CD"/>
        </svg>
      </div>
    </>
  );
}
