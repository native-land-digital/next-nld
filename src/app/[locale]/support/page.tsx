import Image from "next/image";

import SubHeader from '@/components/nav/sub-header'

import SupportTop from '@/public/images/pages/support-top.webp'
import Patreon from '@/public/images/pages/patreon.png'
import Paypal from '@/public/images/pages/paypal.png'
import defaultContent from "./en.mdx"

export default async function Page({ params : { locale }} : { params : { locale: string }; }) {

  let Content = defaultContent;
  try {
    const TranslatedContent = (await import(`./${locale}.mdx`)).default;
    Content = TranslatedContent;
  } catch {

  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={"Support Native Land"} />
      <div className="grid gap-5 grid-cols-3 min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black static-page">
        <div className="col-span-1 bg-white rounded-t shadow-lg p-4 mt-5">
          <a href="https://www.patreon.com/nativeland">
            <Image src={Patreon} />
          </a>
          <p class="text-center"><a href="https://www.patreon.com/nativeland">https://www.patreon.com/nativeland</a></p>
          <hr />
          <Image src={Paypal} />
          <form className="text-center" action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
             <input name="cmd" type="hidden" value="_s-xclick" />
             <input name="hosted_button_id" type="hidden" value="Y88A8B6GCV6S2" />
             <input name="on0" type="hidden" value="Supporter Levels" />
             <h5>Monthly Support</h5>
             <select className="my-2.5 text-sm capitalize h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none" name="os0">
               <option value="Level One">Level One : $5.00 USD - monthly</option>
               <option value="Level Two">Level Two : $10.00 USD - monthly</option>
               <option value="Level Three">Level Three : $20.00 USD - monthly</option>
             </select>
             <input name="currency_code" type="hidden" value="USD" />
             <input alt="PayPal - The safer, easier way to pay online!" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_subscribeCC_LG.gif" type="image" />
             <img src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" alt="" width="1" height="1" border="0" />
         </form>
         <hr className="mb-5"/>
         <form className="text-center" action="https://www.paypal.com/donate?hosted_button_id=NPGUNMQBBRNFJ" method="post" target="_top">
           <h5>One-Time-Donation</h5>
           <input name="hosted_button_id" type="hidden" value="Y4VQ7Q5LH9SS2" />
           <input title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" type="image" />
           <img src="https://www.paypal.com/en_CA/i/scr/pixel.gif" alt="" width="1" height="1" border="0" />
         </form>
        </div>
        <div className="col-span-2 bg-white rounded-t shadow-lg mt-5">
          <div className="w-full max-h-[200px] overflow-hidden rounded-t">
            <Image src={SupportTop} className="object-cover object-center rounded-t" />
          </div>
          <div className="px-4 pb-4">
            <Content />
          </div>
        </div>
      </div>
    </div>
  );

}
