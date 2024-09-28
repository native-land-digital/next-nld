import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth/next"

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import { authOptions } from "@/root/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where : { id : session.user.id },
    select : {
      id : true,
      api_key : true
    }
  });

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={"API"} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4 mt-5">
          <h2 className="font-semibold text-3xl">API Details</h2>
          <p className="my-2.5">To use our API, please include this key along with all of your requests as detailed in our documentation.</p>
          <div className="w-full md:w-1/2">
            <div className="mt-2.5">
              <label className="text-gray-800 text-sm mb-1 block">API Key</label>
              <div className="relative flex items-center">
                <input value={user.api_key} name="api_key" type="text" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" disabled={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
