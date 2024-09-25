import prisma from "@/lib/db/prisma";
import { FormData, File } from 'node-fetch';
import { Prisma, Polygon } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req })

	if(token && token.permissions.includes('update_mapbox')) {
    const category = req.nextUrl.searchParams.get('category');
    if(category) {

      try {
    	  const polygons = await prisma.$queryRaw`
    	    SELECT id, name, category, slug, ST_AsGeoJSON(geometry) as geojson, ST_AsGeoJSON(ST_Centroid(geometry)) as centroid
    			FROM "Polygon"
    	    WHERE category = ${category}
    	  `
        if(polygons.length > 0) {

          // Prepare line-delimited geoJSON
          let features = [];
          polygons.forEach(polygon => {
            if(polygon.geojson) {
              let geometry = JSON.parse(polygon.geojson)
              if(geometry && geometry.coordinates) {
                let feature = {
                  type : "Feature",
                  id : polygon.id,
                  properties : {
                    id : polygon.id,
                    Slug : polygon.slug,
                    Name : polygon.name,
                    color : '#ccc',
                    description : process.env.NEXTAUTH_URL + `/maps/${polygon.category}/${polygon.slug}`
                  },
                  geometry : {
                    type : geometry.coordinates[0].length === 1 ? "Polygon" : "MultiPolygon",
                    coordinates : geometry.coordinates[0].length === 1 ? geometry.coordinates[0] : geometry.coordinates
                  }
                }
                features.push(JSON.stringify(feature));
                // let centroid = JSON.parse(polygon.centroid)
                // let centroidFeature = {
                //   type : "Feature",
                //   id : polygon.id,
                //   properties : {
                //     Name : polygon.name,
                //   },
                //   geometry : {
                //     type : "Point",
                //     coordinates : centroid.coordinates
                //   }
                // }
                // features.push(JSON.stringify(centroidFeature));
              }
            }
          })
          let lineDelimitedGeoJSON = features.join('\n');

          // console.log(lineDelimitedGeoJSON)

          // Do the MTS dance
          const mapbox_username = process.env.MAPBOX_USERNAME;
          const secret_access_token = process.env.MAPBOX_SECRET_TOKEN;
          let tilesetName = "";
          if(category === 'territories') {
            tilesetName = process.env.TERRITORIES_TILESET_NAME;
          } else if(category === 'languages') {
            tilesetName = process.env.LANGUAGES_TILESET_NAME;
          } else if(category === 'treaties') {
            tilesetName = process.env.TREATIES_TILESET_NAME;
          }
          const tileset_source = tilesetName + "_source";
          const tileset_source_layer = tilesetName + "_source_layer";
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
          //   console.log(`https://api.mapbox.com/tilesets/v1/sources/${mapbox_username}/${tileset_source}?access_token=${secret_access_token}`)
          //   const tilesetSourceCall = await fetch(`https://api.mapbox.com/tilesets/v1/sources/${mapbox_username}/${tileset_source}?access_token=${secret_access_token}`, {
          //     method : "POST",
          //     body : formData
          //   });
          //   const tilesetSourceCallJSON = await tilesetSourceCall.json();
          //   console.log("tileset source created");
          //   console.log(tilesetSourceCallJSON);
          // } catch(err) {
          //   console.log(err)
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
          //   console.log("tileset with recipe created");
          //   console.log(tilesetCallJSON);
          // } catch(err) {
          //   console.log(err)
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
          //   console.log("tileset published");
          //   console.log(tilesetPublishCallJSON);
          // } catch(err) {
          //   console.log(err)
          //   return NextResponse.json({ error : `Error publishing tileset ${JSON.stringify(err)}` }, { status: 500 });
          // }


          // FOR UPDATING
          // REPLACES THE EXISTING TILESET
          try {
            const tilesetCall = await fetch(`https://api.mapbox.com/tilesets/v1/sources/${mapbox_username}/${tileset_source}?access_token=${secret_access_token}`, {
              method : "PUT",
              body : formData
            });
            const tilesetCallJSON = await tilesetCall.json();
            console.log("tileset source updated");
            console.log(tilesetCallJSON);
          } catch(err) {
            console.log(err)
            return NextResponse.json({ error : `Error updating tileset source ${JSON.stringify(err)}` }, { status: 500 });
          }

          try {
            const tilesetPublishCall = await fetch(`https://api.mapbox.com/tilesets/v1/${tileset}/publish?access_token=${secret_access_token}`, {
              method : "POST"
            });
            const tilesetPublishCallJSON = await tilesetPublishCall.json();
            console.log("tileset published");
            console.log(tilesetPublishCallJSON);
          } catch(err) {
            console.log(err)
            return NextResponse.json({ error : `Error publishing tileset ${JSON.stringify(err)}` }, { status: 500 });
          }

      		return NextResponse.json({
            featuresUpdated : polygons.length,
            updateSuccessful : true
          });
        } else {
          return NextResponse.json({ error : `No polygon found with this id` }, { status: 500 });
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
}
