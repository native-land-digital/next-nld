import { getServerSession } from "next-auth/next"
import { getTranslations } from 'next-intl/server';
import Link from 'next/link'

import { authOptions } from "@/root/auth";

export default async function AdminMenu() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations('Dashboard');
  const tNav = await getTranslations('Navigation');

  return (
    <div className="col-span-1 bg-white rounded shadow-lg p-1.5">
      <div className="grid md:flex w-full">
        {session.user.permissions.indexOf('profile') > -1 ?
          <Link prefetch={false} href="/dashboard" className="border-r-2 p-2.5 hover:bg-slate-100">{t('profile')}</Link>
        : false }
        {session.user.permissions.indexOf('api') > -1 ?
          <Link prefetch={false} href="/dashboard/api" className="border-r-2 p-2.5 hover:bg-slate-100">{tNav('api')}</Link>
        : false}
        {session.user.permissions.indexOf('research') > -1 ?
          <Link prefetch={false} href="/dashboard/research" className="border-r-2 p-2.5 hover:bg-slate-100">{t('research')}</Link>
        : false}
        {session.user.permissions.indexOf('update_mapbox') > -1 ?
          <Link prefetch={false} href="/dashboard/mapbox" className="border-r-2 p-2.5 hover:bg-slate-100">{t('mapbox')}</Link>
        : false}
        {session.user.permissions.indexOf('manage_users') > -1 ?
          <Link prefetch={false} href="/dashboard/users" className="border-r-2 p-2.5 hover:bg-slate-100">{t('user-management')}</Link>
        : false}
        <Link prefetch={false} href="/auth/logout" className="ml-auto border-l-2 p-2.5 hover:bg-slate-100">{tNav('log-out')}</Link>
      </div>
    </div>
  );
}
