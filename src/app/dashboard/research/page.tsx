import prisma from "@/lib/db/prisma";
import { redirect } from 'next/navigation'

import AdminHeader from '@/components/dashboard/header'
import AdminMenu from '@/components/dashboard/menu'
import CreatePolygon from '@/components/dashboard/create-polygon'

export default async function Page() {
  const polygons = await prisma.polygon.findMany({
    select : {
      id : true,
      name : true,
      category : true
    }
  });

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <AdminHeader title={"Research"} breadcrumbs={["Dashboard", "Research"]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t h-screen shadow-lg p-4 mt-5">
          <div className="flex">
            <div>
              <input type="text" placeholder="Enter polygon name to search" />
            </div>
            <div>
              <CreatePolygon />
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">ID</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Category</th>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {polygons.map(polygon => {
                return (
                  <tr className="odd:bg-white even:bg-gray-100" key={`user-row-${polygon.id}`}>
                    <td className="px-6 py-4 text-sm font-medium text-black">{polygon.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black">{polygon.name}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black">{polygon.category}</td>
                    <td className="px-6 py-4 text-sm font-medium text-black"><a href={`/dashboard/research/${polygon.id}`}>➜</a></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
