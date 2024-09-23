import prisma from "@/lib/db/prisma";

import AdminHeader from '@/components/dashboard/header'
import AdminMenu from '@/components/dashboard/menu'
import EditPolygon from '@/components/dashboard/edit-polygon'

export default async function Page({ params }) {

  // Extra query because all the related fields are too hard to write in SQL
  const polygonShape = await prisma.$queryRaw`
    SELECT ST_AsGeoJSON(geometry) FROM "Polygon"
    WHERE id = ${Number(params.id)}
  `
  const polygon = await prisma.polygon.findUnique({
    where : { id : Number(params.id) },
    select : {
      id : true,
      name : true,
      category : true,
      depr_slug : true,
      description : true,
      pronunciation : true,
      published : true,
      media : true,
      websites : true,
      changelog : true,
      relatedFrom : true,
      relatedTo : true,
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

  console.log(polygon)

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <AdminHeader title={"Research"} breadcrumbs={["Dashboard", "Research", polygon.name]} />
      <div className="min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <AdminMenu />
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <EditPolygon polygon={polygon} />
        </div>
      </div>
    </div>
  );
}
