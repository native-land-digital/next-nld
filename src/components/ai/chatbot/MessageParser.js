'use client'
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

const MessageParser = ({ children, actions }) => {

  useEffect(() => {
    let geocoderCreated = false;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    if(!geocoderCreated) {
      geocoderCreated = true;
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
      });
      geocoder.on('result', async (e) => {
        const apiResponse = await fetch(`https://native-land.ca/api/index.php?maps=territories&position=${e.result.center[1]},${e.result.center[0]}`)
        const parsedResponse = await apiResponse.json();
        const nations = parsedResponse.map(feature => feature.properties["Name"]);
        parse(`Let's talk about ${e.result.place_name}.`, nations);
      });
      const addGeocoderInterval = setInterval(() => {
        if(typeof document !== 'undefined') {
          if(document.getElementById('ai-geocoder')) {
            geocoder.addTo('#ai-geocoder');
            clearInterval(addGeocoderInterval)
          }
        }
      }, 50)
    }
  }, [])

  const parse = (message, api_nations = []) => {
    actions.getAIResponse(message, api_nations);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
