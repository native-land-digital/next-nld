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
            <p>Native Land is in the process of creating more complex and diverse maps and ways to visualize and imagine Indigenous territory. Please keep an eye on this space as we add more maps in the months to come!</p>
            <h2 className="text-xl mt-4">
              <Link prefetch={false} href={'/'}>Native Land Map</Link>
            </h2>
            <p>This is our classic searchable map of Indigenous territories, treaties, and languages.</p>
            <h2 className="text-xl mt-4">
              <Link prefetch={false} href={'/maps/placenames'}>{t('placenames-map')}</Link>
            </h2>
            <p>This map displays a collection of placenames from Indigenous nations around the world. You can search for names or click to learn more about any placename shown on the map.</p>
            <h2 className="text-xl mt-4">
              <Link prefetch={false} href={'/maps/reciprocity'}>{t('reciprocity-map')}</Link>
            </h2>
            <p>This map shows a collection of risks and renewals related to Indigenous nations and land. This is a great place to learn more about how you can get involved and reciprocate.</p>
          </div>
        </div>
      </div>
    </div>
  );

}
