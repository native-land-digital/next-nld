import prisma from "@/lib/db/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (req ) => {
	const search = req.nextUrl.searchParams.get('s');
	const category = req.nextUrl.searchParams.get('category');
	const geosearch = req.nextUrl.searchParams.get('geosearch');
	if(req.nextUrl.origin === process.env.NEXTAUTH_URL) {
	  try {
			const query = {
	      where : {
					AND : [{
						name : {
		          contains : search,
		          mode: 'insensitive'
		        }
					}]
	      },
	      select : {
	        id : true,
	        name : true,
	        category : true
	      },
	      take: 5
	    }
			if(category) {
				query.where['AND'].push({
					category : category
				})
			}
	    const polygons = await prisma.polygon.findMany(query);
			if(geosearch && polygons.length > 0) {
				const ids = polygons.map(polygon => polygon.id);
			  const polygonShapes = await prisma.$queryRaw`
			    SELECT id, ST_AsGeoJSON(ST_Centroid(geometry)) as centroid, ST_AsGeoJSON(ST_Envelope(geometry)) as bounds
					FROM "Polygon"
			    WHERE id IN (${Prisma.join(ids)})
			  `
				polygons.forEach(polygon => {
					const thisPolygonShape = polygonShapes.find(shape => shape.id === polygon.id);
					if(thisPolygonShape) {
						try {
							polygon.centroid = JSON.parse(thisPolygonShape.centroid);
							polygon.bounds = JSON.parse(thisPolygonShape.bounds);
						} catch (err) {
							console.log(`An error with parsing the geometry, ${JSON.stringify(err)}`)
						}
					}
				})
			}
	    if (polygons) {
	  		return NextResponse.json(polygons);
	    } else {
	      return NextResponse.json({ error : `No polygons found with these search terms` }, { status: 500 });
	    }
	  } catch (error) {
	    console.error(error);
	    return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
	  }
	} else {
		return NextResponse.json({ error : `This is a private endpoint for Native Land` }, { status: 500 });
	}
}
