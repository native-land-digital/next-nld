import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import Link from 'next/link'

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false; // -> disables ISR

export default async function Page({ params : { locale }}) {

  setLocaleCache(locale);
  const t = await getTranslations('Maps');

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('maps')} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
        <Sidebar />
        <div className="col-span-2 bg-white rounded-t shadow-lg mt-5">
          <div className="px-4 py-4 break-words">
            <Link prefetch={false} href={'/maps/placenames'} className="text-xl">{t('placenames-map')}</Link>
            <p>Please note: this map is currently in beta.</p>
          </div>
        </div>
      </div>
    </div>
  );

}
