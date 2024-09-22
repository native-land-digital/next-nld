import prisma from "@/lib/db/prisma";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type UpdateUserReqBody = Partial<Omit<User, "id">>;

export const PATCH = async (req: NextRequest, route: { params: { id: string }}) => {
	const body: UpdateUserReqBody = await req.json();
	const { id: userId } = route.params;

	try {
		const user = await prisma.user.update({
			where: { id: parseInt(userId) },
			data: { ...body }
		});

		return NextResponse.json({ user });
	} catch (error) {
		console.error(error);

		return NextResponse.json(`Something went wrong. Here is the error message: ${JSON.stringify(error)}`, { status: 500 });
	}
}

export const DELETE = async (req: NextRequest, route: { params: { id: string }}) => {
	const { id: userId } = route.params;

	try {
		const user = await prisma.user.delete({
			where: { id: parseInt(userId) },
		});

		return NextResponse.json({ user });
	} catch (error) {
		console.error(error);

		return NextResponse.json(`Something went wrong. Here is the error message: ${JSON.stringify(error)}`, { status: 500 });
	}
}
