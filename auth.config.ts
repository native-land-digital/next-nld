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
            global_permissions : token.global_permissions,
            item_permissions : token.item_permissions
          }
        }
      }
      return token;
    },
    async jwt({ token, user }) {
      if(user) {
        token.id = user.id;
        token.global_permissions = user.global_permissions;
        token.item_permissions = user.item_permissions;
      }
      return token;
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
    updateAge: 10 * 60
  },
  providers: [],
} satisfies NextAuthConfig;
