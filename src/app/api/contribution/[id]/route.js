import { db } from '@/lib/db/kysely'
import { sql } from 'kysely';
import { jsonObjectFrom, jsonArrayFrom } from 'kysely/helpers/postgres'
import { submitRevalidation } from '@/lib/actions'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"

export const PATCH = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {

		const body = await req.json();
		const { id: contributionId } = route.params;

		if(token.global_permissions.find(perm => perm.entity === "contributions") || token.item_permissions.find(perm => perm.entity === "contributions")) {

      if(token.item_permissions.find(perm => perm.entity === "contributions")) {
        const allowedContributionIDs = token.item_permissions.filter(perm => perm.entity === "contributions").map(perm => perm.entry);
        if(allowedContributionIDs.indexOf(parseInt(contributionId)) === -1) {
          return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
        }
      }

  		try {

        await db.transaction().execute(async (trx) => {

          const categories = body.categories;
          await trx.deleteFrom('CategoriesOnContributions')
            .where('contributionId', '=', Number(contributionId))
            .execute();
          if(categories.length > 0) {
            for(const category of categories) {
              await trx.insertInto('CategoriesOnContributions')
                .values({
                  contributionId : parseInt(contributionId),
                  categoryId: category
                })
                .execute();
            }
          }
          delete body.categories;

          const entries = body.entries;
          await trx.deleteFrom('EntriesOnContributions')
            .where('contributionId', '=', Number(contributionId))
            .execute();
          if(entries.length > 0) {
            for(const entry of entries) {
              console.log(entry.id)
              await trx.insertInto('EntriesOnContributions')
                .values({
                  contributionId : parseInt(contributionId),
                  entryId: entry.id
                })
                .execute();
            }
          }
          delete body.entries;

          // The rest of stuff updated flexibly
          await trx.updateTable('Contribution')
            .set(body)
            .where('id', '=', parseInt(contributionId))
            .execute();

        });

        // Return full modified entry
        const entry = await db.selectFrom('Contribution')
          .where('Contribution.id', '=', parseInt(contributionId))
          .select((eb) => [
            'Contribution.id', 'Contribution.name'
          ])
          .executeTakeFirst()

        // Ensure associated paths are now invalidated for next load
        submitRevalidation(`/dashboard/contributions`);
        submitRevalidation(`/dashboard/contributions/${contributionId}`);
        const result = submitRevalidation(`/contributions/${contributionId}`);
        submitRevalidation(`/en/contributions/${contributionId}`);

        return NextResponse.json({ entry });

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

		if(token.global_permissions.find(perm => perm.entity === "contributions")) {
  		const { id: contributionId } = route.params;

      console.log(contributionId)

  		try {

        await db.deleteFrom('Contribution')
          .where('id', '=', Number(contributionId))
          .execute();

  			return NextResponse.json({ contributionId });
  		} catch (error) {
  			console.error(error);

  			return NextResponse.json({ error : "Something went wrong deleting the contribution" }, { status: 500 });
  		}
  	} else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  	}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
	}
}
