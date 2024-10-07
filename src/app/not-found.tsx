import SubHeader from '@/components/nav/sub-header'
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('Common');
  
  return (
    <div>
      <div className="font-[sans-serif] bg-white pb-5">
        <SubHeader title={t('not-found')} />
      </div>
    </div>
  )
}
