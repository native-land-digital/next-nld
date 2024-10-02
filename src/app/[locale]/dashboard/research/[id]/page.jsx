import prisma from "@/lib/db/prisma";

import SubHeader from '@/components/nav/sub-header'
import AdminMenu from '@/components/dashboard/menu'
import EditPolygon from '@/components/dashboard/edit-polygon'

export default async function Page({ params : { id } }) {

  // Extra query because all the related fields are too hard to write in SQL
  const polygonShape = await prisma.$queryRaw`
    SELECT ST_AsGeoJSON(geometry) FROM "Polygon"
    WHERE id = ${Number(id)}
  `
  const polygon = await prisma.polygon.findUnique({
    where : { id : Number(id) },
    select : {
      id : true,
      name : true,
      category : true,
      slug : true,
      color : true,
      sources : true,
      pronunciation : true,
      published : true,
      media : true,
      websites : true,
      changelog : true,
      relatedFrom : true,
      relatedTo : {
        select : {
          relatedTo : {
            select : {
              id : true,
              name : true,
            }
          },
          description : true
        }
      },
      createdAt : true,
      updatedAt : true
    }
  });

  if(!polygon) {
    return false;
  }

  polygon.geometry = null;
  if(polygonShape && polygonShape[0] && polygonShape[0].st_asgeojson) {
    polygon.geometry = JSON.parse(polygonShape[0].st_asgeojson)
  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={"Research"} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <EditPolygon polygon={polygon} />
        </div>
      </div>
    </div>
  );
}
