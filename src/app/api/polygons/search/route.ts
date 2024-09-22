import prisma from "@/lib/db/prisma";
import { Polygon } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest ) => {
	const search = req.nextUrl.searchParams.get('s');
  try {
    const polygons = await prisma.polygon.findMany({
      where : {
        name : {
          contains : search,
          mode: 'insensitive'
        },
      },
      select : {
        id : true,
        name : true,
        category : true
      },
      take: 5
    });
    if (polygons) {
  		return NextResponse.json(polygons);
    } else {
      return NextResponse.json({ error : `No polygons found with these search terms` }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
  }
}
