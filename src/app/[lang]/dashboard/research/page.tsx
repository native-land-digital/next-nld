import prisma from "@/lib/db/prisma";

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import CreatePolygon from '@/components/dashboard/create-polygon'

export default async function Page({ searchParams }) {

  let page = 0;
  let search = false;
  if(searchParams.page) {
    page = Number(searchParams.page);
  }
  if(searchParams.search) {
    search = searchParams.search;
  }
  let query = {
    select : {
      id : true,
      name : true,
      category : true
    },
    orderBy : {
      updatedAt : 'desc'
    },
    skip : page * 50,
    take : 50
  }
  if(search) {
    query['where'] = {
      name : {
        contains : search,
        mode: 'insensitive'
      }
    }
  }
  const polygons = await prisma.polygon.findMany(query);

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={"Research"} breadcrumbs={["Dashboard", "Research"]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <div className="flex w-full mb-5 bg-gray-100 p-2.5 rounded">
            <div className="w-1/2">
              <form className="flex">
                <input type="text" defaultValue={search ? search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                <button className="border border-gray-300 px-4 py-3 rounded ml-2.5">Search</button>
                {search ?
                  <a className="border border-gray-300 px-4 py-3 rounded ml-2.5" href="/dashboard/research">Clear</a>
                : false}
              </form>
            </div>
            <div className="w-1/2 flex justify-end">
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
          {polygons.length >= 50 ?
            <nav className="flex items-center mt-2.5" aria-label="Pagination">
              {page > 0 ?
                <form>
                  <input type="hidden" name="page" value={page - 1} />
                  <button type="submit" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous">
                    <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <span>Previous</span>
                  </button>
                </form>
              : false}
              <form>
                <input type="hidden" name="page" value={page + 1} />
                <button type="submit" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                  <span>Next</span>
                  <svg aria-hidden="true" className="hidden shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </form>
            </nav>
          : false}
        </div>
      </div>
    </div>
  );
}
