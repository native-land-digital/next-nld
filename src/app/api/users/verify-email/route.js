import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export const GET = async (req ) => {
	const email = req.nextUrl.searchParams.get('email');
	const verificationKey = req.nextUrl.searchParams.get('key');
  if(!verificationKey || !email) {
    return NextResponse.json({ error : "Please provide an email and verification key" }, { status: 400 });
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
			if(verificationKey === user.verification_key) {
				const user = await prisma.user.update({
					where : { email : email },
					data : {
						email_verified : true
					}
				});
				return NextResponse.json({ user });
			} else {
				return NextResponse.json({ error : "Verification keys do not match." }, { status: 400 });
			}
		}
  }
}
