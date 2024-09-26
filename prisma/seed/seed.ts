import { PrismaClient, Polygon, User } from '@/prisma-generated/client'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'

import { hashPassword } from '../../src/lib/auth/utils';

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

interface Entry {
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
  geometry : string;
}

async function main() {

  // Get appropriate seed file from AWS bucket
  const client = new S3Client({ region: process.env.AWS_REGION })
  const seedBucketParams = { Bucket: process.env.AWS_SEED_BUCKET_NAME, Key: process.env.AWS_SEED_FILE };
  const data = await client.send(new GetObjectCommand(seedBucketParams));
  // const readStream = data.Body as Readable;
  if(data && data.Body) {
    const importString = await data.Body.transformToString();
    let importJSON = <Entry[]>JSON.parse(importString)
    // console.log(importJSON)

    // importJSON.splice(10); // For import testing

    // Admin user
    let admin = await prisma.user.create({
      data : {
        name : "Admin User",
        email : "test@native-land.ca",
        password : hashPassword("test"),
        permissions : ["profile", "api", "research", "manage_users", "update_mapbox"],
        organization : "Native Land Digital"
      }
    });

    // Removing template that came along with export
    let templateIndex = importJSON.findIndex(entry => entry.name.includes("Template"));
    if(typeof templateIndex !== undefined && templateIndex > -1) {
      importJSON.splice(templateIndex, 1);
    }

    let createdRecords = 0;

    for await (const entry of importJSON) {

      let newPolygon = await prisma.polygon.create({
        data : {
          createdAt : new Date(entry.createdAt),
          updatedAt : new Date(entry.updatedAt),
          name : entry.name,
          slug : entry.slug,
          color : entry.color,
          sources : entry.sources,
          category : entry.category,
          published : true,
          pronunciation : entry.pronunciation ? entry.pronunciation : "",
          websites : {
            createMany : {
              data : entry.websites.map(website => {
                return {
                  url : website.url,
                  title : website.title
                }
              })
            }
          },
          changelog : {
            createMany : {
              data : entry.changelog.map(change => {
                return {
                  createdAt : new Date(change.createdAt),
                  description : change.description
                }
              })
            }
          },
          media : {
            createMany : {
              data : entry.media.map(thisMedia => {
                return {
                  url : `https://${process.env.AWS_WP_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${thisMedia.url}`,
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

      // console.log(newPolygon)

      // Then add the geometry
      if(newPolygon) {
        createdRecords = createdRecords + 1;
        if(entry.geometry) {
          console.log(entry.name)
          // console.log(entry.geometry)
          let geometryAsString = JSON.stringify(entry.geometry);
          await prisma.$executeRawUnsafe(`
            UPDATE "Polygon"
            SET geometry = ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(entry.geometry)}'))
            WHERE id = ${newPolygon.id};
          `)
        }
      } else {
        console.log('MISSED A POLYGON')
      }

    }

    console.log('created ', createdRecords);

    // Then add the related fields
    const polygons = await prisma.polygon.findMany({
      select : {
        id : true,
        slug : true
      }
    });

    for await (const entry of importJSON) {
      let thisPolygon = polygons.find(polygon => polygon.slug === entry.slug)
      if(thisPolygon) {
        let hasRelation = false;
        entry.related.forEach(thisRelation => {
          let relatedPolygon = polygons.find(polygon => polygon.slug === thisRelation.relatedTo_slug)
          if(relatedPolygon) {
            hasRelation = true;
          }
        })
        if(hasRelation) {
          let newPolygonRelation = await prisma.polygon.update({
            where : {
              id : thisPolygon.id
            },
            data : {
              relatedTo : {
                createMany : {
                  data : entry.related.map(thisRelation => {
                    let relatedPolygon = polygons.find(polygon => polygon.slug === thisRelation.relatedTo_slug)
                    return {
                      description : thisRelation.description,
                      relatedToId : relatedPolygon ? relatedPolygon.id : 0
                    }
                  })
                }
              }
            }
          });
        }
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
