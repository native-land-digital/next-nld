import prisma from "@/lib/db/prisma";
import SubHeader from '@/components/nav/sub-header'
import Sidebar from '@/components/static/sidebar';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

import Map from '@/components/maps/map';
import Websites from '@/components/maps/websites';
import Related from '@/components/maps/related';
import Media from '@/components/maps/media';
import Changelog from '@/components/maps/changelog';

export default async function Page({ params : { locale, slug }}) {

  unstable_setRequestLocale(locale);
  const t = await getTranslations('Maps');

  // Extra query because all the related fields are too hard to write in SQL
  const polygonShape = await prisma.$queryRaw`
    SELECT ST_AsGeoJSON(geometry) FROM "Polygon"
    WHERE slug = ${slug.toLowerCase()}
  `
  const polygon = await prisma.polygon.findUnique({
    where : {
      slug : slug.toLowerCase(),
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
      relatedFrom : {
        select : {
          relatedTo : true,
          relatedFrom : true,
          description : true
        }
      },
      relatedTo : {
        select : {
          relatedTo : {
            select : {
              id : true,
              name : true,
              category : true,
              slug : true
            }
          },
          relatedFrom : {
            select : {
              id : true,
              name : true,
              category : true,
              slug : true
            }
          },
          description : true
        }
      },
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
      <SubHeader title={polygon.name} />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 min-h-screen w-full md:w-2/3 px-5 md:px-0 m-auto -mt-12 text-black">
        <Sidebar picks={3}>
          <ol className="hidden md:block list-inside text-gray-400">
            <li className="mb-2.5"><a href="#map">{t('map')}</a></li>
            <li className="mb-2.5"><a href="#websites">{t('websites')}</a></li>
            <li className="mb-2.5"><a href="#media">{t('media')}</a></li>
            <li className="mb-2.5"><a href="#sources">{t('sources')}</a></li>
            <li className="mb-2.5"><a href="#related-maps">{t('related')}</a></li>
            <li className="mb-2.5"><a href="#changelog">{t('changelog')}</a></li>
            <li className="mb-2.5"><a href="#send-correction">{t('correction')}</a></li>
          </ol>
          <hr className="hidden md:block mt-2.5 mb-5"/>
        </Sidebar>
        <div className="col-span-2 bg-white rounded-t shadow-lg p-4 mt-5">
          <Map geometry={polygon.geometry} />
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="websites">{t('websites')}</h3>
            <Websites websites={polygon.websites} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="related-maps">{t('related')}</h3>
            <Related relatedTo={polygon.relatedTo} relatedFrom={polygon.relatedFrom} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="media">{t('media')}</h3>
            <Media media={polygon.media} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="sources">{t('sources')}</h3>
            <div dangerouslySetInnerHTML={{ __html : polygon.sources }} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="changelog">{t('changelog')}</h3>
            <Changelog changelog={polygon.changelog} createdAt={polygon.createdAt} updatedAt={polygon.updatedAt} />
          </section>
          <section className="mt-5">
            <h3 className="text-xl font-bold mb-3" id="send-correction">{t('correction')}</h3>
            <p>{t('contact')}</p>
          </section>

        </div>
      </div>
    </div>
  );
}
