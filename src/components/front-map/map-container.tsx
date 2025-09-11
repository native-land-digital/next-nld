"use client";
import { useState } from "react";

import MapModal from '@/components/front-map/modal';
import Map from '@/components/front-map/map';
import SelectorControl from "@/components/front-map/map-selector-control";
import TogglesControl from "@/components/front-map/map-toggles-control";

export default function MapContainer({
  territoryOptions,
  languageOptions,
  treatyOptions,
}: {
  territoryOptions: PolygonDropdownOption[];
  languageOptions: PolygonDropdownOption[];
  treatyOptions: PolygonDropdownOption[];
}) {
  const allLayers = ["territories", "languages", "treaties", "greetings"];
  const [map, setMap] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [currentLayers, setCurrentLayers] = useState(["territories"]);

  return (
    <div className="w-90 h-[100vh] min-h-120 relative">
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
