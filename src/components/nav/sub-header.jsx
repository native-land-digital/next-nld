import { getTranslations } from '@/i18n/server-i18n';
import Link from 'next/link'

import SubHeaderVerification from '@/components/nav/sub-header-verification';

export default async function SubHeader({ title, crumbs = [], verification = false }) {

  const t = await getTranslations('Navigation');

  return (
    <div className="bg-blue-900 h-60 flex items-center py-6 px-10 md:px-0">
      <div className="w-full md:w-2/3 m-auto capitalize">
        <h2 className="font-semibold text-3xl">
          {title}
          <span>
            <SubHeaderVerification verification={verification} />
          </span>
        </h2>
        <div className="text-sm mt-1.5">
          <Link prefetch={false} className="text-white hover:text-slate-300" href="/">{t('home')}</Link>
          {crumbs.map(crumb => {
            return (
              <span key={`crumb-${crumb.title}`}>
                <span className="ml-2 mr-2">/</span>
                <Link prefetch={false} className="capitalize text-white hover:text-slate-300" href={crumb.url}>
                  {crumb.title}
                </Link>
              </span>
            )
          })}
          <span className="ml-2 mr-2">/</span>
          <span className="capitalize text-white">
            {title}
          </span>
        </div>
      </div>
    </div>
  );
}
