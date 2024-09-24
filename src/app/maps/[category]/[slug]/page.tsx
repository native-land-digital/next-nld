import prisma from "@/lib/db/prisma";
import SubHeader from '@/components/nav/sub-header'

import Map from '@/components/maps/map';
import Websites from '@/components/maps/websites';
import Related from '@/components/maps/related';
import Media from '@/components/maps/media';
import Changelog from '@/components/maps/changelog';

export default async function Page({ params }) {

  // Extra query because all the related fields are too hard to write in SQL
  const polygonShape = await prisma.$queryRaw`
    SELECT ST_AsGeoJSON(geometry) FROM "Polygon"
    WHERE slug = ${params.slug}
  `
  const polygon = await prisma.polygon.findUnique({
    where : {
      slug : params.slug,
      published : true
    },
    select : {
      id : true,
      name : true,
      category : true,
      slug : true,
      sources : true,
      pronunciation : true,
      media : true,
      websites : true,
      changelog : true,
      relatedFrom : true,
      relatedTo : true,
      createdAt : true,
      updatedAt : true
    }
  });

  if(polygon) {
    polygon.geometry = null;
    if(polygonShape && polygonShape[0] && polygonShape[0].st_asgeojson) {
      polygon.geometry = JSON.parse(polygonShape[0].st_asgeojson)
    }
  }

  return (
    <div className="font-[sans-serif] bg-white pb-5">
      <SubHeader title={polygon.name} breadcrumbs={[polygon.category, polygon.name]} />
      <div className="grid gap-5 grid-cols-3 min-h-screen w-full md:w-2/3 m-auto -mt-12 text-black">
        <div className="col-span-1 bg-white rounded-t shadow-lg p-4 mt-5">
          <ol className="list-inside text-gray-400">
            <li className="mb-2.5"><a href="#map">Map</a></li>
            <li className="mb-2.5"><a href="#websites">Websites</a></li>
            <li className="mb-2.5"><a href="#media">Media</a></li>
            <li className="mb-2.5"><a href="#sources">Sources</a></li>
            <li className="mb-2.5"><a href="#related-maps">Related Maps</a></li>
            <li className="mb-2.5"><a href="#changelog">Changelog</a></li>
            <li className="mb-2.5"><a href="#send-correction">Send a correction</a></li>
          </ol>
          <hr className="mt-2.5 mb-5"/>
        </div>
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <Map geometry={polygon.geometry} />
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="websites">Websites</h3>
            <Websites websites={polygon.websites} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="related-maps">Related</h3>
            <Related relatedTo={polygon.relatedTo} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="media">Media</h3>
            <Media media={polygon.media} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="sources">Sources</h3>
            <div dangerouslySetInnerHTML={{ __html : polygon.sources }} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="changelog">Changelog</h3>
            <Changelog changelog={polygon.changelog} />
          </section>
        </div>
      </div>
    </div>
  );
}
