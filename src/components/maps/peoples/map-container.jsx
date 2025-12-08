"use client";
import { useEffect, useState } from "react";

import MapModal from '@/components/maps/peoples/modal';
import Map from '@/components/maps/peoples/map';
import SelectorControl from "@/components/maps/peoples/map-selector-control";
import TogglesControl from "@/components/maps/peoples/map-toggles-control";

import { isMobile } from '@/components/maps/peoples/map-utils';

export default function MapContainer({
  territoryOptions,
  languageOptions,
  treatyOptions,
}) {
  const allLayers = ["territories"];
  const [map, setMap] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [currentLayers, setCurrentLayers] = useState(["territories"]);

  useEffect(() => {
    document.querySelector("body").classList.add("no-footer");
    document.addEventListener("mousemove", e => {
      const dot = document.createElement("div");
      dot.className = isMobile() ? "mobile-trail trail" : "trail";
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 500); // Clean up
    });
  }, [])

  useEffect(() => {
    // Autoload from front page search
    if(map) {
      map.on('load', () => {
        const urlParams = new URLSearchParams(window.location.search);
        
        const categoryParam = urlParams.get('category');
        if(categoryParam) {
          setCurrentLayers([categoryParam]);
        }

        const bboxParam = urlParams.get('bbox');
        const centerParam = urlParams.get('center');
        if(bboxParam && centerParam) {
          map.fitBounds(JSON.parse(bboxParam), { duration : 0 });
          setTimeout(() => {
            const coords = centerParam.split(',');
            const latlng = { lat : coords[1], lng : coords[0] }
            map.fire('click', { latLng : latlng, point: map.project(latlng), originalEvent : {} });
          }, 1000);
        }
      })
    }
  }, [map])

  return (
    <div className="w-90 h-dvh min-h-120 relative">
      {currentLayers.indexOf("greetings") > -1 ?
        <MapModal setModalOpen={setModalOpen} modalOpen={modalOpen} headerText="greetings-disclaimer-header" bodyText="greetings-disclaimer" footerText="greetings-disclaimer-close" />
      : false}
      <MapModal setModalOpen={setModalOpen} modalOpen={modalOpen} headerText="disclaimer-header" bodyText="disclaimer" footerText="disclaimer-close" />
      <SelectorControl
        allLayers={allLayers}
        map={map}
        currentLayers={currentLayers}
        setCurrentLayers={setCurrentLayers}
        selectedFeatures={selectedFeatures}
        setSelectedFeatures={setSelectedFeatures}
        territoryOptions={territoryOptions}
        languageOptions={languageOptions}
        treatyOptions={treatyOptions}
      />
      <TogglesControl allLayers={allLayers} map={map} setModalOpen={setModalOpen} />
      <Map
        allLayers={allLayers}
        map={map}
        currentLayers={currentLayers}
        setMap={setMap}
        setSelectedFeatures={setSelectedFeatures}
      />
    </div>
  );
}
