"use client";
import { useState } from "react";

import Map from '@/components/maps/placenames/map';

export default function MapContainer() {
  const [map, setMap] = useState(false);

  return (
    <div className="w-90 h-[90vh] min-h-120 relative">
      <Map
        map={map}
        setMap={setMap}
      />
    </div>
  );
}
