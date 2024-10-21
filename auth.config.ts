// @ts-nocheck
import NextAuthConfig from "next-auth"

export const authConfig = {
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout'
  },
  callbacks: {
    async session({ session, user, token }) {
      if(session.user) {
        return {
          user : {
            id : token.id,
            name : session.user.name,
            permissions : token.permissions
          }
        }
      }
      return token;
    },
    async jwt({ token, user }) {
      if(user) {
        token.id = user.id;
        token.permissions = user.permissions;
      }
      return token;
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
    encryption: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  providers: [],
} satisfies NextAuthConfig;
