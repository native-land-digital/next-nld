"use client"
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Logo from '@/public/images/general/nld-logo.png'
import Image from "next/image";

export default function Header() {

  const t = useTranslations('Navigation');

  const [ hamburgerToggled, setHamburgerToggled ] = useState(false)
  const [ openNav, setOpenNav ] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 px-6">
      <div className="flex items-center flex-shrink-0 mr-6 ml-6">
        <Link href="/"><Image src={Logo} alt="Native Land Digital logo" width="23" height="36" /></Link>
        <Link href="/"><span className="font-normal text-2xl tracking-tight ml-5 text-slate-600">{t('native-land')}</span></Link>
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
                <Link onClick={() => setHamburgerToggled(false)} href="/about/our-team" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('our-team')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/about/why-it-matters" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('why-it-matters')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/about/how-it-works" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('how-it-works')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/about/partners-and-contributors" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('partners-contributors')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/about/roadmap" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('roadmap')}</Link>
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
                <Link onClick={() => setHamburgerToggled(false)} href="/media/media-coverage" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('media-coverage')}</Link>
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
                <Link onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/jobs" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('jobs')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/volunteer" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('volunteer')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/fixes-and-adding-maps" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('fixes-adding-maps')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/how-to-contribute/languages" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('translations')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/support/supporters-circle" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('supporters-circle')}</Link>
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
                <Link onClick={() => setHamburgerToggled(false)} href="/resources/territory-acknowledgement" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('territory-acknowledgement')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/resources/teachers-guide" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('teachers-guide')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/resources/mobile-apps" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('mobile-apps')}</Link>
                <a href="https://victor-gerard-temprano.gitbook.io/native-land-digital-api" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('api')}</a>
                <Link onClick={() => setHamburgerToggled(false)} href="/maps/territories" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('territories-list')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/maps/languages" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('languages-list')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/maps/treaties" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('treaties-list')}</Link>
              </div>
            </div>
          </div>
          <Link onClick={() => setHamburgerToggled(false)} href="/auth/login" className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">{t('login')}</Link>
          <Link onClick={() => setHamburgerToggled(false)} href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">{t('contact')}</Link>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('language')} onClick={() => setOpenNav(openNav === 'language' ? false : 'language')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
              <span className="pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-translate m-1" viewBox="0 0 16 16">
                  <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
                  <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
                </svg>
              </span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'language' ? '' : 'hidden'} absolute w-48 z-30`}>
              <div className="mt-[23px] border-t-4 border-l border-b border-r md:border-l-0 md:border-b-0 md:border-r-0 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="en" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('english')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="fr" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('french')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="es" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('spanish')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="hi" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('hindi')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="zn-CH" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('chinese-simplified')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="pt-br" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('portuguese-brazil')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="fa" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('farsi')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="ko" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('korean')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="bxk" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('bukusu')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="kbh" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('kamentsa-biya')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="pen" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('penobscot')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="qu" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('kichwa-shimi')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="sel" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('selkup')}</Link>
                <Link onClick={() => setHamburgerToggled(false)} href="/" locale="yo" className="text-sm block px-3 py-2 text-slate-600 hover:text-slate-400">{t('yoruba')}</Link>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Link onClick={() => setHamburgerToggled(false)} href="/support" className="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-900 hover:text-teal-00 hover:bg-blue-600 mt-4 lg:mt-0">{t('support-us')}</Link>
        </div>
      </div>
    </nav>
  );
}
