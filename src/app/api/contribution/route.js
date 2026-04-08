import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import ContributionTemplate from '@/root/emails/contribution-template'
import * as React from 'react'
import { sendEmail } from '@/lib/auth/email-actions'

export const POST = async (req) => {
  const token = await getToken({ req })

	if(token && token.id) {

		// if(token.global_permissions.find(perm => perm.entity === "contributions")) {
			const body = await req.json();

	  	if (!body.name) {
	  		return NextResponse.json({ error : "Please provide a name" }, { status: 400 });
      }

	  	try {
	      // Inserting into db
				const stage = await db.selectFrom('ContributionStage')
					.select(['id'])
					.where('name', "=", "Submitted")
					.executeTakeFirst();

        const existingContribution = await db.selectFrom("Contribution")
          .innerJoin("ContributionStage", "ContributionStage.id", "Contribution.stageId")
          .select(['Contribution.id'])
          .where('Contribution.authorId', '=', body.authorId)
          .where("ContributionStage.name", "=", "Submitted")
          .executeTakeFirst();

        if (existingContribution) {
          return NextResponse.json({ error : `You currently have a contribution awaiting approval. Please wait for it to be approved before submitting another.` }, { status: 400 });
        }

        const [contribution] = await db.insertInto('Contribution')
				  .values({
	  				name: body.name,
						stageId : stage.id,
						authorId : body.authorId
				  })
					.returningAll()
				  .execute()

        if (body.entryId) {
          await db.insertInto('EntriesOnContributions')
            .values({
              contributionId : contribution.id,
              entryId: parseInt(body.entryId)
            })
            .execute();
        }

        if (body.comment) {
          await db.insertInto('ContributionComment')
            .values({
              contributionId: contribution.id,
              createdAt: new Date(),
              updatedAt: new Date(),
  	  				comment: body.comment,
  						authorId : body.authorId
  				  })
  					.returningAll()
  				  .execute()
        }

        await sendEmail({
    			 to: "victor@native-land.ca",
    			 subject: 'New Contribution Created',
           react: React.createElement(ContributionTemplate, { comment: body.comment, contributionId : contribution.id }),
  			})

        return NextResponse.json({
	  			id : contribution.id
	  		});
	  	} catch (error) {
	  		console.error(error);
	  		return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
	  	}
		// } else {
	 //    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
		// }
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }
}
