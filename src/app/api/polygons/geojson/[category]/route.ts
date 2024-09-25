import prisma from "@/lib/db/prisma";
import { Polygon } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

type UpdatePolygonReqBody = Partial<Omit<Polygon, "id">>;

export const GET = async (req: NextRequest, route: { params: { slug: string }}) => {
  const { category: category } = route.params;

	try {
    const polygons = await prisma.$queryRaw`
      SELECT id, name, slug, sources, ST_AsGeoJSON(geometry) as geojson
      FROM "Polygon"
      WHERE category = ${category}
    `

    if(polygons) {
      let featureCollection = { type : "FeatureCollection", features : [] }
      polygons.forEach(polygon => {
        let geometry = JSON.parse(polygon.geojson)
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
