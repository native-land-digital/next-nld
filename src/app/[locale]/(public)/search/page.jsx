import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import SearchResults from '@/components/search/search-results';

export default async function Page({ params : { locale }}) {

  setLocaleCache(locale);
  const t = await getTranslations('Navigation');

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('search')} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
        <Sidebar />
        <div className="col-span-2 mt-5">
          <SearchResults />
        </div>
      </div>
    </div>
  );

}
