import { getTranslations } from '@/i18n/server-i18n';
import Link from 'next/link'

export default async function SubHeader({ title, crumbs = [], verified = false }) {

  const t = await getTranslations('Navigation');

  return (
    <div className="bg-blue-900 h-60 flex items-center py-6 px-10 md:px-0">
      <div className="w-full md:w-2/3 m-auto capitalize">
        <h2 className="font-semibold text-3xl">
          {title}
          <span>
            {verified ? 
              <svg className="inline ml-2" fill="#50C878" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g data-name="Layer 2">
                  <g data-name="checkmark-circle-2">
                    <rect width="24" height="24" opacity="0"/>
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm4.3 7.61l-4.57 6a1 1 0 0 1-.79.39 1 1 0 0 1-.79-.38l-2.44-3.11a1 1 0 0 1 1.58-1.23l1.63 2.08 3.78-5a1 1 0 1 1 1.6 1.22z"/>
                  </g>
                </g>
              </svg>
            : false}
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
