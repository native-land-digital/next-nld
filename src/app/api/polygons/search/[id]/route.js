import prisma from "@/lib/db/prisma";
import { headers } from 'next/headers'
import { NextResponse } from "next/server";

export const GET = async (req, route) => {
  const referer = headers().get('referer');
  if(referer && referer.indexOf(process.env.NEXTAUTH_URL) > -1) {
    const { id: polygonId } = route.params;
    try {
  	  const polygons = await prisma.$queryRaw`
  	    SELECT id, name, category, ST_AsGeoJSON(ST_Envelope(geometry)) as bounds
  			FROM "Polygon"
  	    WHERE id = ${Number(polygonId)}
  	  `
      if(polygons.length > 0) {
        const polygon = polygons[0]
    		if(polygon) {
    			try {
    				polygon.bounds = JSON.parse(polygon.bounds);
    			} catch (err) {
    				console.log(`An error with parsing the geometry, ${JSON.stringify(err)}`)
    			}
    		}
        if (polygon) {
      		return NextResponse.json(polygon);
        } else {
        }
      } else {
        return NextResponse.json({ error : `No polygon found with this id` }, { status: 500 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
    }
	} else {
		return NextResponse.json({ error : `This is a endpoint restricted to Native Land only` }, { status: 500 });
	}
}
