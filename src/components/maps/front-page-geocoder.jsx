"use client";
import { useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useRouter } from 'next/navigation';

import { entryQuery } from '@/components/maps/map-utils';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function FrontPageGeocoder({ initialValue = false, placePage = false }) {

  const router = useRouter();
  const t = useTranslations('FrontMap');

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
      placeholder : initialValue ? initialValue : t('search-front'),
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
