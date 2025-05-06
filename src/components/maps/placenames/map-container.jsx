"use client";
import { useState } from "react";

import Map from '@/components/maps/placenames/map';
import SelectorControl from '@/components/maps/placenames/map-selector-control';

export default function MapContainer() {
  const [map, setMap] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(false);

  return (
    <div className="w-90 h-[90vh] min-h-120 relative">
      <SelectorControl
        map={map}
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
      />
      <Map
        map={map}
        setMap={setMap}
        setSelectedFeature={setSelectedFeature}
      />
    </div>
  );
}
