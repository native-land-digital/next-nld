import Image from "next/image";
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

import ContactTop from '@/public/images/pages/partners-top.webp'
import defaultContent from "./en.mdx"

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
      <div className="grid gap-5 grid-cols-3 min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black static-page">
        <Sidebar />
        <div className="col-span-2 bg-white rounded-t shadow-lg mt-5">
          <div className="w-full max-h-[200px] overflow-hidden rounded-t">
            <Image src={ContactTop} alt="Contact Header Image" className="object-cover rounded-t" />
          </div>
          <div className="px-4 pb-4">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );

}