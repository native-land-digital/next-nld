import { PrismaClient } from '@prisma/client'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'

import { hashPassword } from '../../src/lib/auth/utils';
import importPlacesJSON from './sample-nld-places-seed.json';

const prisma = new PrismaClient();

interface Media {
  url : string;
  title : string;
  caption : string;
}
interface Relation {
  description : string;
  relatedTo_slug : string;
}
interface Website {
  url : string;
  title : string;
}
interface Changelog {
  createdAt : string;
  description : string;
}

interface Geometry {
  type: string;
  coordinates: Array<number>;
}

interface Row {
  createdAt : string;
  updatedAt : string;
  name : string;
  slug : string;
  color: string;
  category : string;
  sources : string;
  pronunciation : string;
  websites : Website[],
  changelog : Changelog[],
  related : Relation[],
  media : Media[],
  geometry : Geometry;
}
interface RelationInner {
  description : string;
  relatedToId : number;
}

async function main() {

  if(importJSON) {

    for await (const row of importJSON) {

      // Ensuring unique slug
      let slug = JSON.parse(JSON.stringify(row.slug));
      const slugSuffix = "-";
      let slugNumber = 1;
      let slugIsUnique = false;
      while(!slugIsUnique) {
        const currentSlug = slug + (slugNumber > 1 ? (slugSuffix + slugNumber.toString()) : "")
        const foundSlug = await prisma.entry.findUnique({
          where : {
            slug : currentSlug
          }
        })
        if(!foundSlug) {
          slugIsUnique = true;
          slug = currentSlug;
        } else {
          slugNumber = slugNumber + 1;
        }
      }

      let newEntry = await prisma.entry.create({
        data : {
          createdAt : new Date(row.createdAt),
          updatedAt : new Date(row.updatedAt),
          name : row.name,
          slug : slug,
          color : row.color,
          sources : row.sources,
          category : row.category,
          published : true,
          pronunciation : row.pronunciation ? row.pronunciation : "",
          websites : {
            createMany : {
              data : row.websites.map(website => {
                return {
                  url : website.url,
                  title : website.title
                }
              })
            }
          },
          changelog : {
            createMany : {
              data : row.changelog.map(change => {
                return {
                  createdAt : new Date(change.createdAt),
                  description : change.description
                }
              })
            }
          },
          media : {
            createMany : {
              data : row.media.map(thisMedia => {
                return {
                  url : `${process.env.AWS_WP_CLOUDFRONT}/${thisMedia.url}`,
                  title : thisMedia.title,
                  caption : thisMedia.caption
                }
              })
            }
          }
        },
        select : {
          id : true
        }
      });

      console.log(row.name)

      // Then add the geometry
      if(newEntry) {
        createdRecords = createdRecords + 1;
        if(row.geometry) {
          if(row.geometry.type.indexOf("Polygon") > -1) {
            await prisma.$executeRawUnsafe(`
              INSERT INTO "Polygon" (geometry, "entryId")
              VALUES (ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(row.geometry)}')), ${newEntry.id})
            `)
          }
        }
      } else {
        console.log('MISSED AN ENTRY')
      }

    }
  }

}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
