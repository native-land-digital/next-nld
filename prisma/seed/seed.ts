import { PrismaClient } from '@prisma/client'
import { Polygon, User } from "@prisma/client";

import { hashPassword } from '../../src/lib/auth/utils';
import nldExport from './nld-export.json';

const prisma = new PrismaClient();

async function main() {

  // Admin user
  let admin = await prisma.user.create({
    data : {
      name : "Admin User",
      email : "test@native-land.ca",
      password : hashPassword("test"),
      permissions : ["profile", "api", "research", "manage_users"],
      organization : "Native Land Digital"
    }
  });

  // nldExport.splice(10); // For import testing

  let createdRecords = 0;
  for await (const entry of nldExport) {

    let newPolygon = await prisma.polygon.create({
      data : {
        name : entry.name,
        depr_slug : entry.depr_slug,
        description : entry.description,
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
                url : thisMedia.url,
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
      depr_slug : true
    }
  });

  for await (const entry of nldExport) {
    let thisPolygon = polygons.find(polygon => polygon.depr_slug === entry.depr_slug)
    if(thisPolygon) {
      let hasRelation = false;
      entry.related.forEach(thisRelation => {
        let relatedPolygon = polygons.find(polygon => polygon.depr_slug === thisRelation.relatedTo_slug)
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
                  let relatedPolygon = polygons.find(polygon => polygon.depr_slug === thisRelation.relatedTo_slug)
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

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
