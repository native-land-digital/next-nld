import { getServerSession } from "next-auth/next"
import Link from 'next/link'

import { authOptions } from "@/root/auth";

export default async function AdminMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="col-span-1 bg-white rounded shadow-lg p-1.5">
      <div className="flex w-full">
        {session.user.permissions.indexOf('profile') > -1 ?
          <Link href="/dashboard" className="border-r-2 p-2.5 hover:bg-slate-100">Profile</Link>
        : false }
        {session.user.permissions.indexOf('api') > -1 ?
          <Link href="/dashboard/api" className="border-r-2 p-2.5 hover:bg-slate-100">API</Link>
        : false}
        {session.user.permissions.indexOf('research') > -1 ?
          <Link href="/dashboard/research" className="border-r-2 p-2.5 hover:bg-slate-100">Research</Link>
        : false}
        {session.user.permissions.indexOf('update_mapbox') > -1 ?
          <Link href="/dashboard/mapbox" className="border-r-2 p-2.5 hover:bg-slate-100">Mapbox</Link>
        : false}
        {session.user.permissions.indexOf('manage_users') > -1 ?
          <Link href="/dashboard/users" className="border-r-2 p-2.5 hover:bg-slate-100">User Management</Link>
        : false}
        <Link href="/auth/logout" className="ml-auto border-l-2 p-2.5 hover:bg-slate-100">Log out</Link>
      </div>
    </div>
  );
}
