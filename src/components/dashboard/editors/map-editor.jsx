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
  const drawn_shapes = useRef([])

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

      if(geometry_type === "Point") {
        const loadedPoint = [{
          type : "Feature",
          id : (Math.random() + 1).toString(36).substring(7),
          geometry : {
            type : "Point",
            coordinates : geometry.coordinates
          }
        }]
        draw.deleteAll()
        setMapFeatures(loadedPoint)
      }

      if(drawn_shapes.current.length === 0) {
        if(geometry_type === "Line") {
          const loadedLines = geometry.coordinates.map(lineGeometry => {
            return {
              type : "Feature",
              id : (Math.random() + 1).toString(36).substring(7),
              geometry : {
                type : "LineString",
                coordinates : lineGeometry
              }
            }
          })
          setMapFeatures(loadedLines)
        }
        if(geometry_type === "Polygon") {
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
    }
  }, [geometry, draw])

  useEffect(() => {
    if(map) {
      addControls();
      addEventListeners();
    }
  }, [map])

  const setGeometryFromShapes = () => {
    if(drawn_shapes.current.length > 0) {
      const featureCollection = { type : "FeatureCollection", features : drawn_shapes.current }
      if(geometry_type !== "Point") {
        const combined = combine(featureCollection)
        const featureGeometry = combined.features[0].geometry;
        if(JSON.stringify(featureGeometry) !== JSON.stringify(geometry)) {
          setGeometry(featureGeometry)
        }
      } else {
        const featureGeometry = featureCollection.features[0].geometry;
        if(JSON.stringify(featureGeometry) !== JSON.stringify(geometry)) {
          setGeometry(featureGeometry)
        }
      }
    } else {
      setGeometry("null")
    }
  }

  const setMapFeatures = (features) => {
    drawn_shapes.current = features;
    setGeometryFromShapes();
    const featureCollection = { type : "FeatureCollection", features : features }
    draw.add(featureCollection)
    if(geometry_type === "Point") {
      map.easeTo({ center : featureCollection.features[0].geometry.coordinates, zoom : 5 })
    } else {
      const bounds = bbox(featureCollection)
      map.fitBounds(bounds, { padding : 50, duration : 0 })
    }
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
      let newDrawnShapes = JSON.parse(JSON.stringify(drawn_shapes.current));
      if(geometry_type !== "Point") {
        newDrawnShapes.push(features[0]);
      } else {
        newDrawnShapes = [features[0]];
      }
      drawn_shapes.current = newDrawnShapes;
      setGeometryFromShapes();
    })

    map.on('draw.update', ({ features }) => {
      const newDrawnShapes = JSON.parse(JSON.stringify(drawn_shapes.current));
      const shapeIndex = drawn_shapes.current.findIndex(feature => feature.id === features[0].id);
      newDrawnShapes[shapeIndex] = features[0];
      drawn_shapes.current = newDrawnShapes;
      setGeometryFromShapes();
    })

    map.on('draw.delete', ({ features }) => {
      const newDrawnShapes = JSON.parse(JSON.stringify(drawn_shapes.current));
      const shapeIndex = drawn_shapes.current.findIndex(feature => feature.id === features[0].id);
      newDrawnShapes.splice(shapeIndex, 1);
      drawn_shapes.current = newDrawnShapes;
      setGeometryFromShapes();
    })

  }

  const downloadGeoJSON = () => {
    const featureCollection = { type : "FeatureCollection", features : drawn_shapes.current.map(shape => {
      shape.properties = {};
      return shape;
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
          const nonShapeType = json.features.filter(feature => feature.geometry.type.indexOf(geometry_type) === -1);
          if(nonShapeType.length === 0) {
            let finalShapes = [];
            if(geometry_type === "Point") {
              finalShapes = json.features.filter(feature => feature.geometry.type === "Point")
              finalShapes = [finalShapes[0]];
            }
            if(geometry_type === "Line") {
              finalShapes = json.features.filter(feature => feature.geometry.type === "LineString")
              const multishapes = json.features.filter(feature => feature.geometry.type === "MultiLineString");
              multishapes.forEach(multishape => {
                multishape.geometry.coordinates.forEach(coordinateSet => {
                  finalShapes.push({ type : "Feature", geometry : { type : "LineString", coordinates : coordinateSet }});
                })
              })
            }
            if(geometry_type === "Polygon") {
              finalShapes = json.features.filter(feature => feature.geometry.type === "Polygon")
              const multishapes = json.features.filter(feature => feature.geometry.type === "MultiPolygon");
              multishapes.forEach(multishape => {
                multishape.geometry.coordinates.forEach(coordinateSet => {
                  finalShapes.push({ type : "Feature", geometry : { type : "Polygon", coordinates : coordinateSet }});
                })
              })
            }
            toast(t('geojson-uploaded'))
            if(window.confirm(t('want-replace'))) {
              draw.deleteAll();
              setMapFeatures(finalShapes)
            }
          } else {
            toast(t('non-shape-type'))
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
