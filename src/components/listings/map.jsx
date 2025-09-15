'use client'
import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import bbox from "@turf/bbox";

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map({ geometry, category, geometry_type }) {

  useEffect(() => {

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    if (mapboxgl.getRTLTextPluginStatus() === 'unavailable') {
      mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.3.0/mapbox-gl-rtl-text.js', null, true);
    }

    let style = process.env.NEXT_PUBLIC_MAPBOX_STYLE;
    if(category === 'placenames') {
      style = process.env.NEXT_PUBLIC_MAPBOX_STYLE_PLACENAMES
    }
    let mapParams = {
      container: "nld-maps-mapbox-map",
      style: style
    }
    if(geometry_type === 'Point') {
      mapParams.center = geometry.coordinates;
      mapParams.zoom = 13;
    }
    const newMap = new mapboxgl.Map(mapParams);
    const nav = new mapboxgl.NavigationControl();
    newMap.addControl(nav, "bottom-right");
    newMap.on('load', () => {
      if(geometry_type === 'Polygon') {
        const loadedPolygons = geometry.coordinates.map(polygonGeometry => {
          return {
            type : "Feature",
            id : (Math.random() + 1).toString(36).substring(7),
            geometry : {
              type : "Polygon",
              coordinates : polygonGeometry
            }
          }
        })
        const featureCollection = { type : "FeatureCollection", features : loadedPolygons }
        newMap.addSource('geometry-feature', {
          type : "geojson",
          data : featureCollection
        })
        newMap.addLayer({
          id : 'geometry-feature',
          type : "fill",
          source : 'geometry-feature',
          paint : {
            'fill-color' : 'rgba(0, 0, 0, 0.2)'
          }
        })
        newMap.addLayer({
          id : 'geometry-feature-line',
          type : "line",
          source : 'geometry-feature',
          paint : {
            'line-width' : 1
          }
        })
        const bounds = bbox(featureCollection)
        newMap.fitBounds(bounds, { padding : 50, duration : 0 })
      }
    })
  }, [])

  return (
    <div id="map">
      <div id="nld-maps-mapbox-map" className="w-full h-[50vh] rounded-xl"></div>
    </div>
  )
}
