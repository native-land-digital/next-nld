import { db } from '@/lib/db/kysely'
import { S3Client, HeadObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { FormData, File } from 'node-fetch';
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const GET = async (req) => {
  const token = await getToken({ req })

	if(token && token.id) {

    const user = await db.selectFrom('User')
      .where('id', '=', Number(token.id))
      .select(['permissions'])
      .executeTakeFirst()

		if(user.permissions.includes('update_mapbox')) {

      const category = req.nextUrl.searchParams.get('category');
      if(category) {

        try {
          let categoryToSearch = category;
          if(category === 'greetings') {
            categoryToSearch = 'languages';
          }

          let geometryType = "Polygon";
          if(category === 'placenames') {
            geometryType = "Point";
          }

          let entriesQuery = false;

          // Polygon layers
          if(category === 'territories' || category === 'languages' || category === 'treaties' || category === 'greetings') {
            entriesQuery = db.selectFrom('Entry')
              .where('category', '=', categoryToSearch)
              .where('published', '=', true)
              .leftJoin('Polygon', 'Polygon.entryId', 'Entry.id')
              .select((eb) => [
                'Entry.id', 'Entry.name', 'Entry.category', 'Entry.color', 'Entry.slug',
                eb.fn('ST_AsGeoJSON', 'Polygon.geometry').as('geometry'),
              ])
              .distinctOn('Entry.id')

            if(category === 'greetings') {
              entriesQuery = entriesQuery.innerJoin('Greeting', 'Entry.id', 'Greeting.entryId')
            }
          }

          // Point layers
          if(category === 'placenames') {
            entriesQuery = db.selectFrom('Entry')
              .where('category', '=', categoryToSearch)
              .where('published', '=', true)
              .leftJoin('Point', 'Point.entryId', 'Entry.id')
              .select((eb) => [
                'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug',
                eb.fn('ST_AsGeoJSON', 'Point.geometry').as('geometry'),
              ])
              .distinctOn('Entry.id')
          }

          const entries = await entriesQuery.execute()

          if(entries.length > 0) {

            // Prepare line-delimited geoJSON
            const features = [];
            entries.forEach(entry => {
              if(entry.geometry) {
                const geometry = JSON.parse(entry.geometry)
                if(geometry && geometry.coordinates) {
                  const feature = {
                    type : "Feature",
                    id : entry.id,
                    properties : {
                      id : entry.id,
                      Slug : entry.slug,
                      Name : entry.name,
                      description : process.env.NEXTAUTH_URL + `/maps/${category}/${entry.slug}`
                    },
                    geometry : geometry
                  }
                  if(category === 'territories' || category === 'languages' || category === 'treaties' || category === 'greetings') {
                    feature.properties.color = entry.color;
                  }
                  features.push(feature);
                }
              }
            })

            // Uploading and replacing geoJSON in s3
            const featureCollection = { type : "FeatureCollection", features : features }
            const bucketParams = { Bucket: process.env.AWS_GEOJSON_BUCKET, Key: `${category}.geojson` };
            const client = new S3Client({ region: process.env.AWS_REGION })
            let fileExists = false;
            try {
              await client.send(new HeadObjectCommand(bucketParams));
              fileExists = true;
            } catch {
              fileExists = false;
            }

            if(fileExists) {
              await client.send(new DeleteObjectCommand(bucketParams));
            }

            await client.send(new PutObjectCommand({
              Bucket : bucketParams.Bucket,
              Key : bucketParams.Key,
              Body : JSON.stringify(featureCollection)
            }));


            // Do the MTS dance
            const lineDelimitedGeoJSON = features.map(feature => { return JSON.stringify(feature) }).join('\n');
            const mapbox_username = process.env.MAPBOX_USERNAME;
            const secret_access_token = process.env.MAPBOX_SECRET_TOKEN;
            let tilesetName = "";
            if(category === 'territories') {
              tilesetName = process.env.TERRITORIES_TILESET_NAME;
            } else if(category === 'languages') {
              tilesetName = process.env.LANGUAGES_TILESET_NAME;
            } else if(category === 'treaties') {
              tilesetName = process.env.TREATIES_TILESET_NAME;
            } else if(category === 'greetings') {
              tilesetName = process.env.GREETINGS_TILESET_NAME;
            } else if(category === 'placenames') {
              tilesetName = process.env.PLACENAMES_TILESET_NAME;
            }
            const tileset_source = tilesetName + "_source";
            // const tileset_source_layer = tilesetName + "_source_layer";
            const tileset = mapbox_username + '.' + tilesetName + '_layer';

            // Create formdata to send
            const formData = new FormData()
            const buffer = Buffer.from(lineDelimitedGeoJSON);
            const file = new File([buffer], 'upload.json')
            formData.set('file', file, 'upload.json')

            // Only activate one of the below methods at a time.
            // They are both here in case, in the future, you need to create a new tileset this way.

            // FOR NEW TILESETS
            // CREATES A NEW TILESET
            // try {
            //   const tilesetSourceCall = await fetch(`https://api.mapbox.com/tilesets/v1/sources/${mapbox_username}/${tileset_source}?access_token=${secret_access_token}`, {
            //     method : "POST",
            //     body : formData
            //   });
            //   const tilesetSourceCallJSON = await tilesetSourceCall.json();
            // } catch(err) {
            //   return NextResponse.json({ error : `Error creating tileset source ${JSON.stringify(err)}` }, { status: 500 });
            // }
            //
            // const recipe = { version : 1, layers : {}}
            // recipe.layers[tileset_source_layer] = {
            //   "source": `mapbox://tileset-source/${mapbox_username}/${tileset_source}`,
            //   "minzoom": 1,
            //   "maxzoom": 10
            // }
            //
            // try {
            //   const tilesetCall = await fetch(`https://api.mapbox.com/tilesets/v1/${tileset}?access_token=${secret_access_token}`, {
            //     method : "POST",
            //     headers : {
            //       "Content-Type" : "application/json"
            //     },
            //     body : JSON.stringify({
            //       recipe : recipe,
            //       name : tilesetName
            //     })
            //   });
            //   const tilesetCallJSON = await tilesetCall.json();
            // } catch(err) {
            //   return NextResponse.json({ error : `Error creating tileset ${JSON.stringify(err)}` }, { status: 500 });
            // }
            //
            // await new Promise(resolve => setTimeout(resolve, 5000)); // Because the tileset takes a moment to register
            //
            // try {
            //   const tilesetPublishCall = await fetch(`https://api.mapbox.com/tilesets/v1/${tileset}/publish?access_token=${secret_access_token}`, {
            //     method : "POST"
            //   });
            //   const tilesetPublishCallJSON = await tilesetPublishCall.json();
            // } catch(err) {
            //   return NextResponse.json({ error : `Error publishing tileset ${JSON.stringify(err)}` }, { status: 500 });
            // }


            // FOR UPDATING
            // REPLACES THE EXISTING TILESET
            try {
              const tilesetCall = await fetch(`https://api.mapbox.com/tilesets/v1/sources/${mapbox_username}/${tileset_source}?access_token=${secret_access_token}`, {
                method : "PUT",
                body : formData
              });
              await tilesetCall.json();
            } catch(err) {
              return NextResponse.json({ error : `Error updating tileset source ${JSON.stringify(err)}` }, { status: 500 });
            }

            try {
              const tilesetPublishCall = await fetch(`https://api.mapbox.com/tilesets/v1/${tileset}/publish?access_token=${secret_access_token}`, {
                method : "POST"
              });
              await tilesetPublishCall.json();
            } catch(err) {
              return NextResponse.json({ error : `Error publishing tileset ${JSON.stringify(err)}` }, { status: 500 });
            }

        		return NextResponse.json({
              featuresUpdated : entries.length,
              updateSuccessful : true
            });
          } else {
            return NextResponse.json({ error : `No entry found with this id` }, { status: 500 });
          }
        } catch (error) {
          console.error(error);
          return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error : `Please choose a category to upload to Mapbox` }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }
}
