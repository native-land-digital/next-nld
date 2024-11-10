import { getTranslations } from '@/i18n/server-i18n';
import { getServerSession } from "next-auth/next"
import Link from 'next/link'

import { authOptions } from "@/root/auth";
import { hasResearchPermission } from '@/lib/auth/permissions'

export default async function DashboardMenu() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations('Navigation');
  const tDash = await getTranslations('Dashboard');

  return (
    <nav className="shadow absolute left-0 top-0 z-99 h-screen w-72 flex-col overflow-y-hidden bg-blue-900 duration-300 ease-linear lg:static lg:translate-x-0 -translate-x-full">
      <div className="flex items-center gap-2 px-6 py-5.5 mt-5 lg:py-6.5">
        <a href="/">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 504 504" width="60px" height="60px">
            <g><path fill="#1E3A8A" d="M -0.5,-0.5 C 167.5,-0.5 335.5,-0.5 503.5,-0.5C 503.5,167.5 503.5,335.5 503.5,503.5C 335.5,503.5 167.5,503.5 -0.5,503.5C -0.5,335.5 -0.5,167.5 -0.5,-0.5 Z"/></g>
            <g><path fill="#fefefe" d="M 237.5,382.5 C 236.306,381.223 234.64,380.556 232.5,380.5C 230.631,380.507 228.964,380.84 227.5,381.5C 201.487,382.501 176.487,388.001 152.5,398C 147.107,400.726 142.274,404.226 138,408.5C 136.517,411.702 136.183,415.036 137,418.5C 143.503,426.313 151.669,431.813 161.5,435C 198.254,446.909 235.92,451.243 274.5,448C 302.141,446.742 328.474,440.408 353.5,429C 359.788,425.881 364.121,421.048 366.5,414.5C 364.121,407.952 359.788,403.119 353.5,400C 334.192,390.756 313.859,385.089 292.5,383C 295.294,377.912 297.961,372.745 300.5,367.5C 327.734,368.522 352.4,377.022 374.5,393C 387.759,407.335 387.759,421.668 374.5,436C 358.099,448.037 339.766,456.037 319.5,460C 267.085,470.102 215.085,468.436 163.5,455C 147.719,450.53 134.219,442.363 123,430.5C 115.571,416.308 117.405,403.475 128.5,392C 148.092,378.575 169.759,370.242 193.5,367C 204.768,365.128 216.102,363.961 227.5,363.5C 201.166,307.831 173.999,252.497 146,197.5C 125.741,141.974 138.241,95.4744 183.5,58C 224.24,31.5327 266.24,29.5327 309.5,52C 340.732,71.2563 359.232,99.0896 365,135.5C 367.097,154.313 365.097,172.646 359,190.5C 323.225,263.716 287.225,336.716 251,409.5C 246.487,400.473 241.987,391.473 237.5,382.5 Z"/></g>
            <g><path fill="#1E3A8A" d="M 243.5,88.5 C 272.254,87.1119 290.754,100.112 299,127.5C 301.985,155.706 290.151,174.539 263.5,184C 233.632,188.77 213.799,176.937 204,148.5C 199.905,117.002 213.072,97.0018 243.5,88.5 Z"/></g>
            <g><path fill="#fefefe" d="M 227.5,381.5 C 228.964,380.84 230.631,380.507 232.5,380.5C 234.64,380.556 236.306,381.223 237.5,382.5C 234.272,381.586 230.939,381.253 227.5,381.5 Z"/></g>
          </svg>
        </a>
        <Link prefetch={false} href="/"><span className="font-normal text-xl tracking-tight text-white">{t('native-land')}</span></Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-1.5">
            <li>
              <Link prefetch={false} href="/dashboard" className="shadow group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium text-white duration-300 ease-in-out bg-white bg-opacity-20 hover:bg-opacity-30 ">
                {tDash('profile')}
              </Link>
            </li>
            {session.user.global_permissions.find(perm => perm.entity === "api") || session.user.item_permissions.find(perm => perm.entity === "api") ?
              <li>
                <Link prefetch={false} href="/dashboard/api" className="shadow group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium text-white duration-300 ease-in-out bg-white bg-opacity-20 hover:bg-opacity-30 ">
                  {t('api')}
                </Link>
              </li>
            : false }
            {session.user.global_permissions.find(perm => perm.entity === "research") || session.user.item_permissions.find(perm => perm.entity === "research") ?
              <li>
                <Link prefetch={false} href="/dashboard/research" className="shadow group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium text-white duration-300 ease-in-out bg-white bg-opacity-20 hover:bg-opacity-30 ">
                  {tDash('research')}
                </Link>
              </li>
            : false }
            {session.user.global_permissions.find(perm => perm.entity === "mapbox") || session.user.item_permissions.find(perm => perm.entity === "mapbox") ?
              <li>
                <Link prefetch={false} href="/dashboard/mapbox" className="shadow group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium text-white duration-300 ease-in-out bg-white bg-opacity-20 hover:bg-opacity-30 ">
                  {tDash('mapbox')}
                </Link>
              </li>
            : false }
            {session.user.global_permissions.find(perm => perm.entity === "users") || session.user.item_permissions.find(perm => perm.entity === "users") ?
              <li>
                <Link prefetch={false} href="/dashboard/users" className="shadow group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium text-white duration-300 ease-in-out bg-white bg-opacity-20 hover:bg-opacity-30 ">
                  {tDash('user-management')}
                </Link>
              </li>
            : false }
            <li>
              <Link prefetch={false} href="/" className="relative flex items-center gap-2.5 rounded-sm px-2 py-2 font-medium text-white text-opacity-50 duration-300 ease-in-out hover:text-opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
                </svg>
                {tDash('back-to-homepage')}
              </Link>
            </li>
          </ul>

          <ul className="mb-6 flex flex-col gap-1.5 absolute bottom-0">
            <li>
              <Link prefetch={false} href="/auth/logout" className="relative flex items-center gap-2.5 rounded-sm px-2 py-2 font-medium text-white text-opacity-50 duration-300 ease-in-out hover:text-opacity-100">
                {t('log-out')}
              </Link>
            </li>
          </ul>

        </nav>
      </div>
    </nav>
  );
}
