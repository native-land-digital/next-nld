import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

import defaultContent from "./en.mdx"

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false; // -> disables ISR

export default async function Page({ params : { locale }} : { params : { locale: string }; }) {

  setLocaleCache(locale);
  const t = await getTranslations('Navigation');

  let Content = defaultContent;
  try {
    const TranslatedContent = (await import(`./${locale}.mdx`)).default;
    Content = TranslatedContent;
  } catch {

  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('partners-contributors')} crumbs={[{ url : "/about", title : "About" }]} />
      <Sidebar />
      <div className="w-full md:w-3/5 min-h-screen m-auto mt-12 text-black static-page">
        <div className="col-span-2 mt-5">
          <div className="px-4 pb-4 break-words">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );

}
