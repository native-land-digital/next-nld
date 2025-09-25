"use client";
import { useState } from "react";

import MapModal from '@/components/front-map/modal';
import Map from '@/components/maps/reciprocity/map';
import TogglesControl from '@/components/maps/reciprocity/map-toggles-control';
import SelectorControl from '@/components/maps/reciprocity/map-selector-control';

export default function MapContainer({ risksRenewalsOptions }) {
  const [map, setMap] = useState(false);
  const [ modalOpen, setModalOpen ] = useState(false);
  const reciprocityLayers = ["next-nld-risks", "next-nld-renewals"];
  const [selectedFeature, setSelectedFeature] = useState(false);

  return (
    <div className="w-90 h-[100vh] min-h-120 relative">
      <MapModal setModalOpen={setModalOpen} modalOpen={modalOpen} headerText="disclaimer-header" bodyText="reciprocity-disclaimer" footerText="disclaimer-close" />
      <SelectorControl
        map={map}
        selectedFeature={selectedFeature}
        setSelectedFeature={setSelectedFeature}
        risksRenewalsOptions={risksRenewalsOptions}
      />
      <TogglesControl map={map} setModalOpen={setModalOpen} allLayers={reciprocityLayers} />
      <Map
        map={map}
        setMap={setMap}
        setSelectedFeature={setSelectedFeature}
      />
    </div>
  );
}
