import { db } from '@/lib/db/kysely'
import jwt from 'jsonwebtoken';
import ResetPassword from '@/root/emails/reset-password-template'
import * as React from 'react'
import { sendEmail } from '@/lib/auth/email-actions'
import { NextResponse } from "next/server";
import { hashPassword } from '@/lib/auth/utils';

export const GET = async (req ) => {
	const email = req.nextUrl.searchParams.get('email');
  if(!email) {
    return NextResponse.json({ error : "Please provide an email" }, { status: 400 });
  } else {

		const user = await db.selectFrom('User')
			.where('email', '=', email)
			.select(['id', 'name', 'verification_key'])
			.executeTakeFirst()

		if(!user) {
	    return NextResponse.json({ error : "No user found with this email. Try signing up again." }, { status: 400 });
		} else {
			const token = jwt.sign({ userId: user.id }, process.env.NEXTAUTH_SECRET, { expiresIn: '1h'})
			await sendEmail({
				 to: email,
				 subject: 'Reset your password',
				 react: React.createElement(ResetPassword, { token: token }),
			})
	    return NextResponse.json({ user });
		}
  }
}

export const POST = async (req) => {
	const body = await req.json();
  if(!body.token || !body.password) {
    return NextResponse.json({ error : "Please provide a token and a password" }, { status: 400 });
  } else {
		if(body.password.length < 4) {
	    return NextResponse.json({ error : "Make sure your password is longer than 4 characters" }, { status: 400 });
		} else {
    	const { userId } = jwt.verify(body.token, process.env.NEXTAUTH_SECRET)

			const user = await db.selectFrom('User')
				.where('id', '=', parseInt(userId))
				.select(['id'])
				.executeTakeFirst()

			if(!user) {
		    return NextResponse.json({ error : "Token not valid. Please try again." }, { status: 400 });
			} else {

				await db.updateTable('User')
					.set({
						password : hashPassword(body.password)
					})
					.where('id', '=', parseInt(userId))
					.execute()

		    return NextResponse.json({ user });
			}
		}
  }
}
