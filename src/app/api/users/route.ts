import { NextRequest, NextResponse } from "next/server";

import { hashPassword } from '@/lib/auth/utils';
import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";

type CreateUserReqBody = Omit<User, "id">;

export const GET = async (req: NextRequest) => {
	try {
		const users = await prisma.user.findMany();

		return NextResponse.json({ users });
	} catch (error) {
		console.error(error);

		return NextResponse.json("Something went wrong finding users", { status: 500 });
	}
}

export const POST = async (req: NextRequest) => {
	const body: CreateUserReqBody = await req.json();

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
		const user = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
				organization : body.organization,
				password: hashPassword(body.password)
			}
		});
		return NextResponse.json({
			id : user.id
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
	}
}
