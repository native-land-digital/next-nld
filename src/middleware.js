import { NextResponse } from 'next/server'
import { withAuth } from "next-auth/middleware"
import { getToken } from "next-auth/jwt";
import { chain } from "@nimpl/middleware-chain";

import { hasResearchPermission } from '@/lib/auth/permissions'

const redirectMiddleware = async (req) => {
  const path = req.nextUrl.pathname;
  const token = await getToken({ req })
  // Redirects user to dashboard if they are already logged in
  if(path.startsWith('/auth/login') || path.startsWith('/auth/signup') || path.startsWith('/auth/reset-password') || path.startsWith('/auth/verify-email')) {
    if(token && token.permissions.includes('profile')) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }
  return NextResponse.next()
}

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      // Returns user to signin if they try to access an unauthorized route
      if (path.startsWith("/dashboard/api")) {
        if(!token?.permissions.includes("api")) {
          return false;
        }
      }
      if (path.startsWith("/dashboard/users")) {
        if(!token?.permissions.includes("manage_users")) {
          return false;
        }
      }
      if (path.startsWith("/dashboard/research")) {
        if(!hasResearchPermission(token?.permissions)) {
          return false;
        }
      }
      if (path.startsWith("/dashboard/mapbox")) {
        if(!token?.permissions.includes("update_mapbox")) {
          return false;
        }
      }
      return token !== null;
    }
  }
})

export default chain([
  [redirectMiddleware, { include : /^\/auth(\/.*)?$/ }],
  [authMiddleware, { include : /^\/dashboard(\/.*)?$/ }]
], {
  logger : null
});

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
};
