"use client";
import { useState } from "react";

import MapModal from '@/components/front-map/modal';
import Map from '@/components/maps/placenames/map';
import TogglesControl from '@/components/maps/placenames/map-toggles-control';
import SelectorControl from '@/components/maps/placenames/map-selector-control';

export default function MapContainer({ placenameOptions }) {

  const [map, setMap] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const placenameLayers = ["next-nld-placenames-major", "next-nld-placenames-minor", "next-nld-placenames-mini"];
  const [selectedFeature, setSelectedFeature] = useState(false);

  return (
    <div className="w-90 h-[100vh] min-h-120 relative">
      <MapModal setModalOpen={setModalOpen} modalOpen={modalOpen} headerText="disclaimer-header" bodyText="placenames-disclaimer" footerText="disclaimer-close" />
      <SelectorControl
        map={map}
        placenameOptions={placenameOptions}
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
      />
      <TogglesControl map={map} setModalOpen={setModalOpen} allLayers={placenameLayers} />
      <Map
        map={map}
        setMap={setMap}
        setSelectedFeature={setSelectedFeature}
      />
    </div>
  );
}
