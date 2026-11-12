"use client";
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { createGeocoder } from '@/components/maps/geocoder';
import SearchPlacesButton from '@/components/maps/search-places-button';
import { useRouter } from 'next/navigation';

import { entryQuery } from '@/components/maps/map-utils';

import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';

export default function FrontPageGeocoder({ initialValue = false, placePage = false }) {

  const router = useRouter();
  const t = useTranslations('FrontMap');
  const geocoderSlotRef = useRef(null);
  const [ geocoder, setGeocoder ] = useState(null);

  useEffect(() => {
    const newGeocoder = createGeocoder({
      placeholder: initialValue ? initialValue : t('search-front'),
      externalGeocoder : entryQuery
    });
    newGeocoder.on('result', ({ result }) => {
      let querystring = `center=${result.center}&placename=${result.place_name}`
      router.push(`/place?${querystring}`);
    })
    newGeocoder.addTo(geocoderSlotRef.current);
    setGeocoder(newGeocoder);
  }, [])

  return (
    <div id="front-page-geocoder" className={`${placePage ? "geocoder-place-search" : ""}`}>
      <div ref={geocoderSlotRef} className="nld-geocoder-input-slot" />
      {geocoder ? <SearchPlacesButton geocoder={geocoder} label={t('find-address')} /> : null}
    </div>
  )
}
