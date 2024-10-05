import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import UpdateMapbox from '@/components/dashboard/update-mapbox';

export default async function Page({ params : { locale }}) {

  unstable_setRequestLocale(locale);
  const t = await getTranslations('Dashboard');

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('mapbox')} crumbs={[{ url : "/dashboard", title : "Dashboard" }]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <UpdateMapbox />
        </div>
      </div>
    </div>
  );
}
