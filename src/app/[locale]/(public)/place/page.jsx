import { db } from '@/lib/db/kysely'
import { availableLocales } from '@/i18n/config'
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

import PlaceSearchContainer from '@/components/search/place-search-container';
import AIChatbot from '@/components/ai/chatbot';

// import defaultContent from "./en.mdx"

export default async function Home({ params : { locale } }) {

  const t = await getTranslations('Navigation');
  setLocaleCache(locale);

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('place-search')} crumbs={[{ url : "/place", title : "Place Search" }]} />
      <Sidebar />
      <div className="w-full lg:w-3/5 min-h-screen m-auto mt-12 text-black static-page">
        <div className="col-span-2 mt-5">
          <div className="px-4 pb-4 break-words">
            <PlaceSearchContainer />
            <AIChatbot />
          </div>
        </div>
      </div>
    </div>
  );
}
