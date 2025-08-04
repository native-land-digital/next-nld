"use client"
import { useState } from 'react';
import { useTranslations } from '@/i18n/client-i18n';
import { useSession } from "next-auth/react";
import Link from 'next/link'

export default function Header() {

  const { data : session } = useSession();
  const t = useTranslations('Navigation');
  const tDash = useTranslations('Dashboard');

  const [ hamburgerToggled, setHamburgerToggled ] = useState(false)
  const [ openNav, setOpenNav ] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap py-4 px-6 absolute z-99 w-full">
      <div className="flex items-center flex-shrink-0 mr-6 ml-6">
        <Link prefetch={false} href="/">
          <svg width="41" height="57" viewBox="0 0 46 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.7262 22.7201C41.6648 17.8346 39.6723 13.1623 36.1681 9.70308C32.6083 6.18902 27.7801 4.21486 22.7459 4.21484C17.7117 4.21486 12.8835 6.18902 9.32368 9.70308C5.76389 13.2171 3.76403 17.9832 3.76403 22.9529C3.76403 32.8805 8.78967 40.8372 14.1245 46.4797C16.7744 49.2824 19.4332 51.439 21.4272 52.8919C21.9111 53.2444 22.354 53.554 22.7459 53.8202C23.1378 53.554 23.5807 53.2444 24.0646 52.8919C26.0586 51.439 28.7174 49.2824 31.3672 46.4797C36.7021 40.8372 41.7277 32.8805 41.7277 22.9529L41.7262 22.7201ZM20.8745 55.0132C20.8738 55.0137 20.873 55.0141 20.873 55.0141C20.8733 55.014 20.8741 55.0135 20.8755 55.0127C20.8758 55.0126 20.876 55.0124 20.8763 55.0123C20.8763 55.0123 20.875 55.0129 20.8745 55.0132ZM24.6163 55.0127C24.6177 55.0135 24.6185 55.014 24.6188 55.0141C24.6188 55.0141 24.618 55.0137 24.6172 55.0132L24.6155 55.0123C24.6158 55.0124 24.616 55.0126 24.6163 55.0127ZM45.4918 22.9529C45.4918 45.4065 22.7459 58.2372 22.7459 58.2372C22.7459 58.2372 0 45.4065 0 22.9529C0 17.0908 2.32217 11.4652 6.46359 7.27419L6.66211 7.0757C10.9278 2.86483 16.7133 0.499192 22.7459 0.499176C28.7785 0.499192 34.564 2.86483 38.8297 7.0757C43.0953 11.2866 45.4918 16.9978 45.4918 22.9529Z" fill="#29646F"/>
            <path d="M39.8053 57.6711C39.8053 61.11 32.1676 63.8977 22.7459 63.8977C13.3242 63.8977 5.68652 61.11 5.68652 57.6711C5.68652 54.2322 13.3242 51.4445 22.7459 51.4445C32.1676 51.4445 39.8053 54.2322 39.8053 57.6711Z" fill="#29646F"/>
            <path d="M37.2497 57.5285C37.2497 60.0243 30.6972 62.0476 22.6142 62.0476C14.5312 62.0476 7.97876 60.0243 7.97876 57.5285C7.97876 55.0327 14.5312 53.0095 22.6142 53.0095C30.6972 53.0095 37.2497 55.0327 37.2497 57.5285Z" fill="#010E1D"/>
            <path d="M43.0939 23.3797C43.0939 43.8611 22.6843 55.5647 22.6843 55.5647C22.6843 55.5647 2.27466 43.8611 2.27466 23.3797C2.27466 17.9477 4.42495 12.7382 8.25249 8.89715C12.08 5.05615 17.2713 2.8983 22.6843 2.89828C28.0973 2.8983 33.2885 5.05615 37.1161 8.89715C40.9436 12.7382 43.0939 17.9477 43.0939 23.3797Z" fill="#010E1D"/>
            <path d="M4.67139 24.483H40.7675L40.3454 29.3551H5.44538L4.67139 24.483Z" fill="#869E59"/>
            <path d="M6.99365 32.6737H38.7273L37.1793 36.6279H8.33055L6.99365 32.6737Z" fill="#76533C"/>
            <path d="M4.74121 22.0822H40.9781L39.4301 18.128H6.07811L4.74121 22.0822Z" fill="#76533C"/>
            <path d="M25.5691 38.8874H36.5457L31.1278 44.395L25.5691 38.8874Z" fill="#29646F"/>
            <path d="M19.7994 38.8874H8.82275L14.2407 44.395L19.7994 38.8874Z" fill="#29646F"/>
            <path d="M28.2424 16.5746H39.219L34.6455 10.2197L28.2424 16.5746Z" fill="#29646F"/>
            <path d="M16.9852 16.5746H6.00854L10.5821 10.2197L16.9852 16.5746Z" fill="#29646F"/>
            <path d="M17.2659 51.7385H28.2425L22.8245 46.2309L17.2659 51.7385Z" fill="#76533C"/>
            <path d="M24.3969 9.00039L26.9552 7.64238L27.0983 10.7536L29.754 9.90591L28.2002 14.441L27.2345 13.7184L23.877 11.7731H21.4592L18.7409 13.3479L17.2537 14.8404L15.8933 10.1114L18.2391 10.7283L18.3809 7.64238L21.1235 9.09844L22.8246 6.26548L24.3969 9.00039Z" fill="#869E59"/>
            <path d="M15.0146 47.0782L16.5626 48.561L22.8249 42.8416L28.5243 48.561L30.4945 47.0782L22.8249 39.3111L15.0146 47.0782Z" fill="#869E59"/>
            <path d="M22.6837 25.0479C26.5309 25.0479 29.6496 21.9181 29.6496 18.0574C29.6496 14.1968 26.5309 11.067 22.6837 11.067C18.8365 11.067 15.7178 14.1968 15.7178 18.0574C15.7178 21.9181 18.8365 25.0479 22.6837 25.0479Z" fill="#010E1D"/>
            <path d="M22.6838 23.0707C25.4428 23.0707 27.6795 20.8262 27.6795 18.0574C27.6795 15.2886 25.4428 13.0441 22.6838 13.0441C19.9247 13.0441 17.688 15.2886 17.688 18.0574C17.688 20.8262 19.9247 23.0707 22.6838 23.0707Z" fill="#76533C"/>
            <path d="M22.6842 37.8989C28.7852 37.8989 33.7311 32.9356 33.7311 26.8131C33.7311 20.6906 28.7852 15.7273 22.6842 15.7273C16.5832 15.7273 11.6372 20.6906 11.6372 26.8131C11.6372 32.9356 16.5832 37.8989 22.6842 37.8989Z" fill="#010E1D"/>
            <path d="M22.6846 35.7806C27.6199 35.7806 31.6207 31.7657 31.6207 26.8131C31.6207 21.8605 27.6199 17.8456 22.6846 17.8456C17.7494 17.8456 13.7485 21.8605 13.7485 26.8131C13.7485 31.7657 17.7494 35.7806 22.6846 35.7806Z" fill="#DEC170"/>
            <path d="M22.6841 32.6737C25.9095 32.6737 28.5242 30.0499 28.5242 26.8131C28.5242 23.5763 25.9095 20.9524 22.6841 20.9524C19.4587 20.9524 16.844 23.5763 16.844 26.8131C16.844 30.0499 19.4587 32.6737 22.6841 32.6737Z" fill="#010E1D"/>
            <path d="M22.6846 30.5554C24.7442 30.5554 26.4138 28.88 26.4138 26.8131C26.4138 24.7462 24.7442 23.0708 22.6846 23.0708C20.6249 23.0708 18.9553 24.7462 18.9553 26.8131C18.9553 28.88 20.6249 30.5554 22.6846 30.5554Z" fill="#76533C"/>
            <path d="M22.4262 41.1622C22.64 40.9477 22.9864 40.9477 23.2002 41.1622C23.4139 41.3766 23.4139 41.7243 23.2002 41.9388C22.9864 42.1532 22.64 42.1532 22.4262 41.9388C22.2124 41.7243 22.2124 41.3766 22.4262 41.1622Z" fill="#869E59"/>
            <path d="M34.8388 34.3329C35.0526 34.1185 35.399 34.1185 35.6128 34.3329C35.8265 34.5474 35.8265 34.8951 35.6128 35.1095C35.399 35.324 35.0526 35.324 34.8388 35.1095C34.625 34.8951 34.625 34.5474 34.8388 34.3329Z" fill="#DEC170"/>
            <path d="M9.83708 34.3329C10.0508 34.1186 10.3973 34.1186 10.6111 34.3329C10.8248 34.5474 10.8248 34.8951 10.6111 35.1095C10.3973 35.324 10.0508 35.324 9.83708 35.1095C9.62332 34.8951 9.62332 34.5474 9.83708 34.3329Z" fill="#DEC170"/>
            <path d="M12.505 34.3329C12.7188 34.1186 13.0653 34.1186 13.279 34.3329C13.4927 34.5474 13.4927 34.8951 13.279 35.1095C13.0653 35.324 12.7188 35.324 12.505 35.1095C12.2913 34.8951 12.2913 34.5474 12.505 34.3329Z" fill="#DEC170"/>
            <path d="M32.1711 34.3329C32.3848 34.1185 32.7313 34.1185 32.9451 34.3329C33.1587 34.5474 33.1587 34.8951 32.9451 35.1095C32.7313 35.324 32.3848 35.324 32.1711 35.1095C31.9573 34.8951 31.9573 34.5474 32.1711 34.3329Z" fill="#DEC170"/>
            <path d="M35.2265 19.7872C35.4402 19.5729 35.7867 19.5729 36.0005 19.7872C36.2142 20.0017 36.2142 20.3494 36.0005 20.5638C35.7867 20.7783 35.4402 20.7783 35.2265 20.5638C35.0127 20.3494 35.0127 20.0017 35.2265 19.7872Z" fill="#DEC170"/>
            <path d="M9.34405 19.7872C9.55782 19.5729 9.90442 19.5729 10.118 19.7872C10.3318 20.0018 10.3318 20.3494 10.118 20.5638C9.90442 20.7783 9.55782 20.7783 9.34405 20.5638C9.13043 20.3494 9.13043 20.0018 9.34405 19.7872Z" fill="#DEC170"/>
            <path d="M37.6132 19.7872C37.827 19.5729 38.1734 19.5729 38.3872 19.7872C38.601 20.0018 38.601 20.3494 38.3872 20.5638C38.1734 20.7783 37.827 20.7783 37.6132 20.5638C37.3994 20.3494 37.3994 20.0018 37.6132 19.7872Z" fill="#DEC170"/>
            <path d="M11.7311 19.7872C11.9449 19.5729 12.2914 19.5729 12.5051 19.7872C12.7187 20.0017 12.7187 20.3494 12.5051 20.5638C12.2914 20.7783 11.9449 20.7783 11.7311 20.5638C11.5174 20.3494 11.5174 20.0017 11.7311 19.7872Z" fill="#DEC170"/>
            <path d="M32.84 19.7872C33.0538 19.5729 33.4002 19.5729 33.614 19.7872C33.8276 20.0017 33.8276 20.3494 33.614 20.5638C33.4002 20.7783 33.0538 20.7783 32.84 20.5638C32.6262 20.3494 32.6262 20.0017 32.84 19.7872Z" fill="#DEC170"/>
            <path d="M6.9584 19.7872C7.17213 19.5729 7.51865 19.5729 7.73239 19.7872C7.94611 20.0018 7.94611 20.3494 7.73239 20.5638C7.51865 20.7783 7.17213 20.7783 6.9584 20.5638C6.74466 20.3494 6.74466 20.0018 6.9584 19.7872Z" fill="#DEC170"/>
            <path d="M39.715 23.1673C39.66 18.711 37.8721 14.4491 34.7279 11.2937C31.5337 8.08835 27.2014 6.28759 22.6843 6.28758C18.1671 6.28759 13.8349 8.08835 10.6407 11.2937C7.44653 14.4991 5.65208 18.8466 5.65208 23.3797C5.65208 32.4354 10.1615 39.6931 14.9484 44.84C17.3262 47.3965 19.7119 49.3637 21.5011 50.6889C21.9352 51.0105 22.3326 51.2929 22.6843 51.5357C23.036 51.2929 23.4334 51.0105 23.8675 50.6889C25.6567 49.3637 28.0424 47.3965 30.4201 44.84C35.207 39.6931 39.7165 32.4354 39.7165 23.3797L39.715 23.1673ZM21.0051 52.6239C21.0044 52.6244 21.0037 52.6248 21.0037 52.6248C21.004 52.6247 21.0047 52.6242 21.006 52.6235C21.0063 52.6234 21.0064 52.6232 21.0067 52.6231C21.0067 52.6231 21.0056 52.6237 21.0051 52.6239ZM24.3626 52.6235C24.3638 52.6242 24.3645 52.6247 24.3648 52.6248C24.3648 52.6248 24.3641 52.6244 24.3634 52.6239L24.3619 52.6231C24.3622 52.6232 24.3623 52.6234 24.3626 52.6235ZM43.0939 23.3797C43.0939 43.8611 22.6843 55.5647 22.6843 55.5647C22.6843 55.5647 2.27466 43.8611 2.27466 23.3797C2.27466 18.0326 4.35831 12.901 8.07436 9.0782L8.25249 8.89715C12.08 5.05615 17.2713 2.8983 22.6843 2.89828C28.0973 2.8983 33.2885 5.05615 37.1161 8.89715C40.9436 12.7382 43.0939 17.9477 43.0939 23.3797Z" fill="#010E1D"/>
          </svg>
        </Link>
        <Link prefetch={false} href="/">
          <div className="nld-font-jost uppercase font-medium leading-none text-xl ml-2.5 nld-text-yellow-500">{t('native')}</div>
          <div className="nld-font-jost uppercase font-medium ml-2.5 nld-text-yellow-500">{t('land-digital')}</div>
        </Link>
      </div>
      <div className="block md:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-slate-500 border-slate-500" onClick={() => setHamburgerToggled(!hamburgerToggled)}>
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`${hamburgerToggled ? 'block' : 'hidden'} md:block w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto`}>
        <div className="text-base nld-text-md justify-end items-center md:flex">
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('about')} onClick={() => setOpenNav(openNav === 'about' ? false : 'about')} className={`about-dropdown cursor-pointer flex block mt-4 lg:mt-0 text-white hover:text-slate-100 mr-6`}>
              <span className="pointer-events-none">{t('about')}</span>
              <svg className="w-3 h-3 pointer-events-none mt-2.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'about' ? '' : 'hidden'} absolute w-48 z-30`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/why-it-matters" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('why-it-matters')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/how-it-works" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('how-it-works')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/partners-and-contributors" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('partners-contributors')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/roadmap" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('roadmap')}</Link>
                <a href="https://medium.com/@native-land" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('community-blog')}</a>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/media/media-coverage" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('media-coverage')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/faq" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('faq')}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('maps')} onClick={() => setOpenNav(openNav === 'maps' ? false : 'maps')} className="cursor-pointer flex block mt-4 lg:mt-0 text-white hover:text-slate-100 mr-6">
              <span className="pointer-events-none">{t('maps')}</span>
              <svg className="w-3 h-3 pointer-events-none mt-2.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'maps' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('main-map')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/maps/placenames" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('placename-map')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/maps/reciprocity" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('reciprocity-map')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/maps" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('all-maps')}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('contribute')} onClick={() => setOpenNav(openNav === 'contribute' ? false : 'contribute')} className="cursor-pointer flex block mt-4 lg:mt-0 text-white hover:text-slate-100 mr-6">
              <span className="pointer-events-none">{t('contribute')}</span>
              <svg className="w-3 h-3 pointer-events-none mt-2.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'contribute' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/jobs" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('jobs')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/fixes-and-adding-maps" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('fixes-adding-maps')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/translations" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('translations')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/support/supporters-circle" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('supporters-circle')}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('resources')} onClick={() => setOpenNav(openNav === 'resources' ? false : 'resources')} className="cursor-pointer flex block mt-4 lg:mt-0 text-white hover:text-slate-100 mr-6">
              <span className="pointer-events-none">{t('resources')}</span>
              <svg className="w-3 h-3 pointer-events-none mt-2.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'resources' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/resources/territory-acknowledgement" className="text-sm block px-3 py-2 text-white hover:text-slate-100">{t('territory-acknowledgement')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/resources/teachers-guide" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('teachers-guide')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/resources/mobile-apps" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('mobile-apps')}</Link>
                <a href="https://api-docs.native-land.ca" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('api')}</a>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/listings/territories" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('territories-list')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/listings/languages" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('languages-list')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/listings/treaties" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('treaties-list')}</Link>
              </div>
            </div>
          </div>
          {session ?
            <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/dashboard" className="block mt-4 lg:inline-block lg:mt-0  text-white hover:text-slate-100 mr-6">{tDash('dashboard')}</Link>
          :
            <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/auth/login" className="block mt-4 lg:inline-block lg:mt-0  text-white hover:text-slate-100 mr-6">{t('login')}</Link>
          }
          <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/contact" className="block mt-4 lg:inline-block lg:mt-0  text-white hover:text-slate-100 mr-6">{t('contact')}</Link>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('language')} onClick={() => setOpenNav(openNav === 'language' ? false : 'language')} className="cursor-pointer flex block mt-4 lg:mt-0 text-white hover:text-slate-100 mr-6">
              <span className="pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-translate m-1" viewBox="0 0 16 16">
                  <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
                  <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
                </svg>
              </span>
              <svg className="w-3 h-3 pointer-events-none mt-2.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'language' ? '' : 'hidden'} absolute w-48 z-30`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link href="/" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('english')}</Link>
                <Link href="/fr" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('french')}</Link>
                <Link href="/es" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('spanish')}</Link>
                <Link href="/hi" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('hindi')}</Link>
                <Link href="/zn-CH" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('chinese-simplified')}</Link>
                <Link href="/pt-br" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('portuguese-brazil')}</Link>
                <Link href="/fa" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('farsi')}</Link>
                <Link href="/ko" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('korean')}</Link>
                <Link href="/bxk" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('bukusu')}</Link>
                <Link href="/kbh" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('kamentsa-biya')}</Link>
                <Link href="/pen" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('penobscot')}</Link>
                <Link href="/qu" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('kichwa-shimi')}</Link>
                <Link href="/sel" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('selkup')}</Link>
                <Link href="/yo" prefetch={false} className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('yoruba')}</Link>
              </div>
            </div>
          </div>
          <div className="mr-2.5 flex-grow justify-end place-center">
            <Link href="/search" prefetch={false}> 
              <div className="w-[150px] text-sm border border-gray-300 px-4 py-2 text-slate-500 rounded-md outline-blue-600 cursor-pointer hover:bg-slate-100">
                <svg className="inline mr-2.5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 50 50">
                  <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                </svg>
                Search...
              </div>
            </Link>
          </div>
        </div>
        <div>
          <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/support" className="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-900 hover:text-teal-00 hover:bg-blue-600 mt-4 lg:mt-0">{t('support-us')}</Link>
        </div>
      </div>
    </nav>
  );
}
