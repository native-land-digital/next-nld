'use client'
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import combine from "@turf/combine";
import bbox from "@turf/bbox";

import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map({ geometry }) {

  const [ map, setMap ] = useState(false);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    const newMap = new mapboxgl.Map({
      container: "nld-maps-mapbox-map",
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE,
    });
    setMap(newMap)
  }, [])

  useEffect(() => {
    if(map) {
      addControls()
      map.on('load', () => {
        setMapFeature()
      })
    }
  }, [map])

  const setMapFeature = () => {
    let loadedPolygons = geometry.coordinates.map(polygonGeometry => {
      return {
        type : "Feature",
        id : (Math.random() + 1).toString(36).substring(7),
        geometry : {
          type : "Polygon",
          coordinates : polygonGeometry
        }
      }
    })
    let featureCollection = { type : "FeatureCollection", features : loadedPolygons }
    map.addSource('geometry-feature', {
      type : "geojson",
      data : featureCollection
    })
    map.addLayer({
      id : 'geometry-feature',
      type : "fill",
      source : 'geometry-feature',
      paint : {
        'fill-color' : 'rgba(0, 0, 0, 0.2)'
      }
    })
    map.addLayer({
      id : 'geometry-feature-line',
      type : "line",
      source : 'geometry-feature',
      paint : {
        'line-width' : 1
      }
    })
    const bounds = bbox(featureCollection)
    map.fitBounds(bounds, { padding : 50, duration : 0 })
  }

  const addControls = () => {
    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
  }

  return (
    <div id="map">
      <div id="nld-maps-mapbox-map" className="w-full h-[50vh]"></div>
    </div>
  )
}
