import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { getTranslations } from '@/i18n/server-i18n';

import SidebarChatbot from '@/components/ai/sidebar-bot';

export default async function Sidebar({ children = (<div></div>), picks = 5 }) {

  const t = await getTranslations('Sidebar');

  const totalEntries = await db.selectFrom('Entry')
    .select((eb) => eb.fn.count('id').as('num_entries'))
    .where('Entry.category', '!=', "placenames")
    .execute();

  const randomIndex = Math.floor(Math.random() * (totalEntries[0].num_entries - picks));

  let entries = await db.selectFrom('Entry')
    .leftJoin('Media', 'Media.entryId', 'Entry.id')
    .select(['Entry.id as id', 'Entry.name as name', 'Entry.category as category', 'Entry.slug as slug', 'Entry.updatedAt as updatedAt', 'Media.url as media_url'])
    .where('Entry.category', '!=', "placenames")
    .orderBy('Entry.color', 'asc')
    .limit(picks)
    .offset(randomIndex)
    .execute()


  return (
    <div className="nld-sidebar hidden md:block absolute pt-12 ml-[10%]">
      <svg className="cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" fill="#CCDFE3"/>
        <rect x="0.5" y="0.5" width="47" height="47" rx="23.5" stroke="#A0C6CD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M30.7878 14.2727C31.3019 14.1445 31.8461 14.2258 32.3005 14.4983C32.6982 14.7369 32.9997 15.1047 33.155 15.5374L33.2117 15.7268L33.2126 15.7278L34.7273 21.7874L34.7654 21.9807C34.8326 22.4359 34.7412 22.9029 34.5027 23.301C34.23 23.7559 33.7876 24.0842 33.2732 24.2132L32.1824 24.4856C31.4106 24.6784 30.5939 24.556 29.9119 24.1467C29.7945 24.0763 29.6844 23.9961 29.5788 23.9114L26.9519 24.4719C26.9824 24.6435 26.9997 24.82 26.9997 25.0003C26.9997 25.8086 26.6778 26.5399 26.1579 27.0794L28.8943 32.553C29.141 33.0469 28.9408 33.6478 28.447 33.8948C27.984 34.126 27.4272 33.9644 27.156 33.5364L27.1062 33.4475L24.3699 27.9758C24.2486 27.9908 24.125 28.0003 23.9997 28.0003C23.874 28.0002 23.7503 27.9909 23.6286 27.9758L20.8943 33.4475C20.6472 33.9413 20.0464 34.1417 19.5525 33.8948C19.0586 33.6478 18.8585 33.0469 19.1052 32.553L21.8415 27.0803C21.4819 26.7073 21.2192 26.2422 21.0906 25.7229L16.0935 26.7893L16.0925 26.7883C15.5973 26.8946 15.0801 26.8035 14.6521 26.5325C14.2229 26.2605 13.9173 25.8302 13.8025 25.3352L13.8035 25.3342L13.2703 23.2014L13.2683 23.1956C13.1463 22.6946 13.2155 22.1657 13.4626 21.7132C13.7099 21.2605 14.1176 20.9163 14.6052 20.7483C14.6097 20.7468 14.6144 20.7459 14.6189 20.7444L27.5896 16.4788C27.6571 16.2825 27.7449 16.0921 27.8533 15.9114C28.2625 15.2296 28.9257 14.7383 29.697 14.5452L29.698 14.5442L30.7878 14.2727ZM23.9997 24.0003C23.4476 24.0004 22.9997 24.4481 22.9997 25.0003C22.9999 25.5523 23.4477 26.0001 23.9997 26.0003C24.5519 26.0003 24.9996 25.5524 24.9997 25.0003C24.9997 24.448 24.552 24.0003 23.9997 24.0003ZM15.2556 22.6389L15.2566 22.6399C15.2403 22.6456 15.2268 22.657 15.2185 22.6721C15.2106 22.6867 15.2074 22.7038 15.2107 22.72L15.7361 24.8196L18.0495 24.3255L17.448 21.9173L15.2556 22.6389ZM19.3523 21.2913L20.0066 23.9085L21.3347 23.6253C21.8334 22.6604 22.8388 22.0003 23.9997 22.0003C24.7079 22.0003 25.3577 22.2471 25.8708 22.6575L28.4929 22.0979L27.613 18.5764L19.3523 21.2913ZM30.1824 16.4856L30.1814 16.4846C29.9248 16.5492 29.7043 16.7138 29.5681 16.9407C29.4317 17.168 29.3916 17.4403 29.4558 17.6975L30.4851 21.8176C30.5495 22.0747 30.7139 22.2955 30.9411 22.4319C31.1685 22.5682 31.4408 22.6094 31.698 22.5452L32.7869 22.2727L31.2722 16.2132L30.1824 16.4856Z" fill="#29646F"/>
      </svg>
      <SidebarChatbot startHidden={true} />
      <div className="mt-4 rounded-full w-[7px] h-[7px] nld-bg-teal-100 m-auto" />
    </div>
  )
}

    // <div className="col-span-1 bg-white rounded-t shadow-lg p-4 mt-5 order-last md:order-first">
    //   <div>
    //     {children}
    //   </div>
    //   {children.length > 0 ? <hr className="my-2.5" /> : false }
    //   {picks !== 0 ?
    //     <div>
    //       <h3 className="pt-0 !mt-0 font-bold text-xl">{picks} {t('random')}</h3>
    //       <p className="text-sm mb-2.5 !mt-2.5"><Link prefetch={false} href="/listings">{t('visit-listings')}.</Link></p>
    //       <div className="grid gap-5">
    //         {entries.map(entry => {
    //           return <EntryCard key={`entry-${entry.id}`} entry={entry} />
    //         })}
    //       </div>
    //     </div>
    //   : false}
    // </div>