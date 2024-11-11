import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import { submitRevalidation } from '@/lib/actions'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const GET = async (req, route) => {
  const { id: entryId } = route.params;
	const secret = req.nextUrl.searchParams.get('secret');

  if(secret === process.env.MOBILE_APP_SECRET) {
  	try {

      const entry = await db.selectFrom('Entry')
        .where('id', '=', parseInt(entryId))
        .where('published', '=', true)
        .leftJoin('Polygon', 'Polygon.entryId', 'Entry.id')
        .select((eb) => [
          'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug',
          eb.fn('ST_AsGeoJSON', 'Polygon.geometry').as('geometry'),
          jsonArrayFrom(
            eb.selectFrom('Media')
              .select(['url', 'caption', 'title'])
              .whereRef('Media.entryId', '=', 'Entry.id')
          ).as('media'),
          jsonArrayFrom(
            eb.selectFrom('Website')
              .select(['url', 'title'])
              .whereRef('Website.entryId', '=', 'Entry.id')
          ).as('websites'),
          jsonArrayFrom(
            eb.selectFrom('Relation')
              .innerJoin('Entry as RelatedEntry', 'RelatedEntry.id', 'Relation.relatedFromId')
              .select([
                'Relation.description as description',
                'RelatedEntry.name as name', 'RelatedEntry.category as category', 'RelatedEntry.slug as slug'
              ])
              .whereRef('Relation.relatedToId', '=', 'Entry.id')
          ).as('relatedFrom'),
          jsonArrayFrom(
            eb.selectFrom('Relation')
              .innerJoin('Entry as RelatedEntry', 'RelatedEntry.id', 'Relation.relatedToId')
              .select([
                'Relation.description as description',
                'RelatedEntry.name as name', 'RelatedEntry.category as category', 'RelatedEntry.slug as slug'
              ])
              .whereRef('Relation.relatedFromId', '=', 'Entry.id')
          ).as('relatedTo')
        ])
        .executeTakeFirst()

      if(entry) {
        if(entry.geometry) {
          entry.geometry = JSON.parse(entry.geometry)
        }
      } else {
        return NextResponse.json({ error : `Entry not found` }, { status: 500 });
      }

      return NextResponse.json({ entry });

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

		const body = await req.json();
		const { id: entryId } = route.params;

		if(token.global_permissions.find(perm => perm.entity === "research")) {

  		try {
  			if(body.geometry && body.geometry !== "null") {
  				const featureGeometry = body.geometry;

          await db.transaction().execute(async (trx) => {

            // Update polygon or insert new
            await trx.insertInto(body.geometry_type)
              .values({
                geometry: sql`ST_GeomFromGeoJSON(${featureGeometry})`,
                entryId : parseInt(entryId),
              })
              .onConflict((oc) => oc
                .column('entryId')
                .doUpdateSet({
                  geometry: sql`ST_GeomFromGeoJSON(${featureGeometry})`,
                })
              )
              .execute();
            delete body.geometry;
            delete body.geometry_type;

            // Deleting, updating, adding websites
      			const websites = body.websites;
            const updatedWebsiteIds = websites.map(website => { return website.id; });
            if(updatedWebsiteIds.length > 0) {
              await trx.deleteFrom('Website')
                .where('entryId', '=', parseInt(entryId))
                .where('id', 'not in', updatedWebsiteIds)
                .execute();
            } else {
              await trx.deleteFrom('Website')
                .where('entryId', '=', parseInt(entryId))
                .execute();
            }

            for (const website of websites) {
              if (website.id) {
                await trx.updateTable('Website')
                  .set({
                    url: website.url,
                    title: website.title,
                  })
                  .where('id', '=', website.id)
                  .execute();
              }
            }

            const newWebsites = websites.filter(website => !website.id);
            if (newWebsites.length > 0) {
              await trx.insertInto('Website')
                .values(
                  newWebsites.map(website => ({
                    entryId : parseInt(entryId),
                    url: website.url,
                    title: website.title,
                  }))
                )
                .execute();
            }
            delete body.websites;

            // Deleting, updating, adding changelog
      			const changelog = body.changelog;
            const updatedChangelogIds = changelog.map(change => change.id);
            if(updatedChangelogIds.length > 0) {
              await trx.deleteFrom('Change')
                .where('entryId', '=', parseInt(entryId))
                .where('id', 'not in', updatedChangelogIds)
                .execute();
            } else {
              await trx.deleteFrom('Change')
                .where('entryId', '=', parseInt(entryId))
                .execute();
            }

            for (const change of changelog) {
              if (change.id) {
                await trx.updateTable('Change')
                  .set({
                    description: change.description,
                    createdAt: new Date(change.createdAt),
                  })
                  .where('id', '=', change.id)
                  .execute();
              }
            }

            const newChangelogs = changelog.filter(change => !change.id);
            if (newChangelogs.length > 0) {
              await trx.insertInto('Change')
                .values(
                  newChangelogs.map(change => ({
                    entryId : parseInt(entryId),
                    description: change.description,
                    createdAt: new Date(change.createdAt),
                  }))
                )
                .execute();
            }
            delete body.changelog;

            // Deleting, updating, adding greetings
      			const greetings = body.greetings;
            if(greetings) {
              const updatedGreetingIds = greetings.map(greeting => greeting.id);
              if(updatedGreetingIds.length > 0) {
                await trx.deleteFrom('Greeting')
                  .where('entryId', '=', entryId)
                  .where('id', 'not in', updatedGreetingIds)
                  .execute();
              } else {
                await trx.deleteFrom('Greeting')
                  .where('entryId', '=', entryId)
                  .execute();
              }

              for (const greeting of greetings) {
                if (greeting.id) {
                  await trx.updateTable('Greeting')
                    .set({
                      url : greeting.url,
                      text : greeting.text,
                      usage : greeting.usage,
                      translation : greeting.translation,
                      parentId : greeting.parentId
                    })
                    .where('id', '=', greeting.id)
                    .execute();
                }
              }

              const newGreetings = greetings.filter(greeting => !greeting.id);
              if (newGreetings.length > 0) {
                await trx.insertInto('Greeting')
                  .values(
                    newGreetings.map(greeting => ({
                      entryId : parseInt(entryId),
                      url : greeting.url,
                      text : greeting.text,
                      usage : greeting.usage,
                      translation : greeting.translation,
                      parentId : greeting.parentId
                    }))
                  )
                  .execute();
              }
              delete body.greetings;
            }

            // Deleting, updating, adding media
      			const media = body.media;
            const updatedMediaIds = media.map(thisMedia => thisMedia.id);
            if(updatedMediaIds.length > 0) {
              await trx.deleteFrom('Media')
                .where('entryId', '=', entryId)
                .where('id', 'not in', updatedMediaIds)
                .execute();
            } else {
              await trx.deleteFrom('Media')
                .where('entryId', '=', entryId)
                .execute();
            }

            for (const thisMedia of media) {
              if (thisMedia.id) {
                await trx.updateTable('Media')
                  .set({
                    url : thisMedia.url,
                    caption : thisMedia.caption,
                    title : thisMedia.title
                  })
                  .where('id', '=', thisMedia.id)
                  .execute();
              }
            }

            const newMedia = media.filter(thisMedia => !thisMedia.id);
            if (newMedia.length > 0) {
              await trx.insertInto('Media')
                .values(
                  newMedia.map(thisMedia => ({
                    entryId : parseInt(entryId),
                    url : thisMedia.url,
                    caption : thisMedia.caption,
                    title : thisMedia.title
                  }))
                )
                .execute();
            }
            delete body.media;

            // Deleting, updating, adding relations
      			const relatedTo = body.relatedTo;
            const updatedRelatedIds = relatedTo.map(thisRelation => thisRelation.id);
            if(updatedRelatedIds.length > 0) {
              await trx.deleteFrom('Relation')
                .where('relatedFromId', '=', entryId)
                .where('id', 'not in', updatedRelatedIds)
                .execute();
            } else {
              await trx.deleteFrom('Relation')
                .where('relatedFromId', '=', entryId)
                .execute();
            }

            for (const thisRelation of relatedTo) {
              if (thisRelation.id) {
                await trx.updateTable('Relation')
                  .set({
        						description : thisRelation.description,
        						relatedToId : thisRelation.relatedToId
                  })
                  .where('id', '=', thisRelation.id)
                  .execute();
              }
            }

            const newRelations = relatedTo.filter(thisRelation => !thisRelation.id);
            if (newRelations.length > 0) {
              await trx.insertInto('Relation')
                .values(
                  newRelations.map(thisRelation => ({
                    relatedFromId : parseInt(entryId),
        						description : thisRelation.description,
        						relatedToId : thisRelation.relatedToId
                  }))
                )
                .execute();
            }
            delete body.relatedTo;

            // The rest of stuff updated flexibly
            body.updatedAt = new Date();
            await trx.updateTable('Entry')
              .set(body)
              .where('id', '=', parseInt(entryId))
              .execute();

          });

          // Return full modified entry
          const entry = await db.selectFrom('Entry')
            .where('Entry.id', '=', parseInt(entryId))
            .leftJoin('Polygon', 'Polygon.entryId', 'Entry.id')
            .select((eb) => [
              'Entry.id', 'Entry.name', 'Entry.category', 'Entry.slug', 'Entry.color', 'Entry.published', 'Entry.sources', 'Entry.disclaimer', 'Entry.pronunciation', 'Entry.createdAt', 'Entry.updatedAt',
              eb.fn('ST_AsGeoJSON', 'Polygon.geometry').as('geometry'),
              jsonArrayFrom(
                eb.selectFrom('Greeting')
                  .select(['id', 'url', 'text', 'translation', 'usage', 'parentId'])
                  .whereRef('Greeting.entryId', '=', 'Entry.id')
              ).as('greetings'),
              jsonArrayFrom(
                eb.selectFrom('Media')
                  .select(['id', 'url', 'caption', 'title'])
                  .whereRef('Media.entryId', '=', 'Entry.id')
              ).as('media'),
              jsonArrayFrom(
                eb.selectFrom('Website')
                  .select(['id', 'url', 'title'])
                  .whereRef('Website.entryId', '=', 'Entry.id')
              ).as('websites'),
              jsonArrayFrom(
                eb.selectFrom('Change')
                  .select(['id', 'createdAt', 'description'])
                  .whereRef('Change.entryId', '=', 'Entry.id')
              ).as('changelog'),
              jsonArrayFrom(
                eb.selectFrom('Relation')
                  .innerJoin('Entry as RelatedEntry', 'RelatedEntry.id', 'Relation.relatedToId')
                  .select([
                    'Relation.id as id', 'Relation.description as description',
                    'RelatedEntry.id as relatedToId', 'RelatedEntry.name as name', 'RelatedEntry.category as category', 'RelatedEntry.slug as slug'
                  ])
                  .whereRef('Relation.relatedFromId', '=', 'Entry.id')
              ).as('relatedTo')
            ])
            .executeTakeFirst()

          // Ensure associated paths are now invalidated for next load
          submitRevalidation(`/dashboard/research`);
          submitRevalidation(`/dashboard/research/${entryId}`);
          submitRevalidation(`/maps/${entry.category}/${encodeURIComponent(entry.slug).toLowerCase()}`);

    			return NextResponse.json({ entry });

  			} else {
    			return NextResponse.json({ error : `The geometry should not be null or undefined.` }, { status: 400 });
        }
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

		if(token.global_permissions.find(perm => perm.entity === "research")) {
  		const { id: entryId } = route.params;

  		try {

        const entry = await db.deleteFrom('Entry')
          .where('id', '=', Number(entryId))
          .execute();

  			return NextResponse.json({ entry });
  		} catch (error) {
  			console.error(error);

  			return NextResponse.json({ error : "Something went wrong deleting the entry" }, { status: 500 });
  		}
  	} else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  	}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
	}
}
