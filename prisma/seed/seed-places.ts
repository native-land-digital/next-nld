import { PrismaClient } from '@prisma/client'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'

import importPlacesJSON from './cree.json';

const prisma = new PrismaClient();

async function main() {

  let createdRecords = 0;

  if(importPlacesJSON) {

    importPlacesJSON.splice(10); // For import testing

    for await (const row of importPlacesJSON) {

      // Ensuring unique slug
      let slug = encodeURIComponent(JSON.parse(JSON.stringify(row.in_lang))).toLowerCase();
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
          createdAt : new Date(),
          updatedAt : new Date(),
          name : row.in_lang,
          slug : slug,
          sources : `<p>OpenStreetMaps reference: <a href="https://www.openstreetmap.org/${row.osm_id}" target="_blank">${row.name}</a>`,
          category : 'placenames',
          published : true,
          pronunciation : row.in_lang_latin ? row.in_lang_latin : "",
          websites : {
            createMany : {
              data : [{
                url : `https://www.openstreetmap.org/${row.osm_id}`,
                title : "OpenStreetMaps Node"
              }]
            }
          },
          changelog : {
            createMany : {
              data : [{
                createdAt : new Date(),
                description : "Placename added"
              }]
            }
          },
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
          if(row.geometry.type.indexOf("Point") > -1) {
            await prisma.$executeRawUnsafe(`
              INSERT INTO "Point" (geometry, "entryId", "osmType", "osmId")
              VALUES (ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(row.geometry)}')), ${newEntry.id}, '${row.place_type}', '${row.osm_id}')
            `)
          }
        }
      } else {
        console.log('MISSED AN ENTRY')
      }

      // Could have something here associating it with a given language, or an overlapping nation polygon, or some combination of those things?
    }

    console.log(`created ${createdRecords} rows`)
  }

}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
