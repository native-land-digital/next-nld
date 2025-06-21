import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

export const revalidate = false;
export const dynamic = 'force-dynamic';
export const dynamicParams = false; // -> disables ISR

export default async function Page({ searchParams, params : { locale }}  : { searchParams : { q? : string }, params : { locale: string }; }) {

  setLocaleCache(locale);
  const t = await getTranslations('Navigation');
  
  const query = searchParams.q || '';

  console.log(searchParams)

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('search')} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
        <Sidebar />
        <div className="col-span-2 mt-5">
          <div>
            <form method="GET" action="/search">
              <input type="text" name="q" placeholder={`${t('search')}...`} className="w-full rounded-md border border-gray-300 px-4 py-2 text-slate-500 text-lgoutline-blue-600" />
              <button className="hidden" type="submit">Search</button>
            </form>
          </div>
          <div className="mt-4 rounded-md shadow-lg px-4 pb-4 break-words">
            {query === "" ? 
              <p>Please search by typing into the box above.</p> 
            : 
              <div>
                <h2>Results for: {query}</h2>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );

}
