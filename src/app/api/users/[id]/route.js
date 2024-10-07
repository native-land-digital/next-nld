import prisma from "@/lib/db/prisma";
import { submitRevalidation } from '@/lib/actions'
import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server";

export const PATCH = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {
		const user = await prisma.user.findUnique({
			where : { id : parseInt(token.id) },
			select : {
				permissions : true
			}
		});

    const { id: userId } = route.params;

		if(user.permissions.includes('manage_users') || parseInt(userId) === token.id) {
  		const body = await req.json();

  		try {

        if(body.permissions) {
          if(!token.permissions.includes('manage_users')) {
            delete body.permissions;
            return NextResponse.json({ error : `You do not have permission to edit user permissions` }, { status: 500 });
          }
        }

  			const user = await prisma.user.update({
  				where: { id: parseInt(userId) },
  				data: { ...body }
  			});

        submitRevalidation(`/dashboard/users/${userId}`);

  			return NextResponse.json({ user });
  		} catch (error) {
  			return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}`}, { status: 500 });
  		}
    } else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  }
}

export const DELETE = async (req, route) => {
  const token = await getToken({ req })

	if(token && token.id) {
		const user = await prisma.user.findUnique({
			where : { id : parseInt(token.id) },
			select : {
				permissions : true
			}
		});
  	if(user && user.permissions.includes('manage_users')) {
  		const { id: userId } = route.params;

  		try {
  			const user = await prisma.user.delete({
  				where: { id: parseInt(userId) },
  			});

  			return NextResponse.json({ user });
  		} catch (error) {
  			console.error(error);

  			return NextResponse.json({ error : `Something went wrong. Here is the error message: ${JSON.stringify(error)}` }, { status: 500 });
  		}
  	} else {
      return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
  	}
	} else {
    return NextResponse.json({ error : `You do not have permission to access this endpoint` }, { status: 500 });
	}
}
