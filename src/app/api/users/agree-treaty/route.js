import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export const GET = async (req ) => {
	const user_id = req.nextUrl.searchParams.get('id');
	const agree = req.nextUrl.searchParams.get('agree');
  if(!user_id) {
    return NextResponse.json({ error : "Your user ID was not sent correctly. Please reload and try again." }, { status: 400 });
  } else {
		const user = await prisma.user.update({
			where : { id : parseInt(user_id) },
			data : {
				agreed_treaty : agree && agree === 'true' ? true : false
			}
		});
		return NextResponse.json({ user });
  }
}
