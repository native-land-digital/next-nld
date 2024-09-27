"use client"
import { useState } from 'react';
import Link from 'next/link'
import Logo from '@/public/images/nld-logo.png'
import Image from "next/image";

export default function Header({ dict }) {

  const [ openNav, setOpenNav ] = useState(false);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 px-6">
      <div className="flex items-center flex-shrink-0 mr-6 ml-6">
        <Link href="/"><Image src={Logo} alt="Native Land Digital logo" width="23" height="36" /></Link>
        <Link href="/"><span className="font-normal text-2xl tracking-tight ml-5 text-slate-600">Native Land Digital</span></Link>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto">
        <div className="text-base justify-end md:flex">
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('about')} className={`about-dropdown cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6`}>
              <span className="pointer-events-none">{dict['about']}</span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'about' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link href="/about/our-team" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['our-team']}</Link>
                <Link href="/about/why-it-matters" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['why-it-matters']}</Link>
                <Link href="/about/how-it-works" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['how-it-works']}</Link>
                <Link href="/about/partners-and-contributors" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['partners-contributors']}</Link>
                <Link href="/about/roadmap" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['roadmap']}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('media')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
              <span className="pointer-events-none">{dict['media']}</span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'media' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <a href="#" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['community-blog']}</a>
                <Link href="/media/media-coverage" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['media-coverage']}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('contribute')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
              <span className="pointer-events-none">{dict['contribute']}</span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'contribute' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link href="/how-to-contribute/jobs" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['jobs']}</Link>
                <Link href="/how-to-contribute/volunteer" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['volunteer']}</Link>
                <Link href="/how-to-contribute/fixes-and-adding-maps" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['fixes-adding-maps']}</Link>
                <Link href="/how-to-contribute/languages" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['languages']}</Link>
                <Link href="/support/supporters-circle" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['supporters-circle']}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('resources')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
              <span className="pointer-events-none">{dict['resources']}</span>
              <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <title>chevron-down</title>
                <g fill="none">
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </svg>
            </div>
            <div className={`${openNav === 'resources' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link href="/resources/territory-acknowledgement" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['territory-acknowledgement']}</Link>
                <Link href="/resources/teachers-guide" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['teachers-guide']}</Link>
                <Link href="/resources/mobile-apps" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['mobile-apps']}</Link>
                <a href="" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['api']}</a>
                <Link href="/resources/territories-list" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['territories-list']}</Link>
                <Link href="/resources/languages-list" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['languages-list']}</Link>
                <Link href="/resources/treaties-list" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['treaties-list']}</Link>
              </div>
            </div>
          </div>
          <div onMouseLeave={() => setOpenNav(false)}>
            <div onMouseOver={() => setOpenNav('language')} className="cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">
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
            <div className={`${openNav === 'language' ? '' : 'hidden'} absolute w-48 z-10`}>
              <div className="mt-[23px] border-t-4 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                <Link href="" locale="en" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['english']}</Link>
                <Link href="" locale="fr" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['french']}</Link>
                <Link href="" locale="es" className="text-sm block px-3 py-2 hover:text-slate-400">{dict['spanish']}</Link>
              </div>
            </div>
          </div>
          <Link href="/contact" className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-400 mr-6">{dict['contact']}</Link>
        </div>
        <div>
          <Link href="#" className="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-900 hover:text-teal-00 hover:bg-blue-600 mt-4 lg:mt-0">{dict['support-us']}</Link>
        </div>
      </div>
    </nav>
  );
}
