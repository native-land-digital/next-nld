import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

import defaultContent from "./en.mdx"

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false; // -> disables ISR

export default async function Page({ params : { locale }} : { params : { locale: string }; }) {

  unstable_setRequestLocale(locale);
  const t = await getTranslations('Navigation');

  let Content = defaultContent;
  try {
    const TranslatedContent = (await import(`./${locale}.mdx`)).default;
    Content = TranslatedContent;
  } catch {

  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('contact')} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
        <Sidebar />
        <div className="col-span-2 bg-white rounded-t shadow-lg mt-5">
          <div className="w-full max-h-[200px] overflow-hidden rounded-t">
            <img src="https://d75cfcm8x0ifj.cloudfront.net/partners-top.webp" alt="Contact Header Image" className="object-cover rounded-t" />
          </div>
          <div className="px-4 pb-4 break-words">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );

}
