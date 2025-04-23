import { db } from '@/lib/db/kysely'
import Link from 'next/link'
import { getTranslations } from '@/i18n/server-i18n';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export default async function FrontPage() {

  const t = await getTranslations('FrontPage');

  const latestUpdates = await db.selectFrom('Entry')
    .where('published', '=', true)
    .leftJoin('Media', 'Media.entryId', 'Entry.id')
    .select(['Entry.id as id', 'Entry.name as name', 'Entry.category as category', 'Entry.slug as slug', 'Entry.updatedAt as updatedAt', 'Media.url as media_url'])
    .distinctOn('Entry.id')
    .orderBy('Entry.id')
    .orderBy('Entry.updatedAt', 'desc')
    .limit(5)
    .execute()

  return (
    <div className="font-[sans-serif] bg-white pb-10 text-center">
      <div className="m-auto">
        <section className="w-full px-5 md:px-0 m-auto mb-5 bg-blue-600 py-5">
          <div className="grid grid-cols-2 md:grid-cols-6 m-auto w-full md:w-2/3 gap-5">
            <div className="border-4 border-white rounded-full">
              <p className="text-4xl font-bold text-white mt-8">100M+</p>
              <p className="text-slate-100 mb-8">visitors</p>
            </div>
            <div className="border-4 border-white rounded-full">
              <p className="text-4xl font-bold text-white mt-8">4K+</p>
              <p className="text-slate-100 mb-8">nations added</p>
            </div>
            <div className="border-4 border-white rounded-full">
              <p className="text-4xl font-bold text-white mt-8">20M+</p>
              <p className="text-slate-100 mb-8">API calls</p>
            </div>
            <div className="border-4 border-white rounded-full">
              <p className="text-4xl font-bold text-white mt-8">10K+</p>
              <p className="text-slate-100 mb-8">dialogues</p>
            </div>
            <div className="border-4 border-white rounded-full">
              <p className="text-4xl font-bold text-white mt-8">60M+</p>
              <p className="text-slate-100 mb-8">shapes shared</p>
            </div>
            <div className="border-4 border-white rounded-full">
              <p className="text-4xl font-bold text-white mt-8">100+</p>
              <p className="text-slate-100 mb-8">collaborations</p>
            </div>
          </div>
        </section>
        <section className="w-full md:w-3/4 px-5 md:px-0 m-auto my-5">
          <h2 className="text-4xl md:text-6xl font-bold leading-snug"><span className="text-blue-600 underline underline-offset-2 decoration-yellow-600/30 decoration-[15px]">{t('welcome')}</span> <span className="text-black">{t('welcome-glad')}</span></h2>
          <p className="text-xl text-gray-500 my-8">{t('welcome-blurb')}</p>
          <div className="md:inline-block bg-blue-400/20 px-4 py-2.5 rounded"><p className="font-bold text-blue-600" dangerouslySetInnerHTML={{ __html : t('welcome-contact') }}></p></div>
        </section>
        <section className="w-full md:w-3/4 px-5 md:px-0 m-auto my-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col justify-center align-center text-black text-left p-2.5">
              <h3 className="text-4xl font-bold mb-5">{t('our-mission-header')}</h3>
              <p className="text-slate-400 mr-16 mb-5">{t('our-mission')}</p>
              <Link prefetch={false} className="text-blue-600" href="/about/why-it-matters">{t('our-mission-link')}</Link>
            </div>
            <div>
              <img src="https://d75cfcm8x0ifj.cloudfront.net/mission.webp" alt="Mission" className="w-full h-auto" />
            </div>
          </div>
        </section>
        <section>
          <div className="bg-blue-900 rounded">
            <h3 className="text-4xl font-bold py-16">{t('how-it-works-header')}</h3>
            <div className="w-full md:w-3/4 px-5 md:px-0 m-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-black">
                <div className="bg-white rounded pb-2.5">
                  <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
                    <img className="w-full" src="https://d75cfcm8x0ifj.cloudfront.net/physical-world-map.webp" alt="Mapping" />
                  </div>
                  <h4 className="text-xl font-bold mb-2.5 mt-5">{t('mapping-header')}</h4>
                  <p className="p-5 text-slate-500"><span dangerouslySetInnerHTML={{ __html : t('mapping') }} /></p>
                </div>
                <div className="bg-white rounded pb-2.5">
                  <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
                    <img src="https://d75cfcm8x0ifj.cloudfront.net/stacked-paper-sheets.webp" alt="Education" />
                  </div>
                  <h4 className="text-xl font-bold mb-2.5 mt-5">{t('education-header')}</h4>
                  <p className="p-5 text-slate-500"><span dangerouslySetInnerHTML={{ __html : t('education') }} /></p>
                </div>
                <div className="bg-white rounded pb-2.5">
                  <div className="w-1/2 m-auto mt-5 h-30 overflow-hidden">
                    <img src="https://d75cfcm8x0ifj.cloudfront.net/wildflower-4083864_1280.webp" alt="Community" />
                  </div>
                  <h4 className="text-xl font-bold mb-2.5 mt-5">{t('community-header')}</h4>
                  <p className="p-5 text-slate-500"><span dangerouslySetInnerHTML={{ __html : t('community') }} /></p>
                </div>
              </div>
            </div>
            <p className="pt-12 pb-12"><span dangerouslySetInnerHTML={{ __html : t('how-it-works-link') }} /></p>
          </div>
        </section>
        <section className="w-full md:w-3/4 px-5 md:px-0 m-auto my-24">
          <h3 className="text-black text-3xl font-bold pb-16">{t('partners-supporters')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 pad-5">
            <div className="w-1/2 m-auto mt-5 h-32 overflow-hidden">
              <a href="https://kalliopeia.org/">
                <img className="w-full" src="https://d75cfcm8x0ifj.cloudfront.net/kalliopeia-logo.webp" alt="Kalliopeia logo" />
              </a>
            </div>
            <div className="w-1/2 m-auto mt-5 h-32 overflow-hidden">
              <a href="https://mapbox.com/">
                <img src="https://d75cfcm8x0ifj.cloudfront.net/mapbox-logo.webp" alt="Mapbox logo" />
              </a>
            </div>
            <div className="w-1/2 m-auto mt-5 h-32 overflow-hidden flex items-center">
              <a href="https://awana.digital/">
                <img src="https://d75cfcm8x0ifj.cloudfront.net/awana-digital-logo.png" alt="Awana Digital logo" />
              </a>
            </div>
            <div className="w-1/2 m-auto mt-5 h-32 overflow-hidden">
              <a href="https://mapster.me/">
                <img src="https://d75cfcm8x0ifj.cloudfront.net/mapster-tech-logo.webp" alt="Mapster Technology Inc logo" />
              </a>
            </div>
            <div className="w-1/2 m-auto mt-5 h-32 overflow-hidden">
              <a href="https://www.vancity.com/">
                <img src="https://d75cfcm8x0ifj.cloudfront.net/vancity-logo.webp" alt="Vancity logo" />
              </a>
            </div>
          </div>
        </section>
        <section className="w-full md:w-3/4 px-5 md:px-0 m-auto my-24 text-black">
          <h3 className="text-3xl font-bold pb-16">{t('latest-updates')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 pad-5">
            {latestUpdates.map(entry => {
              return (
                <div key={`entry-${entry.id}`}>
                  <Link prefetch={false} href={`maps/${entry.category}/${entry.slug}`}>
                    {entry.media_url ?
                      <div className="w-1/2 m-auto mt-5 h-[100px] bg-cover mb-2.5" style={{backgroundImage : `url(${entry.media_url})`}}></div>
                    :
                      <div className="w-1/2 m-auto mt-5 h-[100px] bg-cover mb-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 504 504" width="100px" height="100px">
                          <g><path fill="#fefefe" d="M -0.5,-0.5 C 167.5,-0.5 335.5,-0.5 503.5,-0.5C 503.5,167.5 503.5,335.5 503.5,503.5C 335.5,503.5 167.5,503.5 -0.5,503.5C -0.5,335.5 -0.5,167.5 -0.5,-0.5 Z"/></g>
                          <g><path fill="#474955" d="M 237.5,382.5 C 236.306,381.223 234.64,380.556 232.5,380.5C 230.631,380.507 228.964,380.84 227.5,381.5C 201.487,382.501 176.487,388.001 152.5,398C 147.107,400.726 142.274,404.226 138,408.5C 136.517,411.702 136.183,415.036 137,418.5C 143.503,426.313 151.669,431.813 161.5,435C 198.254,446.909 235.92,451.243 274.5,448C 302.141,446.742 328.474,440.408 353.5,429C 359.788,425.881 364.121,421.048 366.5,414.5C 364.121,407.952 359.788,403.119 353.5,400C 334.192,390.756 313.859,385.089 292.5,383C 295.294,377.912 297.961,372.745 300.5,367.5C 327.734,368.522 352.4,377.022 374.5,393C 387.759,407.335 387.759,421.668 374.5,436C 358.099,448.037 339.766,456.037 319.5,460C 267.085,470.102 215.085,468.436 163.5,455C 147.719,450.53 134.219,442.363 123,430.5C 115.571,416.308 117.405,403.475 128.5,392C 148.092,378.575 169.759,370.242 193.5,367C 204.768,365.128 216.102,363.961 227.5,363.5C 201.166,307.831 173.999,252.497 146,197.5C 125.741,141.974 138.241,95.4744 183.5,58C 224.24,31.5327 266.24,29.5327 309.5,52C 340.732,71.2563 359.232,99.0896 365,135.5C 367.097,154.313 365.097,172.646 359,190.5C 323.225,263.716 287.225,336.716 251,409.5C 246.487,400.473 241.987,391.473 237.5,382.5 Z"/></g>
                          <g><path fill="#fdfdfd" d="M 243.5,88.5 C 272.254,87.1119 290.754,100.112 299,127.5C 301.985,155.706 290.151,174.539 263.5,184C 233.632,188.77 213.799,176.937 204,148.5C 199.905,117.002 213.072,97.0018 243.5,88.5 Z"/></g>
                          <g><path fill="#adb1b4" d="M 227.5,381.5 C 228.964,380.84 230.631,380.507 232.5,380.5C 234.64,380.556 236.306,381.223 237.5,382.5C 234.272,381.586 230.939,381.253 227.5,381.5 Z"/></g>
                        </svg>
                      </div>
                    }
                  </Link>
                  <p className="uppercase text-gray-300 text-xs pb-2.5">{entry.category}</p>
                  <Link prefetch={false} href={`maps/${entry.category}/${entry.slug}`}>
                    <h5 className="text-xl font-bold">{entry.name}</h5>
                  </Link>
                  <p className="text-sm pt-2.5">{new Date(entry.updatedAt).toLocaleDateString()}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="w-full md:w-3/4 px-5 md:px-0 m-auto my-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <img src="https://d75cfcm8x0ifj.cloudfront.net/disclaimer-3.webp" alt="disclaimer" className="w-full h-auto" />
            </div>
            <div className="flex flex-col justify-center align-center text-black text-left p-2.5">
              <h3 className="text-4xl font-bold mb-5">{t('disclaimer-header')}</h3>
              <p className="text-slate-400 mr-16 mb-5">{t('disclaimer')}</p>
              <Link prefetch={false} className="text-blue-600" href="/contact">{t('disclaimer-link')}</Link>
            </div>
          </div>
        </section>
        <section className="w-full md:w-3/4 m-auto my-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-black text-left">
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.302 11.35L12.002 20.55H21.202C21.802 20.55 22.202 19.85 21.902 19.35L17.302 11.35Z" fill="#1e88e5"></path>
                  <path opacity="0.3" d="M12.002 20.55H2.802C2.202 20.55 1.80202 19.85 2.10202 19.35L6.70203 11.45L12.002 20.55ZM11.302 3.45L6.70203 11.35H17.302L12.702 3.45C12.402 2.85 11.602 2.85 11.302 3.45Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{t('mobile-apps-header')}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : t('mobile-apps') }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" d="M21 2H13C12.4 2 12 2.4 12 3V13C12 13.6 12.4 14 13 14H21C21.6 14 22 13.6 22 13V3C22 2.4 21.6 2 21 2ZM15.7 8L14 10.1V5.80005L15.7 8ZM15.1 4H18.9L17 6.40002L15.1 4ZM17 9.59998L18.9 12H15.1L17 9.59998ZM18.3 8L20 5.90002V10.2L18.3 8ZM9 2H3C2.4 2 2 2.4 2 3V21C2 21.6 2.4 22 3 22H9C9.6 22 10 21.6 10 21V3C10 2.4 9.6 2 9 2ZM4.89999 12L4 14.8V9.09998L4.89999 12ZM4.39999 4H7.60001L6 8.80005L4.39999 4ZM6 15.2L7.60001 20H4.39999L6 15.2ZM7.10001 12L8 9.19995V14.9L7.10001 12Z" fill="#1e88e5"></path>
                  <path d="M21 18H13C12.4 18 12 17.6 12 17C12 16.4 12.4 16 13 16H21C21.6 16 22 16.4 22 17C22 17.6 21.6 18 21 18ZM19 21C19 20.4 18.6 20 18 20H13C12.4 20 12 20.4 12 21C12 21.6 12.4 22 13 22H18C18.6 22 19 21.6 19 21Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{t('open-data-header')}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : t('open-data') }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M4.85714 1H11.7364C12.0911 1 12.4343 1.12568 12.7051 1.35474L17.4687 5.38394C17.8057 5.66895 18 6.08788 18 6.5292V19.0833C18 20.8739 17.9796 21 16.1429 21H4.85714C3.02045 21 3 20.8739 3 19.0833V2.91667C3 1.12612 3.02045 1 4.85714 1ZM7 13C7 12.4477 7.44772 12 8 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H8C7.44772 14 7 13.5523 7 13ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H8Z" fill="#1e88e5"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.85714 3H14.7364C15.0911 3 15.4343 3.12568 15.7051 3.35474L20.4687 7.38394C20.8057 7.66895 21 8.08788 21 8.5292V21.0833C21 22.8739 20.9796 23 19.1429 23H6.85714C5.02045 23 5 22.8739 5 21.0833V4.91667C5 3.12612 5.02045 3 6.85714 3ZM7 13C7 12.4477 7.44772 12 8 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H8C7.44772 14 7 13.5523 7 13ZM8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18H11C11.5523 18 12 17.5523 12 17C12 16.4477 11.5523 16 11 16H8Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{t('education-header')}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : t('education') }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" d="M21.25 18.525L13.05 21.825C12.35 22.125 11.65 22.125 10.95 21.825L2.75 18.525C1.75 18.125 1.75 16.725 2.75 16.325L4.04999 15.825L10.25 18.325C10.85 18.525 11.45 18.625 12.05 18.625C12.65 18.625 13.25 18.525 13.85 18.325L20.05 15.825L21.35 16.325C22.35 16.725 22.35 18.125 21.25 18.525ZM13.05 16.425L21.25 13.125C22.25 12.725 22.25 11.325 21.25 10.925L13.05 7.62502C12.35 7.32502 11.65 7.32502 10.95 7.62502L2.75 10.925C1.75 11.325 1.75 12.725 2.75 13.125L10.95 16.425C11.65 16.725 12.45 16.725 13.05 16.425Z" fill="#1e88e5"></path>
                  <path d="M11.05 11.025L2.84998 7.725C1.84998 7.325 1.84998 5.925 2.84998 5.525L11.05 2.225C11.75 1.925 12.45 1.925 13.15 2.225L21.35 5.525C22.35 5.925 22.35 7.325 21.35 7.725L13.05 11.025C12.45 11.325 11.65 11.325 11.05 11.025Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{t('land-acknowledgement-header')}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : t('land-acknowledgement') }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15 19.5229C15 20.265 15.9624 20.5564 16.374 19.9389L22.2227 11.166C22.5549 10.6676 22.1976 10 21.5986 10H17V4.47708C17 3.73503 16.0376 3.44363 15.626 4.06106L9.77735 12.834C9.44507 13.3324 9.80237 14 10.4014 14H15V19.5229Z" fill="#1e88e5"></path>
                  <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M3 6.5C3 5.67157 3.67157 5 4.5 5H9.5C10.3284 5 11 5.67157 11 6.5C11 7.32843 10.3284 8 9.5 8H4.5C3.67157 8 3 7.32843 3 6.5ZM3 18.5C3 17.6716 3.67157 17 4.5 17H9.5C10.3284 17 11 17.6716 11 18.5C11 19.3284 10.3284 20 9.5 20H4.5C3.67157 20 3 19.3284 3 18.5ZM2.5 11C1.67157 11 1 11.6716 1 12.5C1 13.3284 1.67157 14 2.5 14H6.5C7.32843 14 8 13.3284 8 12.5C8 11.6716 7.32843 11 6.5 11H2.5Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{t('research-header')}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : t('research') }} /></p>
            </div>
            <div className="p-5">
              <div className="flex">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.3" d="M5 8.04999L11.8 11.95V19.85L5 15.85V8.04999Z" fill="#1e88e5"></path>
                  <path d="M20.1 6.65L12.3 2.15C12 1.95 11.6 1.95 11.3 2.15L3.5 6.65C3.2 6.85 3 7.15 3 7.45V16.45C3 16.75 3.2 17.15 3.5 17.25L11.3 21.75C11.5 21.85 11.6 21.85 11.8 21.85C12 21.85 12.1 21.85 12.3 21.75L20.1 17.25C20.4 17.05 20.6 16.75 20.6 16.45V7.45C20.6 7.15 20.4 6.75 20.1 6.65ZM5 15.85V7.95L11.8 4.05L18.6 7.95L11.8 11.95V19.85L5 15.85Z" fill="#1e88e5"></path>
                </svg>
                <h5 className="text-lg font-bold mb-2.5 ml-2.5">{t('blogs-header')}</h5>
              </div>
              <p className="text-slate-400"><span dangerouslySetInnerHTML={{ __html : t('blogs') }} /></p>
            </div>
          </div>
        </section>
        <section className="w-full md:w-3/4 px-5 md:px-0 m-auto my-24">
          <Link prefetch={false} href="/support-us" className="py-2.5 px-5 bg-blue-600 rounded mb-5 text-white">{t('support-button')}</Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12 text-black">
            <div className="grid grid-cols-2 rounded shadow-lg">
              <div className="flex flex-col justify-center text-left p-5">
                <h5 className="text-xl font-bold mt-5">{t('patreon-header')}</h5>
                <p className="mt-5 mb-5 text-slate-500">{t('patreon')}</p>
                <Link prefetch={false} href="https://www.patreon.com/nativeland">{t('patreon-link')}</Link>
              </div>
              <div>
                <img className="w-full h-auto p-7" src="https://d75cfcm8x0ifj.cloudfront.net/patreon.webp" alt="patreon" />
              </div>
            </div>
            <div className="grid grid-cols-2 rounded shadow-lg">
              <div className="flex flex-col justify-center text-left p-5">
                <h5 className="text-xl font-bold mt-5">{t('supporters-circle-header')}</h5>
                <p className="mt-5 mb-5 text-slate-500">{t('supporters-circle')}</p>
                <Link prefetch={false} href="/support/supporters-circle">{t('supporters-circle-link')}</Link>
              </div>
              <div>
                <img src="https://d75cfcm8x0ifj.cloudfront.net/768px-Circle_-_black_simple.svg_.webp" alt="supporters-circle" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
