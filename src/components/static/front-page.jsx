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
    <div>
      <div className="min-h-screen w-full nld-bg-blue-800 bg-right bg-no-repeat" style={{backgroundImage : "url(/images/map-bg.png)"}}>
        <div className="grid grid-cols-2 text-left px-12 items-center h-screen">
          <div>
            <p className="nld-font-jost nld-font-h2 nld-text-grey-200">Welcome to</p>
            <h2 className="nld-font-jost nld-font-display mt-4">Native Land Digital</h2>
            <p className="mt-4 nld-font-lg">A space where the stories of land and waters are carried by those who walk in ancestral relationship with them.</p>
            <div className="mt-4 grid grid-cols-5 gap-4 w-full">
              <div className="col-span-4">
                <div className="absolute ml-[7px] mt-[5px]">
                  <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="16" fill="#CCDFE3" fill-opacity="0.15"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 6C19.9706 6 24 10.0294 24 15C24 17.125 23.2619 19.0766 22.0303 20.6162L25.707 24.293C26.0974 24.6835 26.0975 25.3166 25.707 25.707C25.3166 26.0975 24.6835 26.0974 24.293 25.707L20.6162 22.0303C19.0766 23.2619 17.125 24 15 24C10.0294 24 6 19.9706 6 15C6 10.0294 10.0294 6 15 6ZM15 8C11.134 8 8 11.134 8 15C8 18.866 11.134 22 15 22C18.866 22 22 18.866 22 15C22 11.134 18.866 8 15 8Z" fill="#A0C6CD"/>
                  </svg>
                </div>
                <input type="text" className="rounded-full border nld-border-teal-100 w-full p-2 nld-bg-blue-800 pl-12" placeholder="Search your address" />
              </div>
              <div className="col-span-1">
                <button className="rounded-full nld-bg-green-500 nld-text-grey-500 font-semibold px-4 py-2.5 text-center">Explore Map</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nld-bg-teal-500">
        <div className="grid grid-cols-3 p-12 gap-12">
          <div className="col-span-1">
            <h2 className="nld-font-jost nld-font-h1 text-white font-semibold">We're glad you're here.</h2>
            <p className="nld-font-md text-white mt-8">See an error? Let us know!</p>
            <button className="mt-4 px-4 py-3 text-center text-white border border-white nld-button-md rounded-full">Contact</button>
          </div>
          <div className="col-span-2">
            <h3 className="nld-font-jost nld-font-h2 text-white font-medium">Native Land is an app to help map Indigenous territories, treaties, and languages.</h3>
            <hr className="border-white/20 my-8" />
            <div className="mt-4 grid grid-cols-3 gap-8">
              <div>
                <h3 className="nld-font-jost text-center nld-font-h3 text-white font-medium">100M+</h3>
                <p className="nld-text-sm text-center">visitors</p>
              </div>
              <div>
                <h3 className="nld-font-jost text-center nld-font-h3 text-white font-medium">4K+</h3>
                <p className="nld-text-sm text-center">nations added</p>
              </div>
              <div>
                <h3 className="nld-font-jost text-center nld-font-h3 text-white font-medium">20M+</h3>
                <p className="nld-text-sm text-center">API calls</p>
              </div>
              <div>
                <h3 className="nld-font-jost text-center nld-font-h3 text-white font-medium">10K+</h3>
                <p className="nld-text-sm text-center">dialogues</p>
              </div>
              <div>
                <h3 className="nld-font-jost text-center nld-font-h3 text-white font-medium">60M+</h3>
                <p className="nld-text-sm text-center">shapes shared</p>
              </div>
              <div>
                <h3 className="nld-font-jost text-center nld-font-h3 text-white font-medium">100+</h3>
                <p className="nld-text-sm text-center">collaborations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="grid grid-cols-2 p-12 px-16 gap-12">
          <div className="items-center flex h-full">
            <div>
              <h2 className="nld-font-jost nld-font-h2 text-black font-medium">{t('our-mission-header')}</h2>
              <p className="nld-font-lg text-black mt-4">{t('our-mission')}</p>
              <div className="mt-8">
                <Link prefetch={false} className="text-black rounded-full border border-black px-4 py-2.5 font-semibold inline-flex items-center" href="/about/why-it-matters">
                  {t('our-mission-link')}
                  <svg className="ml-2.5 inline" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img src="https://d75cfcm8x0ifj.cloudfront.net/mission.webp" alt="Mission" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </div>
      <div className="nld-bg-yellow-500">
        <div className="pt-16">
          <h2 className="nld-font-jost nld-font-h2 text-black font-medium text-center">{t('how-it-works-header')}</h2>
        </div>
        <div className="grid grid-cols-3 p-12 px-12 gap-12">
          <div className="nld-bg-grey-50 rounded-lg text-center p-4">
            <svg className="m-auto" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.2" d="M34.8333 15C34.8333 25.5 24.3333 31.5 24.3333 31.5C24.3333 31.5 13.8333 25.5 13.8333 15C13.8333 12.2152 14.9395 9.54451 16.9086 7.57538C18.8778 5.60625 21.5485 4.5 24.3333 4.5C27.118 4.5 29.7887 5.60625 31.7579 7.57538C33.727 9.54451 34.8333 12.2152 34.8333 15Z" fill="#29646F"/>
              <path d="M21.3333 15C21.3333 14.4067 21.5092 13.8266 21.8388 13.3333C22.1685 12.8399 22.637 12.4554 23.1852 12.2284C23.7334 12.0013 24.3366 11.9419 24.9185 12.0576C25.5005 12.1734 26.035 12.4591 26.4546 12.8787C26.8741 13.2982 27.1599 13.8328 27.2756 14.4147C27.3914 14.9967 27.332 15.5999 27.1049 16.1481C26.8778 16.6962 26.4933 17.1648 26 17.4944C25.5066 17.8241 24.9266 18 24.3333 18C23.5376 18 22.7745 17.6839 22.2119 17.1213C21.6493 16.5587 21.3333 15.7956 21.3333 15ZM12.3333 15C12.3333 11.8174 13.5975 8.76516 15.848 6.51472C18.0984 4.26428 21.1507 3 24.3333 3C27.5159 3 30.5681 4.26428 32.8185 6.51472C35.069 8.76516 36.3333 11.8174 36.3333 15C36.3333 26.2406 25.537 32.5387 25.0833 32.8031C24.8566 32.9327 24.6 33.0009 24.3389 33.0009C24.0778 33.0009 23.8212 32.9327 23.5945 32.8031C23.1295 32.5387 12.3333 26.25 12.3333 15ZM15.3333 15C15.3333 22.9125 22.0533 28.1644 24.3333 29.7188C26.6114 28.1663 33.3333 22.9125 33.3333 15C33.3333 12.6131 32.385 10.3239 30.6972 8.63604C29.0094 6.94821 26.7202 6 24.3333 6C21.9463 6 19.6571 6.94821 17.9693 8.63604C16.2815 10.3239 15.3333 12.6131 15.3333 15ZM38.3526 27.6806C37.9834 27.5587 37.5813 27.5848 37.231 27.7536C36.8808 27.9223 36.6097 28.2205 36.475 28.5852C36.3403 28.95 36.3525 29.3527 36.509 29.7087C36.6655 30.0646 36.954 30.3458 37.3139 30.4931C40.4095 31.6388 42.3333 33.1725 42.3333 34.5C42.3333 37.005 35.4858 40.5 24.3333 40.5C13.1808 40.5 6.33325 37.005 6.33325 34.5C6.33325 33.1725 8.257 31.6388 11.3526 30.495C11.7125 30.3477 12.001 30.0665 12.1575 29.7105C12.314 29.3546 12.3262 28.9518 12.1915 28.5871C12.0568 28.2224 11.7857 27.9242 11.4355 27.7554C11.0852 27.5867 10.6831 27.5605 10.3139 27.6825C5.812 29.3419 3.33325 31.7644 3.33325 34.5C3.33325 40.3462 14.1539 43.5 24.3333 43.5C34.5126 43.5 45.3333 40.3462 45.3333 34.5C45.3333 31.7644 42.8545 29.3419 38.3526 27.6806Z" fill="#29646F"/>
            </svg>
            <h3 className="nld-font-jost nld-font-h3 text-black font-medium text-center mt-4">{t('mapping-header')}</h3>
            <p className="nld-font-lg mt-4 text-black"><span dangerouslySetInnerHTML={{ __html : t('mapping') }} /></p>
          </div>
          <div className="nld-bg-grey-50 rounded-lg text-center p-4">
            <svg className="m-auto" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.2" d="M3 28.5H9V39H3C2.60218 39 2.22064 38.842 1.93934 38.5607C1.65804 38.2794 1.5 37.8978 1.5 37.5V30C1.5 29.6022 1.65804 29.2207 1.93934 28.9394C2.22064 28.6581 2.60218 28.5 3 28.5ZM36.1012 7.50002C34.641 7.48288 33.209 7.902 31.9884 8.70369C30.7678 9.50538 29.8143 10.6531 29.25 12C28.6857 10.6531 27.7322 9.50538 26.5116 8.70369C25.291 7.902 23.859 7.48288 22.3988 7.50002C18.3131 7.50002 15 10.9331 15 15C15 17.73 16.3125 20.1956 18.1369 22.5H26.25C27.2446 22.5 28.1984 22.8951 28.9016 23.5984C29.6049 24.3016 30 25.2555 30 26.25C30 27.2446 29.6049 28.1984 28.9016 28.9017C28.1984 29.6049 27.2446 30 26.25 30H27L34.0837 28.3725C38.2163 25.3256 43.5 20.4806 43.5 15C43.5 10.9331 40.1869 7.50002 36.1012 7.50002Z" fill="#29646F"/>
              <path d="M43.1869 26.4487C42.6964 26.0707 42.134 25.7964 41.5342 25.6427C40.9343 25.4889 40.3094 25.4588 39.6975 25.5543C43.2188 21.9993 45 18.4649 45 14.9999C45 10.0368 41.0081 5.99993 36.1012 5.99993C34.7993 5.99176 33.5113 6.26867 32.3277 6.81122C31.1441 7.35378 30.0936 8.14883 29.25 9.14056C28.4064 8.14883 27.3559 7.35378 26.1723 6.81122C24.9887 6.26867 23.7007 5.99176 22.3988 5.99993C17.4919 5.99993 13.5 10.0368 13.5 14.9999C13.5 17.0624 14.1075 19.0668 15.3862 21.1874C14.3389 21.4528 13.3832 21.9971 12.6206 22.7624L8.37937 26.9999H3C2.20435 26.9999 1.44129 27.316 0.87868 27.8786C0.316071 28.4412 0 29.2043 0 29.9999L0 37.4999C0 38.2956 0.316071 39.0586 0.87868 39.6212C1.44129 40.1839 2.20435 40.4999 3 40.4999H22.5C22.6226 40.5 22.7448 40.4849 22.8638 40.4549L34.8638 37.4549C34.9402 37.4367 35.0149 37.4116 35.0869 37.3799L42.375 34.2787L42.4575 34.2412C43.1579 33.8912 43.7578 33.3686 44.2004 32.7227C44.6431 32.0768 44.914 31.3289 44.9878 30.5494C45.0615 29.7698 44.9355 28.9843 44.6218 28.2669C44.308 27.5495 43.8168 26.9238 43.1944 26.4487H43.1869ZM22.3988 8.99993C23.5605 8.98293 24.701 9.31282 25.6743 9.94743C26.6475 10.582 27.4094 11.4925 27.8625 12.5624C27.9755 12.8375 28.1678 13.0729 28.4148 13.2385C28.6619 13.4041 28.9526 13.4925 29.25 13.4925C29.5474 13.4925 29.8381 13.4041 30.0852 13.2385C30.3322 13.0729 30.5245 12.8375 30.6375 12.5624C31.0906 11.4925 31.8525 10.582 32.8257 9.94743C33.799 9.31282 34.9395 8.98293 36.1012 8.99993C39.2981 8.99993 42 11.7468 42 14.9999C42 18.6581 39.0394 22.7962 33.4388 26.9812L31.3594 27.4593C31.5419 26.6883 31.5475 25.886 31.3759 25.1125C31.2042 24.339 30.8597 23.6143 30.3681 22.9929C29.8766 22.3715 29.2508 21.8694 28.5376 21.5243C27.8244 21.1791 27.0423 20.9998 26.25 20.9999H18.8775C17.2594 18.8174 16.5 16.8974 16.5 14.9999C16.5 11.7468 19.2019 8.99993 22.3988 8.99993ZM3 29.9999H7.5V37.4999H3V29.9999ZM41.1431 31.5393L34.0181 34.5731L22.3125 37.4999H10.5V29.1206L14.7431 24.8793C15.0207 24.5995 15.3511 24.3777 15.7152 24.2267C16.0792 24.0758 16.4696 23.9987 16.8638 23.9999H26.25C26.8467 23.9999 27.419 24.237 27.841 24.6589C28.2629 25.0809 28.5 25.6532 28.5 26.2499C28.5 26.8467 28.2629 27.419 27.841 27.8409C27.419 28.2629 26.8467 28.4999 26.25 28.4999H21C20.6022 28.4999 20.2206 28.658 19.9393 28.9393C19.658 29.2206 19.5 29.6021 19.5 29.9999C19.5 30.3978 19.658 30.7793 19.9393 31.0606C20.2206 31.3419 20.6022 31.4999 21 31.4999H27C27.1129 31.4996 27.2254 31.487 27.3356 31.4624L39.8981 28.5731L39.9563 28.5581C40.3397 28.4516 40.7491 28.4907 41.1054 28.6679C41.4618 28.8451 41.7401 29.1478 41.8867 29.5178C42.0333 29.8878 42.0379 30.299 41.8996 30.6722C41.7613 31.0454 41.4898 31.3542 41.1375 31.5393H41.1431Z" fill="#29646F"/>
            </svg>
            <h3 className="nld-font-jost nld-font-h3 text-black font-medium text-center mt-4">{t('community-header')}</h3>
            <p className="nld-font-lg mt-4 text-black"><span dangerouslySetInnerHTML={{ __html : t('community') }} /></p>
          </div>
          <div className="nld-bg-grey-50 rounded-lg text-center p-4">
            <svg className="m-auto" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.2" d="M35.167 28.5L32.4276 40.8263C32.3534 41.1593 32.1679 41.457 31.9017 41.6704C31.6354 41.8838 31.3044 42.0001 30.9632 42H18.3707C18.0296 42.0001 17.6985 41.8838 17.4323 41.6704C17.1661 41.457 16.9806 41.1593 16.9064 40.8263L14.167 28.5H35.167Z" fill="#29646F"/>
              <path d="M38.1668 27H23.7856L24.2262 26.5594L27.9874 22.7981C29.5066 23.5632 31.1804 23.9711 32.8812 23.9906C34.5931 23.9951 36.273 23.5267 37.7356 22.6369C42.1831 19.9444 44.5662 13.7119 44.1106 5.96438C44.0891 5.59741 43.9337 5.25109 43.6738 4.99117C43.4139 4.73124 43.0675 4.57581 42.7006 4.55438C34.9531 4.10063 28.7206 6.48188 26.0262 10.9294C24.2731 13.8263 24.2281 17.325 25.8649 20.6794L23.1668 23.3775L20.8774 21.0881C22.0024 18.6038 21.9218 16.0256 20.6168 13.8731C18.5787 10.5 13.9043 8.70001 8.1162 9.04126C7.74987 9.06308 7.40425 9.21845 7.14476 9.47794C6.88526 9.73743 6.7299 10.0831 6.70807 10.4494C6.36682 16.2375 8.16682 20.91 11.5418 22.95C12.6709 23.6394 13.9689 24.0029 15.2918 24C16.492 23.9881 17.6759 23.7203 18.7643 23.2144L21.0462 25.5L19.5462 27H11.1668C10.769 27 10.3875 27.158 10.1062 27.4393C9.82486 27.7206 9.66682 28.1022 9.66682 28.5C9.66682 28.8978 9.82486 29.2794 10.1062 29.5607C10.3875 29.842 10.769 30 11.1668 30H12.9649L15.4418 41.1506C15.5864 41.8188 15.9563 42.4169 16.4896 42.8447C17.0228 43.2725 17.687 43.5038 18.3706 43.5H30.9649C31.6484 43.5031 32.3122 43.2715 32.8453 42.8439C33.3784 42.4162 33.7485 41.8185 33.8937 41.1506L36.3706 30H38.1668C38.5646 30 38.9462 29.842 39.2275 29.5607C39.5088 29.2794 39.6668 28.8978 39.6668 28.5C39.6668 28.1022 39.5088 27.7206 39.2275 27.4393C38.9462 27.158 38.5646 27 38.1668 27ZM28.6043 12.4838C30.5656 9.24751 35.2099 7.42125 41.1668 7.50188C41.2437 13.4663 39.4212 18.1106 36.1849 20.0644C34.0268 21.3769 31.4224 21.2906 28.8199 19.8431C27.3706 17.25 27.2918 14.6419 28.6043 12.4838ZM17.9374 20.2706C16.2124 21.1931 14.5043 21.2363 13.0943 20.3831C10.9381 19.0763 9.69495 15.9956 9.66682 12C13.6624 12.0281 16.7449 13.2713 18.0499 15.4275C18.9049 16.8375 18.8543 18.5456 17.9374 20.2706ZM30.9649 40.5H18.3706L16.0418 30H33.2918L30.9649 40.5Z" fill="#29646F"/>
            </svg>
            <h3 className="nld-font-jost nld-font-h3 text-black font-medium text-center mt-4">{t('education-header')}</h3>
            <p className="nld-font-lg mt-4 text-black"><span dangerouslySetInnerHTML={{ __html : t('education') }} /></p>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="pt-16 text-center">
          <h2 className="nld-font-jost nld-font-h2 text-black font-medium">Our Maps</h2>
          <p className="nld-font-lg text-black mt-4">Dive into a growing collection of maps that bring Indigenous lands, languages, and stories to life. Explore each map to learn more and see history from a new perspective.</p>
        </div>
        <div className="grid grid-cols-2 p-12 px-12 gap-12">
          <div className="nld-bg-grey-50 rounded-lg p-4">
            <div className="w-full md:w-1/2">
              <h3 className="nld-font-jost nld-font-h3 text-black font-medium">Native Land Map</h3>
              <p className="nld-font-lg mt-4 text-black">Our classic searchable map of Indigenous territories, treaties, and languages.</p>
              <div className="mt-8">
                <Link prefetch={false} className="text-black rounded-full border border-black px-4 py-2.5 font-semibold items-center inline-flex" href="/">
                  View Map
                  <svg className="ml-2.5 inline" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="nld-bg-grey-50 rounded-lg p-4">
            <div className="w-full md:w-1/2">
              <h3 className="nld-font-jost nld-font-h3 text-black font-medium">Placenames Map</h3>
              <p className="nld-font-lg mt-4 text-black">Explore a collection of placenames from Indigenous nations around the world.</p>
              <div className="mt-8">
                <Link prefetch={false} className="text-black rounded-full border border-black px-4 py-2.5 font-semibold items-center inline-flex" href="/">
                  View Map
                  <svg className="ml-2.5 inline" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="pt-16 text-center">
          <h2 className="nld-font-jost nld-font-h2 text-black font-medium">More to Explore</h2>
          <p className="nld-font-lg text-black mt-4">Want to dive deeper? Check out our API docs, research references, or stories from our blog.</p>
        </div>
        <div className="grid grid-cols-3 p-12 px-12 gap-12">
          <div className="border-r-2 nld-border-teal-100">
            <h3 className="nld-font-jost nld-font-h3 text-black font-medium">{t('open-data-header')}</h3>
            <p className="nld-font-lg mt-4 text-black" ><span dangerouslySetInnerHTML={{ __html : t('open-data') }} /></p>
            <div className="mt-8">
              <Link prefetch={false} className="text-black rounded-full border border-black px-4 py-2.5 font-semibold items-center inline-flex" href="/">
                API Documentation
                <svg className="ml-2.5 inline" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.16699 3.33301C9.62708 3.33318 10 3.70686 10 4.16699C9.99982 4.62697 9.62697 4.99982 9.16699 5H4.16699C3.94598 5 3.73343 5.08786 3.57715 5.24414C3.42105 5.40033 3.33309 5.61219 3.33301 5.83301V15.833C3.33301 16.054 3.42087 16.2666 3.57715 16.4229C3.73343 16.5791 3.94598 16.667 4.16699 16.667H14.167C14.3878 16.6669 14.5997 16.579 14.7559 16.4229C14.9121 16.2666 15 16.054 15 15.833V10.833C15.0002 10.373 15.373 10.0002 15.833 10C16.2931 10 16.6668 10.3729 16.667 10.833V15.833C16.667 16.4959 16.4032 17.1318 15.9346 17.6006C15.4658 18.0693 14.8299 18.3329 14.167 18.333H4.16699C3.50395 18.333 2.86825 18.0694 2.39941 17.6006C1.93057 17.1317 1.66699 16.496 1.66699 15.833V5.83301C1.66708 5.17008 1.93065 4.53419 2.39941 4.06543C2.86822 3.59679 3.5041 3.33301 4.16699 3.33301H9.16699ZM17.5 1.66699C17.5419 1.66699 17.5828 1.67176 17.623 1.67773C17.637 1.67982 17.6512 1.6808 17.665 1.68359C17.6796 1.68652 17.6937 1.69066 17.708 1.69434C17.7184 1.69701 17.729 1.69907 17.7393 1.70215C17.7525 1.70612 17.7653 1.71121 17.7783 1.71582C17.8917 1.75596 17.9982 1.82044 18.0889 1.91113C18.1188 1.94103 18.1455 1.97286 18.1699 2.00586C18.1782 2.01712 18.1866 2.02835 18.1943 2.04004C18.2322 2.09711 18.2618 2.15785 18.2842 2.2207C18.2888 2.23367 18.2939 2.24651 18.2979 2.25977C18.3093 2.29789 18.3164 2.33686 18.3223 2.37598C18.3283 2.41653 18.333 2.45776 18.333 2.5V7.5C18.333 7.96024 17.9602 8.33301 17.5 8.33301C17.0398 8.33301 16.667 7.96024 16.667 7.5V4.51074L10.5889 10.5889C10.2634 10.9143 9.73656 10.9143 9.41113 10.5889C9.08572 10.2634 9.08573 9.73657 9.41113 9.41113L15.4893 3.33301H12.5C12.0398 3.33301 11.667 2.96024 11.667 2.5C11.667 2.03976 12.0398 1.66699 12.5 1.66699H17.5Z" fill="#23282B"/>
                </svg>
              </Link>
            </div>
          </div>
          <div className="border-r-2 nld-border-teal-100">
            <h3 className="nld-font-jost nld-font-h3 text-black font-medium">{t('research-header')}</h3>
            <p className="nld-font-lg mt-4 text-black" ><span dangerouslySetInnerHTML={{ __html : t('research') }} /></p>
            <div className="mt-8">
              <Link prefetch={false} className="text-black rounded-full border border-black px-4 py-2.5 font-semibold items-center inline-flex" href="/">
                See more
                <svg className="ml-2.5 inline" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.41073 3.57757C9.73616 3.25214 10.2637 3.25214 10.5891 3.57757L16.4224 9.41091C16.4623 9.45075 16.4979 9.49471 16.5291 9.54193C16.5497 9.57317 16.5676 9.60561 16.5836 9.63877C16.6017 9.67643 16.6176 9.71541 16.63 9.75596C16.6351 9.77287 16.6389 9.79009 16.643 9.80723C16.6577 9.86919 16.6666 9.93364 16.6666 10.0001C16.6666 10.0693 16.6564 10.136 16.6405 10.2003C16.6371 10.2144 16.6342 10.2287 16.63 10.2426C16.6175 10.2834 16.6018 10.3227 16.5836 10.3606C16.5669 10.3953 16.5476 10.4289 16.5258 10.4615C16.5153 10.4772 16.5039 10.4922 16.4924 10.5071C16.4707 10.5353 16.4483 10.5635 16.4224 10.5893L10.5891 16.4226C10.2637 16.748 9.73614 16.748 9.41073 16.4226C9.08531 16.0972 9.08535 15.5697 9.41073 15.2442L13.8215 10.8334H4.16659C3.70637 10.8334 3.33329 10.4603 3.33325 10.0001C3.33325 9.53986 3.70635 9.16677 4.16659 9.16677H13.8215L9.41073 4.75596C9.08531 4.43054 9.08535 3.90302 9.41073 3.57757Z" fill="#23282B"/>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="nld-font-jost nld-font-h3 text-black font-medium">{t('blogs-header')}</h3>
            <p className="nld-font-lg mt-4 text-black" ><span dangerouslySetInnerHTML={{ __html : t('blogs') }} /></p>
            <div className="mt-8">
              <Link prefetch={false} className="text-black rounded-full border border-black px-4 py-2.5 font-semibold items-center inline-flex" href="/">
                Explore the blog
                <svg className="ml-2.5 inline" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.16699 3.33301C9.62708 3.33318 10 3.70686 10 4.16699C9.99982 4.62697 9.62697 4.99982 9.16699 5H4.16699C3.94598 5 3.73343 5.08786 3.57715 5.24414C3.42105 5.40033 3.33309 5.61219 3.33301 5.83301V15.833C3.33301 16.054 3.42087 16.2666 3.57715 16.4229C3.73343 16.5791 3.94598 16.667 4.16699 16.667H14.167C14.3878 16.6669 14.5997 16.579 14.7559 16.4229C14.9121 16.2666 15 16.054 15 15.833V10.833C15.0002 10.373 15.373 10.0002 15.833 10C16.2931 10 16.6668 10.3729 16.667 10.833V15.833C16.667 16.4959 16.4032 17.1318 15.9346 17.6006C15.4658 18.0693 14.8299 18.3329 14.167 18.333H4.16699C3.50395 18.333 2.86825 18.0694 2.39941 17.6006C1.93057 17.1317 1.66699 16.496 1.66699 15.833V5.83301C1.66708 5.17008 1.93065 4.53419 2.39941 4.06543C2.86822 3.59679 3.5041 3.33301 4.16699 3.33301H9.16699ZM17.5 1.66699C17.5419 1.66699 17.5828 1.67176 17.623 1.67773C17.637 1.67982 17.6512 1.6808 17.665 1.68359C17.6796 1.68652 17.6937 1.69066 17.708 1.69434C17.7184 1.69701 17.729 1.69907 17.7393 1.70215C17.7525 1.70612 17.7653 1.71121 17.7783 1.71582C17.8917 1.75596 17.9982 1.82044 18.0889 1.91113C18.1188 1.94103 18.1455 1.97286 18.1699 2.00586C18.1782 2.01712 18.1866 2.02835 18.1943 2.04004C18.2322 2.09711 18.2618 2.15785 18.2842 2.2207C18.2888 2.23367 18.2939 2.24651 18.2979 2.25977C18.3093 2.29789 18.3164 2.33686 18.3223 2.37598C18.3283 2.41653 18.333 2.45776 18.333 2.5V7.5C18.333 7.96024 17.9602 8.33301 17.5 8.33301C17.0398 8.33301 16.667 7.96024 16.667 7.5V4.51074L10.5889 10.5889C10.2634 10.9143 9.73656 10.9143 9.41113 10.5889C9.08572 10.2634 9.08573 9.73657 9.41113 9.41113L15.4893 3.33301H12.5C12.0398 3.33301 11.667 2.96024 11.667 2.5C11.667 2.03976 12.0398 1.66699 12.5 1.66699H17.5Z" fill="#23282B"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
                  <Link prefetch={false} href={`listings/${entry.category}/${entry.slug}`}>
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
                  <Link prefetch={false} href={`listings/${entry.category}/${entry.slug}`}>
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
  )
}
