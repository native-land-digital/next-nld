"use client"
import { useTranslations } from '@/i18n/client-i18n';
import { signOut } from "next-auth/react";

export default function Logout() {

  const t = useTranslations('Navigation');

  return (
    <div>
      <h2 className="text-gray-800 text-center text-2xl font-bold">{t('log-out')}</h2>
      <div className="!mt-8">
        <button onClick={() => signOut({ callbackUrl: '/' })} className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
          {t('log-out')}
        </button>
      </div>
    </div>
  );
}
