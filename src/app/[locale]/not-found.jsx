'use client';
import { usePathname } from 'next/navigation'
import { useTranslations } from '@/i18n/client-i18n';
import Link from 'next/link'

import SubHeaderClient from '@/components/nav/sub-header-client'

export default function NotFound() {
  const t = useTranslations('Common');
  const pathname = usePathname()

  let linkSuggestion = false;
  if(pathname.indexOf('maps/') > -1) {
    let splitPath = pathname.split('/');
    if(splitPath[3]) {
      linkSuggestion = splitPath[3].substring(splitPath[3].length - parseInt(splitPath[3].length * 0.2), splitPath[3].length - parseInt(splitPath[3].length * 0.8))
    }
  }

  return (
    <div>
      <div className="font-[sans-serif] bg-white pb-5">
        <SubHeaderClient title={t('not-found')} />
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
          <div className="col-span-3 bg-white rounded-t shadow-lg mt-5">
            <div className="px-4 pb-4 break-words">
              <p>Sorry, the website is having trouble finding the page you were looking for.</p>
              <p>This might be an error on our side. If you think this page should exist, get in touch with us at report-bugs@native-land.ca.</p>
              {linkSuggestion ?
                <p className="font-bold">If you were looking for a territory, language, or treaty you think should work, <Link prefetch={false} href={`/maps?search=${encodeURIComponent(linkSuggestion).toLowerCase()}`}>try clicking here to do a search</Link>.</p>
              : false}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
