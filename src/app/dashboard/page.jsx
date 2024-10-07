import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth/next"
import { getTranslations } from 'next-intl/server';

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import EditUser from '@/components/dashboard/edit-user'
import { authOptions } from "@/root/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Dashboard');

  const user = await prisma.user.findUnique({
    where : { id : session.user.id },
    select : {
      id : true,
      name : true,
      email : true,
      organization : true,
      createdAt : true,
      api_key : true
    }
  });

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={t('dashboard')} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4 mt-5">
          <EditUser user={user} isAdmin={false} />
        </div>
      </div>
    </div>
  );
}
