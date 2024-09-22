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
			try {
				let geometryAsString = JSON.stringify(featureGeometry);
				await prisma.$executeRawUnsafe(`
			    UPDATE "Polygon"
					SET geometry = ST_GeomFromGeoJSON('${geometryAsString}')
			    WHERE id = ${Number(polygonId)}
			  `)
			} catch(error) {
				console.error(error)
				return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
			}
		} else if(body.geometry === "null") {
			await prisma.$executeRawUnsafe(`
				UPDATE "Polygon"
				SET geometry = NULL
				WHERE id = ${Number(polygonId)}
			`)
		}
		delete body.geometry;
		// Formatting queries
		// Not the most efficient in the world, but it works
		// Prevents having to find which ones exist on the data and then delete, update, create etc
		// To be revised later
		// Should only be sent if anything actually changed, really. Well, it's inefficient, so what?
		let websites = body.websites;
		body.websites = {
			deleteMany : {},
			createMany : {
				data : websites.map(website => { return { url : website.url, title : website.title }})
			}
		}
		let changelog = body.changelog;
		body.changelog = {
			deleteMany : {},
			createMany : {
				data : changelog.map(change => { return { createdAt : new Date(change.createdAt), description : change.description }})
			}
		}
		let media = body.media;
		body.media = {
			deleteMany : {},
			createMany : {
				data : media.map(thisMedia => { return { url : thisMedia.url }})
			}
		}
		let relatedTo = body.relatedTo;
		body.relatedTo = {
			deleteMany : {},
			createMany : {
				data : relatedTo.map(thisRelation => { return {
					description : thisRelation.description,
					relatedToId : thisRelation.relatedToId
				}})
			}
		}

		const polygon = await prisma.polygon.update({
			where: { id: parseInt(polygonId) },
			data: { ...body },
		});

		return NextResponse.json({ polygon });
	} catch (error) {
		console.error(error);

		return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
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

		return NextResponse.json({ error : "Something went wrong deleting the polygon" }, { status: 500 });
	}
}
