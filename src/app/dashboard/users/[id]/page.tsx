import prisma from "@/lib/db/prisma";

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import EditUser from '@/components/dashboard/edit-user'

export default async function Page({ params }) {
  const user = await prisma.user.findUnique({
    where : { id : Number(params.id) },
    select : {
      id : true,
      name : true,
      email : true,
      organization : true,
      permissions : true,
      createdAt : true,
      api_key : true
    }
  });

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={"User Management"} breadcrumbs={["Dashboard", "User Management", user.name]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <EditUser user={user} />
        </div>
      </div>
    </div>
  );
}
