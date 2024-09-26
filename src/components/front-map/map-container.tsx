"use client"
import { useState } from 'react';

import Map from '@/components/front-map/map';
import SelectorControl from '@/components/front-map/map-selector-control';
import TogglesControl from '@/components/front-map/map-toggles-control';

export default function MapContainer({ territoryOptions, languageOptions, treatyOptions }) {

  const allLayers = ["territories", "languages", "treaties"];
  const [ map, setMap ] = useState(false);
  const [ hoveredFeatures, setHoveredFeatures ] = useState([]);
  const [ selectedFeatures, setSelectedFeatures ] = useState([]);
  const [ currentLayers, setCurrentLayers ] = useState(['territories']);

  return (
    <div className="w-90 h-[90vh] min-h-120 relative">
      <SelectorControl
        allLayers={allLayers}
        map={map}
        currentLayers={currentLayers}
        setCurrentLayers={setCurrentLayers}
        selectedFeatures={selectedFeatures}
        territoryOptions={territoryOptions}
        languageOptions={languageOptions}
        treatyOptions={treatyOptions}
      />
      <TogglesControl
        allLayers={allLayers}
        map={map}
      />
      <Map
        allLayers={allLayers}
        map={map}
        currentLayers={currentLayers}
        hoveredFeatures={hoveredFeatures}
        selectedFeatures={selectedFeatures}
        setMap={setMap}
        setHoveredFeatures={setHoveredFeatures}
        setSelectedFeatures={setSelectedFeatures}
      />
    </div>
  );
}
