import NextAuth, { getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import type { NextAuthOptions } from "next-auth";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"

import { authConfig } from '@/root/auth.config';
import { hashPassword } from '@/lib/auth/utils';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where : { email : email },
      select : {
        id : true,
        name : true,
        permissions : true,
        email : true,
        password : true
      }
    });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong logging in the user");
  }
}

export const authOptions = {
  ...authConfig,
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(4) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);

          if(user) {
            if(user && user.password === hashPassword(password)) {
              console.log(user)
              delete user.password;
              return user;
            } else {
              return { error: 'Password incorrect' };
            }
          } else {
            return { error: 'User not found' };
          }
        } else {
          return { error: 'Parsing error. Please make sure your email and password are entered correctly.' };
        }
      }
    }),
  ],
} satisfies NextAuthConfig;

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions)
}

declare module "next-auth" {
  interface User {
    id: string | number;
  }

  interface Session {
    user: User;
  }
}
