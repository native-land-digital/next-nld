import prisma from "@/lib/db/prisma";
import { submitRevalidation } from '@/lib/actions'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const GET = async (req, route) => {
  const { id: polygonId } = route.params;
	const secret = req.nextUrl.searchParams.get('secret');

  if(secret === process.env.MOBILE_APP_SECRET) {
  	try {
      const polygonShape = await prisma.$queryRaw`
        SELECT ST_AsGeoJSON(geometry) FROM "Polygon"
        WHERE id = ${parseInt(polygonId)}
      `
      const polygon = await prisma.polygon.findUnique({
        where : {
          id : parseInt(polygonId),
          published : true
        },
        select : {
          id : true,
          name : true,
          category : true,
          slug : true,
          media : true,
          websites : true,
          relatedFrom : {
            select : {
              relatedTo : true,
              relatedFrom : true,
              description : true
            }
          },
          relatedTo : {
            select : {
              relatedTo : {
                select : {
                  id : true,
                  name : true,
                  category : true,
                  slug : true
                }
              },
              relatedFrom : {
                select : {
                  id : true,
                  name : true,
                  category : true,
                  slug : true
                }
              },
              description : true
            }
          }
        }
      });

      if(polygon) {
        polygon.geometry = null;
        if(polygonShape && polygonShape[0] && polygonShape[0].st_asgeojson) {
          polygon.geometry = JSON.parse(polygonShape[0].st_asgeojson)
        }
      } else {
        return NextResponse.json({ error : `Polygon not found` }, { status: 500 });
      }

      return NextResponse.json({ polygon });

    } catch (error) {
      console.error(error);
      return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `This is an endpoint only meant for the mobile app.` }, { status: 500 });
  }
}

export const PATCH = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {
		const user = await prisma.user.findUnique({
			where : { id : parseInt(token.id) },
			select : {
				permissions : true
			}
		});
		if(user.permissions.includes('research')) {

  		const body = await req.json();
  		const { id: polygonId } = route.params;

  		try {
  			if(body.geometry && body.geometry !== "null") {
  				const featureGeometry = body.geometry;
  				try {
  					const geometryAsString = JSON.stringify(featureGeometry);
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
  			const websites = body.websites;
  			body.websites = {
  				deleteMany : {},
  				createMany : {
  					data : websites.map(website => { return { url : website.url, title : website.title }})
  				}
  			}
  			const changelog = body.changelog;
  			body.changelog = {
  				deleteMany : {},
  				createMany : {
  					data : changelog.map(change => { return { createdAt : new Date(change.createdAt), description : change.description }})
  				}
  			}
  			const media = body.media;
  			body.media = {
  				deleteMany : {},
  				createMany : {
  					data : media.map(thisMedia => { return { url : thisMedia.url, caption : thisMedia.caption, title : thisMedia.title }})
  				}
  			}
  			const relatedTo = body.relatedTo;
  			body.relatedTo = {
  				deleteMany : {},
  				createMany : {
  					data : relatedTo.map(thisRelation => { return {
  						description : thisRelation.description,
  						relatedToId : thisRelation.relatedToId
  					}})
  				}
  			}

  			await prisma.polygon.update({
  				where: { id: parseInt(polygonId) },
  				data: { ...body },
  			});

  			const polygon = await prisma.polygon.findUnique({
    			where : { id : parseInt(polygonId) },
    			select : {
    				category : true,
            slug : true
    			}
    		});

        // Ensure associated paths are now invalidated for next load
        submitRevalidation(`/dashboard/research`);
        submitRevalidation(`/dashboard/research/${polygonId}`);
        submitRevalidation(`/maps/${polygon.category}/${encodeURIComponent(polygon.slug).toLowerCase()}`);

  			return NextResponse.json({ polygon });
  		} catch (error) {
  			console.error(error);

  			return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
  		}
  	} else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  	}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
	}
}

export const DELETE = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {
		const user = await prisma.user.findUnique({
			where : { id : parseInt(token.id) },
			select : {
				permissions : true
			}
		});
		if(user.permissions.includes('research')) {
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
  	} else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  	}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
	}
}
