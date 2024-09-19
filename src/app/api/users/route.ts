import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

	if (!body.email) {
		return NextResponse.json("Please provide an email", { status: 400 });
	}

	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				name: body.name,
			}
		});
		return NextResponse.json({ user });
	} catch (error) {
		console.error(error);
		return NextResponse.json("Something went wrong creating the user", { status: 500 });
	}
}
