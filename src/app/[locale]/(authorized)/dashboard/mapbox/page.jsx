import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import UpdateMapbox from '@/components/dashboard/update-mapbox';

export default async function Page({ params : { locale } }) {

  setLocaleCache(locale);
  const t = await getTranslations('Dashboard');

  return (
    <div>
      <h2 className="font-semibold text-3xl">{t('mapbox')}</h2>
      <hr className="mt-3 mb-3" />
      <UpdateMapbox />
    </div>
  );
}
