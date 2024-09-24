import prisma from "@/lib/db/prisma";
import MapContainer from '@/components/front-map/map-container';

export default async function Home() {

  // Querying for select2 list initial options
  const territoryOptions = await prisma.polygon.findMany({
    select : {
      id : true,
      name : true
    },
    where : {
      category : 'territories'
    },
    orderBy : {
      name : 'asc'
    },
    take : 50
  });
  const languageOptions = await prisma.polygon.findMany({
    select : {
      id : true,
      name : true
    },
    where : {
      category : 'languages'
    },
    orderBy : {
      name : 'asc'
    },
    take : 50
  });
  const treatyOptions = await prisma.polygon.findMany({
    select : {
      id : true,
      name : true
    },
    where : {
      category : 'treaties'
    },
    orderBy : {
      name : 'asc'
    },
    take : 50
  });

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapContainer territoryOptions={territoryOptions} languageOptions={languageOptions} treatyOptions={treatyOptions} />
    </div>
  );
}
