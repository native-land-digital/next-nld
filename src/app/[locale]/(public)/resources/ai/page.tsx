import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import TerritoryAI from '@/components/ai/territory-ai';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false; // -> disables ISR

export default async function Page({ params : { locale }} : { params : { locale: string }; }) {

  setLocaleCache(locale);
  const t = await getTranslations('Navigation');

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('territory-acknowledgement')} crumbs={[{ url : "/resources", title : "Resources" }]} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
        <Sidebar />
        <div className="col-span-2 bg-white rounded-t shadow-lg mt-5">
          <div className="px-4 pb-4 break-words">
            <TerritoryAI />
          </div>
        </div>
      </div>
    </div>
  );

}
