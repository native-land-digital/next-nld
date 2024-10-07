import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar'
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('Common');

  return (
    <div>
      <div className="font-[sans-serif] bg-white pb-5">
        <SubHeader title={t('not-found')} />
        <div className="grid gap-5 grid-cols-1 md:grid-cols-3 px-5 md:px-0 w-full md:w-2/3 min-h-screen m-auto -mt-12 text-black static-page">
          <Sidebar />
          <div className="col-span-2 bg-white rounded-t shadow-lg mt-5">
            <div className="px-4 pb-4 break-words">
              <p>Sorry, the website is having trouble finding the page you were looking for.</p>
              <p>This might be an error on our side. If you think this page should exist, get in touch with us at report-bugs@native-land.ca.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
