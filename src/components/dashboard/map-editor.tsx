'use client'
import { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import combine from "@turf/combine";

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

export default function MapEditor({ geometry, setGeometry }) {

  const [ map, setMap ] = useState(false);
  const [ draw, setDraw ] = useState(false);
  const polygons = useRef([])

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    const newMap = new mapboxgl.Map({
      container: "nld-research-mapbox-map",
      style: "mapbox://styles/nativeland/clbgxjvlu003015o1g8upud1b",
    });
    setMap(newMap)

  }, [])

  useEffect(() => {
    if(geometry && draw && geometry !== "null") {
      if(polygons.current.length === 0) {
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
        polygons.current = loadedPolygons;
        draw.add({
          type : "FeatureCollection",
          features : polygons.current
        })
      }
    }
  }, [geometry, draw])

  useEffect(() => {
    if(map) {
      addControls();
      addEventListeners();
    }
  }, [map])

  const setGeometryFromPolygons = () => {
    if(polygons.current.length > 0) {
      const featureCollection = { type : "FeatureCollection", features : polygons.current }
      const combined = combine(featureCollection)
      let featureGeometry = combined.features[0].geometry;
      setGeometry(featureGeometry)
    } else {
      setGeometry("null")
    }
  }

  const addControls = () => {
    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
      mapboxgl: mapboxgl
    });
    map.addControl(geocoder, "top-left");
    const newDraw = new MapboxDraw({
      controls : {
        point : false,
        line_string : false,
        polygon : true,
        combine_features : false,
        uncombine_features : false,
        trash : true
      }
    });
    map.addControl(newDraw, 'top-left');
    setDraw(newDraw)
  }

  const addEventListeners = () => {

    map.on('draw.create', ({ features }) => {
      let newPolygons = JSON.parse(JSON.stringify(polygons.current));
      newPolygons.push(features[0]);
      polygons.current = newPolygons;
      setGeometryFromPolygons();
    })

    map.on('draw.update', ({ features }) => {
      let newPolygons = JSON.parse(JSON.stringify(polygons.current));
      let polygonIndex = polygons.current.findIndex(feature => feature.id === features[0].id);
      newPolygons[polygonIndex] = features[0];
      polygons.current = newPolygons;
      setGeometryFromPolygons();
    })

    map.on('draw.delete', ({ features }) => {
      let newPolygons = JSON.parse(JSON.stringify(polygons.current));
      let polygonIndex = polygons.current.findIndex(feature => feature.id === features[0].id);
      newPolygons.splice(polygonIndex, 1);
      polygons.current = newPolygons;
      setGeometryFromPolygons();
    })

  }

  return (
    <div id="nld-research-mapbox-map" className="w-full h-screen"></div>
  )
}
