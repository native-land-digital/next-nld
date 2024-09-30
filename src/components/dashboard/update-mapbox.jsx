'use client';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export default function UpdateMapbox() {

  const t = useTranslations('Dashboard');

  const updateMapbox = async (category) => {
    if(window.confirm(`Are you sure you want to update the ${category} tileset? This may take up to 30 seconds to complete, please be patient.`)) {
      fetch(`/api/polygons/mapbox?category=${category}`).then(resp => resp.json()).then(results => {
        if(results.error) {
          toast(results.error)
        } else {
          toast("Mapbox updated successfully")
        }
      });
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 w-full mb-5">
      <p className="md:col-span-4">{t('mapbox-update')}</p>
      <button className="mt-2.5 md:mt-0 md:col-span-1 border bg-gray-100 hover:bg-gray-300 border-gray-300 px-4 py-3 rounded md:ml-2.5" onClick={() => updateMapbox('territories')}>Update Territories</button>
      <button className="mt-2.5 md:mt-0 md:col-span-1 border bg-gray-100 hover:bg-gray-300 border-gray-300 px-4 py-3 rounded md:ml-2.5" onClick={() => updateMapbox('languages')}>Update Languages</button>
      <button className="mt-2.5 md:mt-0 md:col-span-1 border bg-gray-100 hover:bg-gray-300 border-gray-300 px-4 py-3 rounded md:ml-2.5" onClick={() => updateMapbox('treaties')}>Update Treaties</button>
    </div>
  );
}
