import { useEffect, useState, useRef } from 'react';

import Map from '@/components/map/map';
import SelectorControl from '@/components/map/map-selector-control';
import TogglesControl from '@/components/map/map-toggles-control';
import styles from './map.module.css';

export default function MapContainer() {

  const allLayers = ["territories", "languages", "treaties"];
  const [ map, setMap ] = useState(false);
  const [ hoveredFeatures, setHoveredFeatures ] = useState([]);
  const [ selectedFeatures, setSelectedFeatures ] = useState([]);
  const [ currentLayers, setCurrentLayers ] = useState(['territories']);

  return (
    <div className={styles.nld_map_container}>
      <SelectorControl
        allLayers={allLayers}
        map={map}
        currentLayers={currentLayers}
        setCurrentLayers={setCurrentLayers}
        selectedFeatures={selectedFeatures}
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
