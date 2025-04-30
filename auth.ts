// @ts-nocheck
import { db } from '@/lib/db/kysely'
import { jsonArrayFrom } from 'kysely/helpers/postgres'
import NextAuth, { getServerSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import type { NextAuthOptions } from "next-auth";
import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"

import { authConfig } from '@/root/auth.config';
import { hashPassword } from '@/lib/auth/utils';

interface User {
  id: string | number;
}

interface Session {
  user: User;
}

async function getUser(email: string): Promise<User | undefined> {
  try {

    const user = await db.selectFrom('User')
      .where('User.email', '=', email)
      .select((eb) => [
        'User.id', 'User.name', 'User.email', 'User.email_verified', 'User.password',
        jsonArrayFrom(
          eb.selectFrom('GlobalPermission')
            .leftJoin('PermissionAction', 'GlobalPermission.actionId', 'PermissionAction.id')
            .leftJoin('PermissionEntity', 'GlobalPermission.entityId', 'PermissionEntity.id')
            .select(['PermissionAction.name as action', 'GlobalPermission.columnNames', 'PermissionEntity.name as entity'])
            .whereRef('GlobalPermission.userId', '=', 'User.id')
        ).as('global_permissions'),
        jsonArrayFrom(
          eb.selectFrom('ItemPermission')
            .leftJoin('PermissionAction', 'ItemPermission.actionId', 'PermissionAction.id')
            .leftJoin('PermissionEntity', 'ItemPermission.entityId', 'PermissionEntity.id')
            .select(['PermissionAction.name as action', 'ItemPermission.columnNames', 'ItemPermission.entryId as entry', 'ItemPermission.userId as user', 'PermissionEntity.name as entity'])
            .whereRef('ItemPermission.userId', '=', 'User.id')
        ).as('item_permissions'),
      ])
      .executeTakeFirst()

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
              if(!user.email_verified) {
                throw new Error(`Email requires verification, visit <a href="/auth/verify-email?email=${email}">the email verification page here</a>`);
              }
              delete user.password;
              return user;
            } else {
              throw new Error('Password incorrect');
            }
          } else {
            throw new Error('User not found');
          }
        } else {
          throw new Error('Parsing error. Please make sure your email and password are entered correctly.');
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
