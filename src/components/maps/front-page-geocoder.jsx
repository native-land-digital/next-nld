"use client";
import { useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { createGeocoder } from '@/components/maps/geocoder';
import { useRouter } from 'next/navigation';

import { entryQuery } from '@/components/maps/map-utils';

import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';

export default function FrontPageGeocoder({ initialValue = false, placePage = false }) {

  const router = useRouter();
  const t = useTranslations('FrontMap');

  useEffect(() => {
    const geocoder = createGeocoder({
      placeholder: initialValue ? initialValue : t('search-front'),
      externalGeocoder : entryQuery
    });
    geocoder.on('result', ({ result }) => {
      let querystring = `center=${result.center}&placename=${result.place_name}`
      router.push(`/place?${querystring}`);
    })
    geocoder.addTo('#front-page-geocoder');
  }, [])

  return (
    <div id="front-page-geocoder" className={`${placePage ? "geocoder-place-search" : ""}`} />
  )
}
