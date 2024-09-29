import Image from "next/image";
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

import SupportTop from '@/public/images/pages/support-top.webp'
import Patreon from '@/public/images/pages/patreon.png'
import Paypal from '@/public/images/pages/paypal.png'
import defaultContent from "./en.mdx"

export default async function Page({ params : { locale }} : { params : { locale: string }; }) {

  unstable_setRequestLocale(locale);
  const t = await getTranslations('Support');

  let Content = defaultContent;
  try {
    const TranslatedContent = (await import(`./${locale}.mdx`)).default;
    Content = TranslatedContent;
  } catch {

  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('support-native-land')} />
      <div className="grid gap-5 grid-cols-3 min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black static-page">
        <Sidebar picks={3}>
          <div>
            <a href="https://www.patreon.com/nativeland">
              <Image src={Patreon} alt="Patreon Image" />
            </a>
            <p className="text-center"><a href="https://www.patreon.com/nativeland">https://www.patreon.com/nativeland</a></p>
            <hr />
            <Image src={Paypal} alt="Paypal Image" />
            <form className="text-center" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
               <input name="cmd" type="hidden" value="_s-xclick" />
               <input name="hosted_button_id" type="hidden" value="Y88A8B6GCV6S2" />
               <input name="on0" type="hidden" value="Supporter Levels" />
               <h5>{t('monthly')}</h5>
               <select className="my-2.5 text-sm capitalize h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none" name="os0">
                 <option value="Level One">{t('level-one')}</option>
                 <option value="Level Two">{t('level-two')}</option>
                 <option value="Level Three">{t('level-three')}</option>
               </select>
               <input name="currency_code" type="hidden" value="USD" />
               <input alt="PayPal - The safer, easier way to pay online!" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" type="image" />
               <img src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" alt="" />
           </form>
           <hr className="mb-5"/>
           <form className="text-center" action="https://www.paypal.com/donate?hosted_button_id=NPGUNMQBBRNFJ" method="post" target="_top">
             <h5>{t('one-time')}</h5>
             <input name="hosted_button_id" type="hidden" value="Y4VQ7Q5LH9SS2" />
             <input title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" type="image" />
             <img src="https://www.paypal.com/en_CA/i/scr/pixel.gif" alt="" />
           </form>
           <hr className="mt-2.5 mb-5"/>
          </div>
        </Sidebar>
        <div className="col-span-2 bg-white rounded-t shadow-lg mt-5">
          <div className="w-full max-h-[200px] overflow-hidden rounded-t">
            <Image src={SupportTop} alt="Support Header Image" className="object-cover object-center rounded-t" />
          </div>
          <div className="px-4 pb-4">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );

}
