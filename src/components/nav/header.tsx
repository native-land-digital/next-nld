"use client"
import { useState } from 'react';
import Image from "next/image";

import { getNavItems } from '@/components/nav/nav-constants';

export default function Header({ dict }) {

  const [ openNav, setOpenNav ] = useState(false);

  const navItems = getNavItems(dict);

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white py-4 px-6">
      <div className="flex items-center flex-shrink-0 mr-6 ml-6">
        <a href="/"><Image src="/nld-logo.png" alt="Native Land Digital logo" width="23" height="36" /></a>
        <a href="/"><span className="font-normal text-2xl tracking-tight ml-5 text-slate-600">Native Land Digital</span></a>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>
      <div className="w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto">
        <div className="text-base justify-end md:flex">
          {navItems.map(navItem => {
            if(navItem.children && navItem.children.length > 0) {
              return (
                <div key={`nav-${navItem.label}`} onMouseLeave={(e) => setOpenNav(false)}>
                  <div className={`${navItem.label}-dropdown cursor-pointer flex block mt-4 lg:mt-0 text-slate-600 hover:text-slate-400 mr-6`} onMouseOver={() => setOpenNav(navItem.label)}>
                    <span className="pointer-events-none">{navItem.icon ? navItem.icon : navItem.label}</span>
                    <svg className="w-3 h-3 pointer-events-none mt-1.5 ml-1.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <title>chevron-down</title>
                      <g fill="none">
                        <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </g>
                    </svg>
                  </div>
                  <div className={`${openNav === navItem.label ? '' : 'hidden'} ${navItem.label}-dropdown absolute w-48 z-10`}>
                    <div className="mt-[23px] border-t-4 border-solid border-blue-700 pt-2 pb-2 bg-white rounded-b text-slate-600">
                      {navItem.children.map(childNavItem => {
                        return (
                          <a href={childNavItem.href} className="text-sm block px-3 py-2 hover:text-slate-400" key={`childnav-${childNavItem.label}`}>{childNavItem.label}</a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <a href={navItem.href} className="block mt-4 lg:inline-block lg:mt-0 text-slate-600 hover:text-slate-400 mr-6" key={`nav-${navItem.label}`}>{navItem.label}</a>
              )
            }
          })}
        </div>
        <div>
          <a href="#" className="inline-block text-sm px-4 py-2 leading-none rounded text-white bg-blue-900 hover:text-teal-00 hover:bg-blue-600 mt-4 lg:mt-0">Support Us</a>
        </div>
      </div>
    </nav>
  );
}
