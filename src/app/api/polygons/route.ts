import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

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
  		const polygon = await prisma.polygon.create({
  			data: {
  				name: body.name,
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
