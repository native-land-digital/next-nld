import { PrismaClient } from '@prisma/client'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'

const prisma = new PrismaClient();

interface Geometry {
  type: string;
  coordinates: Array<number>;
}

interface Row {
  osm_id : string;
  name : string;
  in_lang : string;
  language : string;
  in_lang_latin : string;
  place_type: string;
  geometry : Geometry;
  saved_slug : string;
}

const placenamesToFetch = [ "navajo", "dakota", "yupik", "apache", "keres", "cherokee", "choctaw", "zuni", "oodham", "ojibwe", "hopi", "inupiat", "tewa", "muskogee", "crow", "shoshoni", "cheyenne", "tiwa", "towa", "inuktitut", "central_siberian_yupik", "central_alaskan_yupik", "alutiiq", "unangan", "denaina", "deg_xinag", "holikachuk", "koyukon", "dinaki", "gwichin", "lower_tanana", "upper_tanana", "tanacross", "han", "ahtna", "eyak", "tlingit", "haida", "smalgyax", "northern_sami", "lule_sami", "southern_sami", "skolt_sami", "pite_sami", "kven", "maori", "cree", "innu_aimun", "chipewyan", "oji_cree", "mikmaq", "sioux", "atikamekw", "blackfoot", "tlicho", "algonquin", "dakelh", "gitxsanimaax", "tsilhqotin", "slavey", "maliseet_passamaquoddy", "inuinnaqtun", "kanienkeha", "pitcairn_norfolk", "australian_aboriginal_language", "yugambeh_bandjalangic", "pitjantjatjara", "wiradjuri", "nyungar", "gundungurra", "pintupi", "bininj_gun_wok", "ngarigo", "daungwurrung", "woiwurrung", "wathawurrung", "kaurna", "gunditjmara", "eastern_arrernte", "dharug" ]

async function main() {

  await prisma.entry.deleteMany({ where : {
    category : {
      equals : 'placenames'
    }
  } })

  let createdRecords = 0;

  const entriesToCreate: any[] = [];
  const websitesToCreate = [];
  const changelogToCreate = [];
  const pronunciationsToCreate = [];
  const allPlacenames = [];

  // Get appropriate seed file from AWS bucket
  // for(let i=0; i < 1; i++) {
  for(let i=0; i < placenamesToFetch.length; i++) {

    let currentLanguage = placenamesToFetch[i];
    const client = new S3Client({ region: process.env.AWS_REGION })
    const seedBucketParams = { Bucket: process.env.AWS_SEED_BUCKET_NAME, Key: `placenames/${currentLanguage}.json` };
    const data = await client.send(new GetObjectCommand(seedBucketParams));

    if(data && data.Body) {
      const importString = await data.Body.transformToString();
      let importJSON = <Row[]>JSON.parse(importString)

      const existingEntries = await prisma.entry.findMany({
        select: {
          slug: true,
        },
      });
      const existingSlugs = existingEntries.map(entry => entry.slug);

      if(importJSON) {

        // importJSON.splice(10); // For import testing

        for await (const row of importJSON) {

          // Ensuring unique slug
          let slug = encodeURIComponent(JSON.parse(JSON.stringify(row.in_lang))).toLowerCase();
          const slugSuffix = "-";
          let slugNumber = 1;
          let slugIsUnique = false;
          while(!slugIsUnique) {
            const currentSlug = slug + (slugNumber > 1 ? (slugSuffix + slugNumber.toString()) : "")
            const foundSlug = existingSlugs.indexOf(currentSlug) > -1;
            if(!foundSlug) {
              const slugInEntries = entriesToCreate.find(entry => entry.slug === currentSlug);
              if(!slugInEntries) {
                slugIsUnique = true;
                slug = currentSlug;
              } else {
                slugNumber = slugNumber + 1;
              }
            } else {
              slugNumber = slugNumber + 1;
            }
          }

          existingSlugs.push(slug);

          let newEntryData: any = {
            data : {
              createdAt : new Date(),
              updatedAt : new Date(),
              name : row.in_lang,
              slug : slug,
              sources : `<p>OpenStreetMaps reference: <a href="https://www.openstreetmap.org/${row.osm_id}" target="_blank">${row.name}</a>`,
              category : 'placenames',
              published : true,
              language : row.language
            },
            select : {
              id : true
            }
          }

          entriesToCreate.push(newEntryData.data);
          websitesToCreate.push({
            slug : slug,
            url : `https://www.openstreetmap.org/${row.osm_id}`,
            title : "OpenStreetMaps Node"
          });
          changelogToCreate.push({
            slug : slug,
            createdAt : new Date(),
            description : "Placename added"
          });
          if(row.in_lang_latin) {
            pronunciationsToCreate.push({
              slug : slug,
              text : row.in_lang_latin
            })
          }
          const modifiedRowData = JSON.parse(JSON.stringify(row));
          row.saved_slug = slug;
          allPlacenames.push(row)

          // Then add the geometry
          // if(newEntry) {
          //   createdRecords = createdRecords + 1;
          //   if(row.geometry) {
          //     if(row.geometry.type.indexOf("Point") > -1) {
          //       await prisma.$executeRawUnsafe(`
          //         INSERT INTO "Point" (geometry, "entryId", "osmType", "osmId")
          //         VALUES (ST_Force2D(ST_GeomFromGeoJSON('${JSON.stringify(row.geometry)}')), ${newEntry.id}, '${row.place_type}', '${row.osm_id}')
          //       `)
          //     }
          //   }
          // } else {
          //   console.log('MISSED AN ENTRY')
          // }

          // Could have something here associating it with a given language, or an overlapping nation polygon, or some combination of those things?
        }

        // console.log(`created ${createdRecords} rows`)
      }
    }
  }

  const chunkSize = 500;
  const batches = chunk(entriesToCreate, 500);
  const websiteBatches = chunk(websitesToCreate, 500);
  const changelogBatches = chunk(changelogToCreate, 500);

  for(let i=0; i < batches.length; i++) {
    const batch = batches[i];
    const websites = websiteBatches[i];
    const changelog = changelogBatches[i];

    console.log('entry many')
    await prisma.entry.createMany({ data: batch, skipDuplicates: true });
    
    const inserted = await prisma.entry.findMany({
      where: {
        slug: { in: batch.map(row => row.slug) },
      },
      select: { id: true, slug: true },
    });

    const idMap = Object.fromEntries(inserted.map(e => [e.slug, e.id]));

    const websitesToInsert = websites.map(website => {
      return {
        entryId : idMap[website.slug],
        url : website.url,
        title : website.title
      }
    })
    console.log('website many')
    await prisma.website.createMany({ data: websitesToInsert, skipDuplicates: true });

    const changelogToInsert = changelog.map(change => {
      return {
        entryId : idMap[change.slug],
        createdAt : change.createdAt,
        description : change.description
      }
    })
    console.log('change many')
    await prisma.change.createMany({ data: changelogToInsert, skipDuplicates: true });

    const pronunciationToInsert = pronunciationsToCreate.filter(pron => idMap[pron.slug]).map(pron => {
      return {
        entryId : idMap[pron.slug],
        text : pron.text,
      }
    })
    console.log('change pron')
    await prisma.pronunciation.createMany({ data: pronunciationToInsert, skipDuplicates: true });

    const valuesSQL = allPlacenames
      .filter(row => row.geometry?.type === 'Point' && idMap[row.saved_slug])
      .map(row => {
        const entryId = idMap[row.saved_slug];
        const geomJSON = JSON.stringify(row.geometry).replace(/'/g, "''"); // escape single quotes
        return `(
          ST_Force2D(ST_GeomFromGeoJSON('${geomJSON}')),
          ${entryId},
          '${row.place_type}',
          '${row.osm_id}'
        )`;
      }).join(',\n');

    console.log('trying batch')
    // console.log(valuesSQL)
    if (valuesSQL.length > 0) {
      await prisma.$executeRawUnsafe(`
        INSERT INTO "Point" (geometry, "entryId", "osmType", "osmId")
        VALUES ${valuesSQL}
      `);
    }
    console.log('did batch')
  }


}

function chunk<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

main().then(async () => {
  await prisma.$disconnect()
}).catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
