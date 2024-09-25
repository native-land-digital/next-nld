import prisma from "@/lib/db/prisma";
import { getDictionary } from '@/i18n/dictionaries';

import MapContainer from '@/components/front-map/map-container';
import MapModal from '@/components/front-map/modal';
import FrontPage from '@/components/static/front-page';

export default async function Home({ params: { lang } }) {

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

  const dict = await getDictionary(lang, 'front-page-map')

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <MapModal dict={dict} />
      <MapContainer dict={dict} territoryOptions={territoryOptions} languageOptions={languageOptions} treatyOptions={treatyOptions} />
      <FrontPage lang={lang} />
    </div>
  );
}
