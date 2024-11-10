'use client'
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import combine from "@turf/combine";
import bbox from "@turf/bbox";
import { toast } from 'react-toastify';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

export default function MapEditor({ geometry_type, geometry, setGeometry }) {

  const t = useTranslations('Dashboard');

  const [ map, setMap ] = useState(false);
  const [ draw, setDraw ] = useState(false);
  const polygons = useRef([])

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN;
    const newMap = new mapboxgl.Map({
      container: "nld-research-mapbox-map",
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_RESEARCH,
    });
    setMap(newMap)

  }, [])

  useEffect(() => {
    if(geometry && draw && geometry !== "null") {
      if(polygons.current.length === 0) {
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
        setMapFeatures(loadedPolygons)
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
      const featureGeometry = combined.features[0].geometry;
      setGeometry(featureGeometry)
    } else {
      setGeometry("null")
    }
  }

  const setMapFeatures = (features) => {
    polygons.current = features;
    setGeometryFromPolygons();
    const featureCollection = { type : "FeatureCollection", features : features }
    draw.add(featureCollection)
    const bounds = bbox(featureCollection)
    map.fitBounds(bounds, { padding : 50, duration : 0 })
  }

  const addControls = () => {
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "bottom-right");
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
      mapboxgl: mapboxgl
    });
    map.addControl(geocoder, "top-left");
    const newDraw = new MapboxDraw({
      controls : {
        point : geometry_type === 'Point',
        line_string : geometry_type === 'Line',
        polygon : geometry_type === 'Polygon',
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
      const newPolygons = JSON.parse(JSON.stringify(polygons.current));
      newPolygons.push(features[0]);
      polygons.current = newPolygons;
      setGeometryFromPolygons();
    })

    map.on('draw.update', ({ features }) => {
      const newPolygons = JSON.parse(JSON.stringify(polygons.current));
      const polygonIndex = polygons.current.findIndex(feature => feature.id === features[0].id);
      newPolygons[polygonIndex] = features[0];
      polygons.current = newPolygons;
      setGeometryFromPolygons();
    })

    map.on('draw.delete', ({ features }) => {
      const newPolygons = JSON.parse(JSON.stringify(polygons.current));
      const polygonIndex = polygons.current.findIndex(feature => feature.id === features[0].id);
      newPolygons.splice(polygonIndex, 1);
      polygons.current = newPolygons;
      setGeometryFromPolygons();
    })

  }

  const downloadGeoJSON = () => {
    const featureCollection = { type : "FeatureCollection", features : polygons.current.map(polygon => {
      polygon.properties = {};
      return polygon;
    }) }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(featureCollection));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "nld-export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const uploadGeoJSON = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        if(json.features.length > 0) {
          const nonPolygons = json.features.filter(feature => feature.geometry.type.indexOf("Polygon") === -1);
          if(nonPolygons.length === 0) {
            const finalPolygons = json.features.filter(feature => feature.geometry.type === "Polygon")
            const multipolygons = json.features.filter(feature => feature.geometry.type === "MultiPolygon");
            multipolygons.forEach(multipolygon => {
              multipolygon.geometry.coordinates.forEach(coordinateSet => {
                finalPolygons.push({ type : "Feature", geometry : { type : "Polygon", coordinates : coordinateSet }});
              })
            })
            toast(t('geojson-uploaded'))
            if(window.confirm(t('want-replace'))) {
              draw.deleteAll();
              setMapFeatures(finalPolygons)
            }
          } else {
            toast(t('non-polygons'))
          }
        } else {
          toast(t('empty-geojson'))
        }
      } catch {
        toast(t('geojson-issue'))
      }
    };
    reader.readAsText(event.target.files[0]);
  }

  return (
    <div className="relative">
      <div id="nld-research-mapbox-map" className="w-full h-screen"></div>
      <div className="absolute flex right-0 top-0 m-2 text-xs z-100">
        <div className="py-1 px-2 mr-2 bg-white rounded hover:bg-gray-200 cursor-pointer" onClick={() => downloadGeoJSON()}>{t('download-geojson')}</div>
        <input type="file" className="hidden" id="geojson-upload-input" onChange={(e) => uploadGeoJSON(e)} />
        <label htmlFor="geojson-upload-input" className="py-1 px-2 bg-white rounded hover:bg-gray-200 cursor-pointer">{t('upload-geojson')}</label>
      </div>
    </div>
  )
}
