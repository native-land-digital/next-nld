"use client"
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('@/components/map/map-container'), {
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapContainer />
    </div>
  );
}
