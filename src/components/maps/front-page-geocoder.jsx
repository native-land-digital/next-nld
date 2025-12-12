"use client";
import { useEffect } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useRouter } from 'next/navigation';

import { entryQuery } from '@/components/maps/map-utils';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export default function FrontPageGeocoder({  }) {

  const router = useRouter();
  const t = useTranslations('FrontMap');

  useEffect(() => {
    const geocoder = new MapboxGeocoder({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN,
      placeholder : t('search-front'),
      externalGeocoder : entryQuery
    });
    geocoder.on('result', ({ result }) => {
      let querystring = `bbox=${JSON.stringify(result.bbox)}&center=${result.center}`
      if(result.category) {
        querystring += `&category=${result.category}`
      }
      console.log(result.category);
      if(result.category && result.category !== "territories") {
        router.push(`/maps/native-land?${querystring}`);
      } else {
        router.push(`/maps/constellation?${querystring}`);
      }
    })
    geocoder.addTo('#front-page-geocoder');
  }, [])

  return (
    <div id="front-page-geocoder" />
  )
}