import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export const GET = async (req, route) => {
  const { category: category } = route.params;
	// const key = req.nextUrl.searchParams.get('key');

	try {
    const polygons = await prisma.$queryRaw`
      SELECT id, name, slug, sources, ST_AsGeoJSON(geometry) as geojson
      FROM "Polygon"
      WHERE category = ${category}
    `

    if(polygons) {
      const featureCollection = { type : "FeatureCollection", features : [] }
      polygons.forEach(polygon => {
        const geometry = JSON.parse(polygon.geojson)
        if(geometry) {
          featureCollection.features.push({
            type : "Feature",
            properties : {
              "Name" : polygon.name,
              "ID" : polygon.id,
              "Slug" : polygon.slug,
              "description" : `${process.env.NEXTAUTH_URL}/maps/${category}/${polygon.slug}`,
              "color" : "<color goes here>",
            },
            geometry : {
              type : geometry.coordinates[0].length === 1 ? "Polygon" : "MultiPolygon",
              coordinates : geometry.coordinates[0].length === 1 ? geometry.coordinates[0] : geometry.coordinates
            }
          })
        }
      })
      return NextResponse.json(featureCollection);
    } else {
      return NextResponse.json({ error : `Polygons not found` }, { status: 500 });
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
  }
}
