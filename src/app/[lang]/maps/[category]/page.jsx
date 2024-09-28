import prisma from "@/lib/db/prisma";
import Link from 'next/link';

import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';

export default async function Page({ searchParams, params : { category }}) {

  let page = 0;
  let search = false;
  if(searchParams.page) {
    page = Number(searchParams.page);
  }
  if(searchParams.search) {
    search = searchParams.search;
  }
  const query = {
    where : {
      category : category
    },
    select : {
      id : true,
      name : true,
      category : true,
      slug : true,
      media : true,
      updatedAt : true
    },
    orderBy : {
      updatedAt : 'desc'
    },
    skip : page * 24,
    take : 24
  }
  if(search) {
    query['where']['name'] = {
      contains : search,
      mode: 'insensitive'
    }
  }
  const polygons = await prisma.polygon.findMany(query);
  let countQuery = { where : query.where }
  const totalPolygons = await prisma.polygon.count(countQuery)

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={category} />
      <div className="grid gap-5 grid-cols-3 min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black static-page">
        <div className="col-span-1 bg-white rounded-t shadow-lg p-4 mt-5">
          <ol className="list-inside text-gray-400">
            <li className="mb-2.5"><Link href="/maps">All maps</Link></li>
            <li className="mb-2.5"><Link href="/maps/territories">Territories list</Link></li>
            <li className="mb-2.5"><Link href="/maps/languages">Languages list</Link></li>
            <li className="mb-2.5"><Link href="/maps/treaties">Treaties list</Link></li>
          </ol>
          <hr className="mt-2.5 mb-5"/>
        </div>
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <div className="flex w-full mb-5 bg-gray-100 p-2.5 rounded">
            <div className="w-full">
              <form className="flex">
                <input type="text" defaultValue={search ? search : ""} name="search" placeholder="Enter name to search" className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" />
                <button className="border border-gray-300 px-4 py-3 rounded ml-2.5">Search</button>
                {search ?
                  <Link className="border border-gray-300 px-4 py-3 rounded ml-2.5 text-slate-600" href="/maps/territories">Clear</Link>
                : false}
              </form>
            </div>
          </div>
          <p className="mb-2.5 text-sm">{totalPolygons} total {category} found.</p>
          <div className="grid grid-cols-2 gap-5">
            {polygons.map(polygon => {
              return (
                <div key={`polygon-${polygon.id}`} className="h-40 w-full">
                  <Link href={`/maps/${polygon.category}/${polygon.slug}`}>
                    <div className="h-full w-full bg-cover rounded" style={{backgroundImage : polygon.media.length > 0 ? `url(${polygon.media[0].url})` : ''}}>
                      <div className="h-full w-full bg-slate-600/80 rounded flex justify-items-center align-items-center place-items-center hover:bg-slate-600/75 hover:border-2 hover:border-white">
                        <div className="text-center w-full">
                          <h4 className="text-2xl font-bold text-white">{polygon.name}</h4>
                          <p className="text-xs text-white">Last updated {new Date(polygon.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
            {polygons.length >= 24 ?
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
    </div>
  );
}
