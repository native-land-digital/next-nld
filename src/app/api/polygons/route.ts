import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import slugify from 'slugify'

import prisma from "@/lib/db/prisma";
import { Polygon } from "@prisma/client";

type CreatePolygonReqBody = Omit<Polygon, "id">;

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req })

	if(token && token.permissions.includes('research')) {
  	const body: CreatePolygonReqBody = await req.json();

  	if (!body.name) {
  		return NextResponse.json({ error : "Please provide a name" }, { status: 400 });
  	}

  	try {
      // Creating unique slug
      let slug = slugify(body.name, { lower : true });
      let slugSuffix = "-";
      let slugNumber = 1;
      let slugIsUnique = false;
      while(!slugIsUnique) {
        let currentSlug = slug + (slugNumber > 1 ? (slugSuffix + slugNumber.toString()) : "")
        const foundSlug = await prisma.polygon.findUnique({
          where : {
            slug : currentSlug
          }
        })
        if(!foundSlug) {
          slugIsUnique = true;
          slug = currentSlug;
        } else {
          slugNumber = slugNumber + 1;
        }
      }

      // Inserting into db
  		const polygon = await prisma.polygon.create({
  			data: {
  				name: body.name,
          slug : slug
  			}
  		});
  		return NextResponse.json({
  			id : polygon.id
  		});
  	} catch (error) {
  		console.error(error);
  		return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
  	}
  } else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }
}
