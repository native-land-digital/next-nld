"use client"
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link'

export default function Header({ session }) {

  const t = useTranslations('Navigation');
  const tDash = useTranslations('Dashboard');

  const [ hamburgerToggled, setHamburgerToggled ] = useState(false)
  const [ openNav, setOpenNav ] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 px-6">
      <div className="flex items-center flex-shrink-0 mr-6 ml-6">
        <Link prefetch={false} href="/">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 504 504" width="40px" height="40px">
            <g><path fill="#fefefe" d="M -0.5,-0.5 C 167.5,-0.5 335.5,-0.5 503.5,-0.5C 503.5,167.5 503.5,335.5 503.5,503.5C 335.5,503.5 167.5,503.5 -0.5,503.5C -0.5,335.5 -0.5,167.5 -0.5,-0.5 Z"/></g>
            <g><path fill="#474955" d="M 237.5,382.5 C 236.306,381.223 234.64,380.556 232.5,380.5C 230.631,380.507 228.964,380.84 227.5,381.5C 201.487,382.501 176.487,388.001 152.5,398C 147.107,400.726 142.274,404.226 138,408.5C 136.517,411.702 136.183,415.036 137,418.5C 143.503,426.313 151.669,431.813 161.5,435C 198.254,446.909 235.92,451.243 274.5,448C 302.141,446.742 328.474,440.408 353.5,429C 359.788,425.881 364.121,421.048 366.5,414.5C 364.121,407.952 359.788,403.119 353.5,400C 334.192,390.756 313.859,385.089 292.5,383C 295.294,377.912 297.961,372.745 300.5,367.5C 327.734,368.522 352.4,377.022 374.5,393C 387.759,407.335 387.759,421.668 374.5,436C 358.099,448.037 339.766,456.037 319.5,460C 267.085,470.102 215.085,468.436 163.5,455C 147.719,450.53 134.219,442.363 123,430.5C 115.571,416.308 117.405,403.475 128.5,392C 148.092,378.575 169.759,370.242 193.5,367C 204.768,365.128 216.102,363.961 227.5,363.5C 201.166,307.831 173.999,252.497 146,197.5C 125.741,141.974 138.241,95.4744 183.5,58C 224.24,31.5327 266.24,29.5327 309.5,52C 340.732,71.2563 359.232,99.0896 365,135.5C 367.097,154.313 365.097,172.646 359,190.5C 323.225,263.716 287.225,336.716 251,409.5C 246.487,400.473 241.987,391.473 237.5,382.5 Z"/></g>
            <g><path fill="#fdfdfd" d="M 243.5,88.5 C 272.254,87.1119 290.754,100.112 299,127.5C 301.985,155.706 290.151,174.539 263.5,184C 233.632,188.77 213.799,176.937 204,148.5C 199.905,117.002 213.072,97.0018 243.5,88.5 Z"/></g>
            <g><path fill="#adb1b4" d="M 227.5,381.5 C 228.964,380.84 230.631,380.507 232.5,380.5C 234.64,380.556 236.306,381.223 237.5,382.5C 234.272,381.586 230.939,381.253 227.5,381.5 Z"/></g>
          </svg>
        </Link>
        <Link prefetch={false} href="/"><span className="font-normal text-2xl tracking-tight ml-2.5 text-slate-600">{t('native-land')}</span></Link>
      </div>
      <div className="block md:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-slate-500 border-slate-500" onClick={() => setHamburgerToggled(!hamburgerToggled)}>
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className={`${hamburgerToggled ? 'block' : 'hidden'} md:block w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto`}>
        <div className="text-base justify-end md:flex">
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('about')} onClick={() => setOpenNav(openNav === 'about' ? false : 'about')} className={`about-dropdown cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6`}>
              <span className="pointer-events-none">{t('about')}</span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'about' ? '' : 'hidden'} absolute w-48 z-30`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/our-team" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('our-team')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/why-it-matters" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('why-it-matters')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/how-it-works" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('how-it-works')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/partners-and-contributors" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('partners-contributors')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/about/roadmap" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('roadmap')}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('media')} onClick={() => setOpenNav(openNav === 'media' ? false : 'media')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
              <span className="pointer-events-none">{t('media')}</span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'media' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <a href="https://medium.com/@native-land" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('community-blog')}</a>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/media/media-coverage" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('media-coverage')}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('contribute')} onClick={() => setOpenNav(openNav === 'contribute' ? false : 'contribute')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
              <span className="pointer-events-none">{t('contribute')}</span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'contribute' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/jobs" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('jobs')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/volunteer" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('volunteer')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/fixes-and-adding-maps" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('fixes-adding-maps')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/translations" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('translations')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/support/supporters-circle" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('supporters-circle')}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('resources')} onClick={() => setOpenNav(openNav === 'resources' ? false : 'resources')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
              <span className="pointer-events-none">{t('resources')}</span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'resources' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/resources/territory-acknowledgement" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('territory-acknowledgement')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/resources/teachers-guide" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('teachers-guide')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/resources/mobile-apps" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('mobile-apps')}</Link>
                <a href="https://api-docs.native-land.ca" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('api')}</a>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/maps/territories" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('territories-list')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/maps/languages" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('languages-list')}</Link>
                <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/maps/treaties" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('treaties-list')}</Link>
              </div>
            </div>
          </div>
          {session ?
            <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/dashboard" className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">{tDash('dashboard')}</Link>
          :
            <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/auth/login" className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">{t('login')}</Link>
          }
          <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">{t('contact')}</Link>
        </div>
        <div>
          <Link prefetch={false} onClick={() => setHamburgerToggled(false)} href="/support" className="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-900 hover:text-teal-00 hover:bg-blue-600 mt-4 lg:mt-0">{t('support-us')}</Link>
        </div>
      </div>
    </nav>
  );
}

// One day, maybe we can add translation back again
// When the middleware costs aren't exorbitant

// <div onMouseLeave={() => setOpenNav(false)}>
//   <div onMouseOver={() => setOpenNav('language')} onClick={() => setOpenNav(openNav === 'language' ? false : 'language')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
//     <span className="pointer-events-none">
//       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-translate m-1" viewBox="0 0 16 16">
//         <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
//         <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
//       </svg>
//     </span>
//     <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//       <title>chevron-down</title>
//       <g fill="none">
//         <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
//       </g>
//     </svg>
//   </div>
//   <div className={`${openNav === 'language' ? '' : 'hidden'} absolute w-48 z-30`}>
//     <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('en')} locale="en" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('english')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('fr')} locale="fr" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('french')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('es')} locale="es" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('spanish')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('hi')} locale="hi" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('hindi')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('zn-CH')} locale="zn-CH" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('chinese-simplified')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('pt-br')} locale="pt-br" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('portuguese-brazil')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('fa')}  locale="fa" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('farsi')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('ko')}  locale="ko" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('korean')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('bxk')} locale="bxk" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('bukusu')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('kbh')}  locale="kbh" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('kamentsa-biya')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('pen')}  locale="pen" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('penobscot')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('qu')}  locale="qu" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('kichwa-shimi')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('sel')}  locale="sel" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('selkup')}</Link>
//       <Link href="#" prefetch={false} onClick={() => setNewLanguage('yo')}  locale="yo" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('yoruba')}</Link>
//     </div>
//   </div>
// </div>
