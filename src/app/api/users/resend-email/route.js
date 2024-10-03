import prisma from "@/lib/db/prisma";
import VerificationTemplate from '@/root/emails/verification-template'
import * as React from 'react'
import { sendEmail } from '@/lib/auth/email-actions'
import { NextResponse } from "next/server";

export const GET = async (req ) => {
	const email = req.nextUrl.searchParams.get('email');
  if(!email) {
    return NextResponse.json({ error : "Please provide an email (try signing in before visiting this page)" }, { status: 400 });
  } else {
	  const user = await prisma.user.findUnique({
	    where : { email : email },
	    select : {
				name : true,
	      verification_key : true
	    }
	  });
		if(!user) {
	    return NextResponse.json({ error : "No user found with this email. Try signing up again." }, { status: 400 });
		} else {
			await sendEmail({
				 to: email,
				 subject: 'Verify your email address',
				 react: React.createElement(VerificationTemplate, { username: user.name, verification_key : user.verification_key }),
			})
	    return NextResponse.json({ user });
		}
  }
}
