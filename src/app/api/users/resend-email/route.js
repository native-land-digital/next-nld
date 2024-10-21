import { db } from '@/lib/db/kysely'
import VerificationTemplate from '@/root/emails/verification-template'
import * as React from 'react'
import { sendEmail } from '@/lib/auth/email-actions'
import { NextResponse } from "next/server";

export const GET = async (req ) => {
	const email = req.nextUrl.searchParams.get('email');
  if(!email) {
    return NextResponse.json({ error : "Please provide an email (try signing in before visiting this page)" }, { status: 400 });
  } else {

		const user = await db.selectFrom('User')
			.where('email', '=', email)
			.select(['id', 'name', 'verification_key'])
			.executeTakeFirst()

		if(!user) {
	    return NextResponse.json({ error : "No user found with this email. Try signing up again." }, { status: 400 });
		} else {
			await sendEmail({
				 to: email,
				 subject: 'Verify your email address',
				 react: React.createElement(VerificationTemplate, { email: email, verification_key : user.verification_key }),
			})
	    return NextResponse.json({ user });
		}
  }
}
