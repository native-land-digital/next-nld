import { getServerSession } from "next-auth/next"
import { authOptions } from "@/root/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);

  console.log(session)

  return (
    <div className="font-[sans-serif] bg-white">
      <div className="bg-blue-900 h-60 flex items-center py-6 px-10">
        <div className="w-full md:w-2/3 m-auto">
          <h2 className="font-semibold text-3xl">Account</h2>
          <div className="text-sm mt-1.5">
            <a className="text-white hover:text-slate-300" href="/">Home</a> <span className="ml-1 mr-1">/</span> Account
          </div>
        </div>
      </div>
      <div className="h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <div className="grid grid-cols-3 gap-x-5">
          <div className="col-span-1 bg-white rounded-t h-screen shadow-lg p-4">
            <p>Hey 1</p>
            {session.user.role === 'admin' ?
              <>
                <a href="">User Management</a>
              </>
            : false}
          </div>
          <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4">
            <p> Hey 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
