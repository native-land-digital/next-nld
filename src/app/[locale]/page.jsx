import prisma from "@/lib/db/prisma";

import MapContainer from '@/components/front-map/map-container';
import MapModal from '@/components/front-map/modal';
import FrontPage from '@/components/static/front-page';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

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
    take : 25
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
    take : 25
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
    take : 25
  });

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapModal />
      <MapContainer territoryOptions={territoryOptions} languageOptions={languageOptions} treatyOptions={treatyOptions} />
      <FrontPage />
    </div>
  );
}
