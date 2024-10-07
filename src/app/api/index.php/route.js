/*
  Legacy Native-Land.ca API. Set at this URL because that's where it was for an awfully long time so far.
*/
import prisma from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req ) => {
	const maps = req.nextUrl.searchParams.get('maps');
	const position = req.nextUrl.searchParams.get('position');
	const name = req.nextUrl.searchParams.get('name');
	// const key = req.nextUrl.searchParams.get('key');
  if(!maps) {
    return NextResponse.json({ error : `You did not include a maps type with your request (territories, languages, and/or treaties)` }, { status: 500 });
  } else {
    try {
      const featureList = [];
      const mapCategories = maps.split(',');
      // Check point in polygons
      let matchingShapeIDs = [];
      if(position) {
        const latlngString = position.split(',');
        try {
          const polygonShapes = await prisma.$queryRaw`
            SELECT id
            FROM "Polygon"
            WHERE published = true
            AND ST_Contains(geometry, ST_GeomFromText(format('POINT(%s %s)', ${parseFloat(latlngString[1])}, ${parseFloat(latlngString[0])}), 4326))
          `
          matchingShapeIDs = polygonShapes.map(shape => shape.id);
        } catch (err) {
          return NextResponse.json({ error : `The spatial query had an error: ${JSON.stringify(err)}` }, { status: 500 });
        }
      }
      // Add various sections to query
      const query = {
        select : {
          id : true,
          name : true,
					color : true,
					category : true,
          slug : true
        },
        where : {
          AND : [{
            category : {
              in : mapCategories
            }
          },{
						published : true
					}]
        }
      }
      if(name) {
        const nameSet = name.split(',');
        query.where['AND'].push({
          OR : nameSet.map(singleName => {
            return {
              slug : {
                contains : encodeURIComponent(singleName).toLowerCase(),
                mode : 'insensitive'
              }
            }
          })
        })
      }
      if(position) {
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
					WHERE published = true
  		    AND id IN (${Prisma.join(ids)})
  		  `
  			polygons.forEach(polygon => {
  				const thisPolygonShape = polygonShapes.find(shape => shape.id === polygon.id);
					polygon.geojson = thisPolygonShape.geojson;
					let feature = constructFeature(polygon);
					if(feature) {
						featureList.push(feature);
					}
  			})
      }
      if (featureList.length > 0) {
				if(featureList.length > 500) {
					return NextResponse.json({ error : "Your request had over 500 results. It's probably best to get our full GeoJSON directly! See https://api-docs.native-land.ca/full-geojsons" }, { status: 400 });
				} else {
    			return NextResponse.json(featureList);
				}
      } else {
        return NextResponse.json(featureList);
      }
    } catch (error) {
      return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
    }
  }
}

export const POST = async (req) => {
		const body = await req.json();

		if (!body.maps) {
			return NextResponse.json({ error : "Please provide a category (territories, languages, and/or treaties)" }, { status: 400 });
		}
		if (!body.polygon_geojson) {
			return NextResponse.json({ error : "Please provide an geoJSON polygon" }, { status: 400 });
		}

		try {
			if(body.polygon_geojson.features.length > 0) {
				const sqlArray = [];
				body.polygon_geojson.features.forEach(feature => {
					const subArray = [];
					const numArray = [];
					feature.geometry.coordinates[0].forEach(coordPair => {
						subArray.push(Prisma.raw`%s %s`)
						numArray.push(coordPair[0])
						numArray.push(coordPair[1])
					})
					const joinedSub = Prisma.join(subArray);
					const joinedNum = Prisma.join(numArray);
					const and = Prisma.sql`AND ST_Intersects(geometry, ST_GeomFromText(format('POLYGON((${joinedSub}))', ${joinedNum}), 4326))`
					sqlArray.push(and);
				})
				// let andQuery = Prisma.sql`AND ST_Intersects(geometry, ST_GeomFromText(format('POLYGON((${string}))', ${numbers}), 4326))`
				const polygonShapes = await prisma.$queryRaw`
					SELECT id, name, category, color, slug, ST_AsGeoJSON(geometry) as geojson
					FROM "Polygon"
					WHERE published = true
					AND category = ${body.maps}
					${Prisma.join(sqlArray)}
				`
				// ${geometryAsString}
				// WHERE ST_Contains(geometry, ST_GeomFromText(format('POINT(%s %s)', ${parseFloat(latlngString[1])}, ${parseFloat(latlngString[0])}), 4326))
				const featureList = []
				polygonShapes.forEach(polygon => {
					let feature = constructFeature(polygon);
					if(feature) {
						featureList.push(feature);
					}
				})
				if(featureList.length > 500) {
					return NextResponse.json({ error : "Your request had over 500 results. It's probably best to get our full GeoJSON directly! See https://api-docs.native-land.ca/full-geojsons" }, { status: 400 });
				}
				return NextResponse.json(featureList);
			} else {
				return NextResponse.json({ error : "The polygon has no features" }, { status: 400 });
			}
		} catch (error) {
			return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
		}
}

const constructFeature = (polygon) => {
	const geometry = JSON.parse(polygon.geojson)
	if(geometry) {
		return {
			type : "Feature",
			properties : {
				"Name" : polygon.name,
				"ID" : polygon.id,
				"Slug" : polygon.slug,
				"description" : `${process.env.NEXTAUTH_URL}/maps/${polygon.category}/${polygon.slug}`,
				"color" : polygon.color,
			},
			geometry : {
				type : geometry.coordinates[0].length === 1 ? "Polygon" : "MultiPolygon",
				coordinates : geometry.coordinates[0].length === 1 ? geometry.coordinates[0] : geometry.coordinates
			}
		}
	} else {
		return false;
	}
}
