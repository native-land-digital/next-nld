import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SubHeader from '@/components/nav/sub-header'
import SearchResults from '@/components/search/search-results';

export default async function Page({ params : { locale }}) {

  setLocaleCache(locale);
  const t = await getTranslations('Navigation');

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('search')} />
      <SearchResults />
    </div>
  );

}
