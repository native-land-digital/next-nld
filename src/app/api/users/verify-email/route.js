import { db } from '@/lib/db/kysely'
import { NextResponse } from "next/server";

export const GET = async (req ) => {
	const email = req.nextUrl.searchParams.get('email');
	const verificationKey = req.nextUrl.searchParams.get('key');
  if(!verificationKey || !email) {
    return NextResponse.json({ error : "Please provide an email and verification key" }, { status: 400 });
  } else {

		const user = await db.selectFrom('User')
			.where('email', '=', email)
			.select(['name', 'verification_key'])
			.executeTakeFirst()

		if(!user) {
			return NextResponse.json({ error : "No user found with this email. Try signing up again." }, { status: 400 });
		} else {
			if(verificationKey === user.verification_key) {

				await db.updateTable('User')
					.set({
						email_verified : true,
					})
					.where('email', '=', email)
					.execute()

				return NextResponse.json({ user });
			} else {
				return NextResponse.json({ error : "Verification keys do not match." }, { status: 400 });
			}
		}
  }
}
