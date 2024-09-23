/*
  Legacy Native-Land.ca API. Set at this URL because that's where it was for an awfully long time so far.
*/
import prisma from "@/lib/db/prisma";
import { Prisma, Polygon } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest ) => {
	const maps = req.nextUrl.searchParams.get('maps');
	const position = req.nextUrl.searchParams.get('position');
	const name = req.nextUrl.searchParams.get('name');
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
          console.log(`
            SELECT id
            FROM "Polygon"
            WHERE ST_Contains(geometry, ST_GeomFromGeoJSON('${JSON.stringify(positionGeometry)}'))
          `)
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
          depr_slug : true
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
        console.log(ids)
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
                  "Slug" : polygon.depr_slug,
                  "description" : "<link goes here>",
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
