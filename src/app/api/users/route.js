import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";
import VerificationTemplate from '@/root/emails/verification-template'
import * as React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from '@/lib/auth/email-actions'
import { hashPassword } from '@/lib/auth/utils';

export const POST = async (req) => {

		const body = await req.json();

		if (!body.name) {
			return NextResponse.json({ error : "Please provide a name" }, { status: 400 });
		}
		if (!body.email || body.email.length < 4) {
			return NextResponse.json({ error : "Please provide an email at least 4 characters long" }, { status: 400 });
		}
		if (!body.password) {
			return NextResponse.json({ error : "Please provide a password" }, { status: 400 });
		}

		try {

	    const userExists = await db.selectFrom('User')
	      .where('email', '=', body.email)
	      .select(['id'])
	      .executeTakeFirst()

			if(userExists) {
				return NextResponse.json({ error : "An account with this email already exists" }, { status: 400 });
			} else {

				const verification_key = uuidv4()

			  const permissionActions = await db.selectFrom('PermissionAction').select(['id', 'name']).execute();
			  const permissionEntities = await db.selectFrom('PermissionEntity').select(['id', 'name']).execute();

				const basicEntities = permissionEntities.filter(perm => perm.name === 'api' || perm.name === 'profile');
				const basicAction = permissionActions.find(perm => perm.name === 'update');

				let createdUser = false;

				await db.transaction().execute(async (trx) => {

					createdUser = await db.insertInto('User')
						.values({
							email: body.email,
							name: body.name,
							organization : body.organization,
							verification_key : verification_key,
							password: hashPassword(body.password)
						})
						.returningAll()
						.execute()

					if(createdUser) {
	          for (const entity of basicEntities) {
							await trx.insertInto('GlobalPermission')
								.values({
									actionId: basicAction.id,
									entityId: entity.id,
									userId : createdUser[0].id
								})
								.execute();
						}
					}

				})

				if(createdUser) {
					await sendEmail({
					   to: body.email,
					   subject: 'Verify your email address',
					   react: React.createElement(VerificationTemplate, { email: body.email, verification_key : verification_key }),
				  })
					return NextResponse.json({
						id : createdUser[0].id
					});
				} else {
					return NextResponse.json({ error : `Something went wrong.` }, { status: 500 });
				}
			}
		} catch (error) {
			console.error(error);
			return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
		}
}
