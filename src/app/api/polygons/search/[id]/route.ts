import prisma from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, route: { params: { id: string }}) => {
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
}
