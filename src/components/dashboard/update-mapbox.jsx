'use client';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

export default function UpdateMapbox() {

  const t = useTranslations('Dashboard');

  const updateMapbox = async (category) => {
    if(window.confirm(`Are you sure you want to update the ${category} tileset? This may take up to 30 seconds to complete, please be patient.`)) {
      fetch(`/api/polygons/mapbox?category=${category}`).then(resp => resp.json()).then(results => {
        console.log(results)
        if(results.error) {
          toast(results.error)
        } else {
          toast("Mapbox updated successfully")
        }
      });
    }
  }

  return (
    <div className="flex w-full mb-5">
      <p>{t('mapbox-update')}</p>
      <button className="border bg-gray-100 hover:bg-gray-300 border-gray-300 px-4 py-3 rounded ml-2.5" onClick={() => updateMapbox('territories')}>Update Territories</button>
      <button className="border bg-gray-100 hover:bg-gray-300 border-gray-300 px-4 py-3 rounded ml-2.5" onClick={() => updateMapbox('languages')}>Update Languages</button>
      <button className="border bg-gray-100 hover:bg-gray-300 border-gray-300 px-4 py-3 rounded ml-2.5" onClick={() => updateMapbox('treaties')}>Update Treaties</button>
    </div>
  );
}
