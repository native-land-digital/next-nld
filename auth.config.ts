import type { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/db/prisma";

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('here error')
      if(user?.error) {
         throw new Error(user.error)
      }
      return true
    },
    async session({ session, user, token }) {
      if(session.user) {
        return {
          user : {
            name : session.user.name,
            role : token.role
          }
        }
      }
      return token;
    },
    async jwt({ token, user }) {
      if(user) {
        token.role = user.role;
      }
      return token;
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    encryption: true,
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [],
} satisfies NextAuthConfig;
