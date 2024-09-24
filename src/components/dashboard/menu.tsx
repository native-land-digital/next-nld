import { getServerSession } from "next-auth/next"
import { authOptions } from "@/root/auth";

export default async function AdminMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="col-span-1 bg-white rounded shadow-lg p-1.5">
      <div className="flex w-full">
        {session.user.permissions.indexOf('profile') > -1 ?
          <a href="/dashboard" className="border-r-2 p-2.5 hover:bg-slate-100">Profile</a>
        : false }
        {session.user.permissions.indexOf('api') > -1 ?
          <a href="/dashboard/api" className="border-r-2 p-2.5 hover:bg-slate-100">API</a>
        : false}
        {session.user.permissions.indexOf('research') > -1 ?
          <a href="/dashboard/research" className="border-r-2 p-2.5 hover:bg-slate-100">Research</a>
        : false}
        {session.user.permissions.indexOf('update_mapbox') > -1 ?
          <a href="/dashboard/mapbox" className="border-r-2 p-2.5 hover:bg-slate-100">Mapbox</a>
        : false}
        {session.user.permissions.indexOf('manage_users') > -1 ?
          <a href="/dashboard/users" className="border-r-2 p-2.5 hover:bg-slate-100">User Management</a>
        : false}
        <a href="/auth/logout" className="ml-auto border-l-2 p-2.5 hover:bg-slate-100">Log out</a>
      </div>
    </div>
  );
}
