import prisma from "@/lib/db/prisma";
import { Polygon } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type UpdatePolygonReqBody = Partial<Omit<Polygon, "id">>;

export const PATCH = async (req: NextRequest, route: { params: { id: string }}) => {
	const body: UpdatePolygonReqBody = await req.json();
	const { id: polygonId } = route.params;

	try {
		if(body.geometry && body.geometry !== "null") {
			let featureGeometry = body.geometry;
			delete body.geometry;
			try {
				let geometryAsString = JSON.stringify(featureGeometry);
				await prisma.$executeRawUnsafe(`
			    UPDATE "Polygon"
					SET geometry = ST_GeomFromGeoJSON('${geometryAsString}')
			    WHERE id = ${Number(polygonId)}
			  `)
			} catch(error) {
				console.error(error)
				return NextResponse.json(`Something went wrong. Here is the error message: ${JSON.stringify(error)}`, { status: 500 });
			}
		} else if(body.geometry === "null") {
			delete body.geometry;
			await prisma.$executeRawUnsafe(`
				UPDATE "Polygon"
				SET geometry = NULL
				WHERE id = ${Number(polygonId)}
			`)
		}
		const polygon = await prisma.polygon.update({
			where: { id: parseInt(polygonId) },
			data: { ...body }
		});

		return NextResponse.json({ polygon });
	} catch (error) {
		console.error(error);

		return NextResponse.json(`Something went wrong. Here is the error message: ${JSON.stringify(error)}`, { status: 500 });
	}
}

export const DELETE = async (req: NextRequest, route: { params: { id: string }}) => {
	const { id: polygonId } = route.params;

	try {
		const polygon = await prisma.polygon.delete({
			where: { id: parseInt(polygonId) },
		});

		return NextResponse.json({ polygon });
	} catch (error) {
		console.error(error);

		return NextResponse.json("Something went wrong deleting the polygon", { status: 500 });
	}
}
