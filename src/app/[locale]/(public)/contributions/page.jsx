import { db } from '@/lib/db/kysely'
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import SubHeader from '@/components/nav/sub-header'
import { setLocaleCache, getTranslations } from '@/i18n/server-i18n';
import { HeaderSessionProvider } from '@/lib/auth/session-provider'

export default async function Page({ params: { locale } }) {

  setLocaleCache(locale);
  const t = await getTranslations('Contributions');

  return (
    <div className="bg-white pb-5">
      <SubHeader
        title="Contributions"
      />
      <HeaderSessionProvider>
        <div className="w-full lg:w-3/5 min-h-screen m-auto mt-12 text-black">
          <div className="col-span-2 mt-5">
            <div className="px-4 pb-4 break-words">
              Hey
            </div>
          </div>
        </div>
      </HeaderSessionProvider>
    </div>
  );
}
