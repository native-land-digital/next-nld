/*
  Legacy Native-Land.ca API. Set at this URL because that's where it was for an awfully long time so far.
*/
import prisma from "@/lib/db/prisma";
import { Prisma, Polygon } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/root/logger";

export const GET = async (req: NextRequest ) => {
	const maps = req.nextUrl.searchParams.get('maps');
	const position = req.nextUrl.searchParams.get('position');
	const name = req.nextUrl.searchParams.get('name');
	const key = req.nextUrl.searchParams.get('key');
  if(!maps) {
    return NextResponse.json({ error : `You did not include a maps type with your request (territories, languages, and/or treaties)` }, { status: 500 });
  } else {
    try {
      let featureList = [];
      const mapCategories = maps.split(',');
      // Check point in polygons
      let matchingShapeIDs = [];
      if(position) {
        let latlng = position.split(',');
        const positionGeometry = {
          type : "Point",
          coordinates : [parseFloat(latlng[1]), parseFloat(latlng[0])]
        }
        try {
          const polygonShapes = await prisma.$queryRaw`
            SELECT id
            FROM "Polygon"
            WHERE ST_Contains(geometry, ST_GeomFromGeoJSON('{"type":"Point","coordinates":[-122.83028873,49.18842944]}'))
          `
          matchingShapeIDs = polygonShapes.map(shape => shape.id);
        } catch (err) {
          return NextResponse.json({ error : `The spatial query had an error: ${JSON.stringify(err)}` }, { status: 500 });
        }
      }
      // Add various sections to query
      let query = {
        select : {
          id : true,
          name : true,
          slug : true
        },
        where : {
          AND : [{
            category : {
              in : mapCategories
            }
          }]
        }
      }
      if(name) {
        let nameSet = name.split(',');
        query.where['AND'].push({
          OR : nameSet.map(singleName => {
            return {
              name : {
                contains : singleName,
                mode : 'insensitive'
              }
            }
          })
        })
      }
      if(matchingShapeIDs && matchingShapeIDs.length > 0) {
        query.where['AND'].push({
          id : {
            in : matchingShapeIDs
          }
        })
      }
      const polygons = await prisma.polygon.findMany(query)
      if(polygons.length > 0) {
  			const ids = polygons.map(polygon => polygon.id);
  		  const polygonShapes = await prisma.$queryRaw`
  		    SELECT id, ST_AsGeoJSON(geometry) as geojson
  				FROM "Polygon"
  		    WHERE id IN (${Prisma.join(ids)})
  		  `
  			polygons.forEach(polygon => {
  				let thisPolygonShape = polygonShapes.find(shape => shape.id === polygon.id);
  				if(thisPolygonShape) {
  					try {
              let geometry = JSON.parse(thisPolygonShape.geojson)
              featureList.push({
                type : "Feature",
                properties : {
                  "Name" : polygon.name,
                  "ID" : polygon.id,
                  "Slug" : polygon.slug,
                  "description" : `${process.env.NEXTAUTH_URL}/maps/${polygon.category}/${polygon.slug}`,
                  "color" : "<color goes here>",
                },
                geometry : {
                  type : geometry.coordinates[0].length === 1 ? "Polygon" : "MultiPolygon",
                  coordinates : geometry.coordinates[0].length === 1 ? geometry.coordinates[0] : geometry.coordinates
                }
              })
  					} catch (err) {
  						console.log('An error with parsing the geometry')
  					}
  				}
  			})
      }
      if (featureList.length > 0) {
				logger.info(`API ${req.nextUrl.search} ${key ? key : "no_key"} ${req.ip ? req.ip : "no_ip"}`)
    		return NextResponse.json(featureList);
      } else {
        return NextResponse.json(featureList);
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
    }
  }
}

export const POST = async (req: NextRequest) => {
		const body: CreateUserReqBody = await req.json();

		if (!body.maps) {
			return NextResponse.json({ error : "Please provide a category (territories, languages, and/or treaties)" }, { status: 400 });
		}
		if (!body.polygon_geojson) {
			return NextResponse.json({ error : "Please provide an geoJSON polygon" }, { status: 400 });
		}

		try {
			// only takes a single shape right now
			let geometryAsString = JSON.stringify(body.polygon_geojson.features[0].geometry);
			const polygonShapes = await prisma.$queryRawUnsafe(`
				SELECT id, name, slug, ST_AsGeoJSON(geometry) as geojson
				FROM "Polygon"
				WHERE category = '${body.maps}'
				AND ST_Intersects(geometry, ST_GeomFromGeoJSON('${geometryAsString}'))
			`)
			const featureList = polygonShapes.map(polygon => {
				let geometry = JSON.parse(polygon.geojson)
				return {
					type : "Feature",
					properties : {
						"Name" : polygon.name,
						"ID" : polygon.id,
						"Slug" : polygon.slug,
						"description" : `${process.env.NEXTAUTH_URL}/maps/${polygon.category}/${polygon.slug}`,
						"color" : "<color goes here>",
					},
					geometry : {
						type : geometry.coordinates[0].length === 1 ? "Polygon" : "MultiPolygon",
						coordinates : geometry.coordinates[0].length === 1 ? geometry.coordinates[0] : geometry.coordinates
					}
				}
			})
			logger.info(`API ${req.nextUrl.search} ${key ? key : "no_key"} ${req.ip ? req.ip : "no_ip"}`)
			return NextResponse.json(featureList);
		} catch (error) {
			console.error(error);
			return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
		}
}
