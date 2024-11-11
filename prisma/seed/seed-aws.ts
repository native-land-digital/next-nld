import { PrismaClient } from '@prisma/client'
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

async function main() {

  // Get appropriate seed file from AWS bucket
  const client = new S3Client({ region: process.env.AWS_REGION })
  const seedBucketParams = { Bucket: process.env.AWS_SEED_BUCKET_NAME, Key: process.env.AWS_SEED_FILE };
  const data = await client.send(new GetObjectCommand(seedBucketParams));

  if(data && data.Body) {
    const importString = await data.Body.transformToString();
    let importJSON = <Row[]>JSON.parse(importString)

    // importJSON.splice(10); // For import testing

    // Admin user
    const usersExist = await prisma.user.findUnique({
      where: {
        email : "test@native-land.ca",
      }
    });
    if(!usersExist) {
      await prisma.user.create({
        data : {
          name : "Admin User",
          email : "test@native-land.ca",
          password : hashPassword("test"),
          email_verified : true,
          permissions : ["profile", "api", "research", "manage_users", "update_mapbox"],
          organization : "Native Land Digital"
        }
      });
    }

    // Removing template that came along with export
    let templateIndex = importJSON.findIndex(row => row.name.includes("Template"));
    if(typeof templateIndex !== undefined && templateIndex > -1) {
      importJSON.splice(templateIndex, 1);
    }

    let createdRecords = 0;

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

    console.log('created ', createdRecords);

    // Then add the related fields
    const entries = await prisma.entry.findMany({
      select : {
        id : true,
        slug : true
      }
    });

    for await (const row of importJSON) {
      let thisEntry = entries.find(entry => entry.slug === row.slug)
      if(thisEntry) {
        let hasRelation = false;
        row.related.forEach(thisRelation => {
          let relatedEntry = entries.find(entry => entry.slug === thisRelation.relatedTo_slug)
          if(relatedEntry) {
            hasRelation = true;
          }
        })
        if(hasRelation) {
          let newEntryRelation = await prisma.entry.update({
            where : {
              id : thisEntry.id
            },
            data : {
              relatedTo : {
                createMany : {
                  data : row.related.map(thisRelation => {
                    let relatedEntry = entries.find(entry => entry.slug === thisRelation.relatedTo_slug)
                    return {
                      description : thisRelation.description,
                      relatedToId : relatedEntry ? relatedEntry.id : 0
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
