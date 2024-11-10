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
    if(token) {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }
  return NextResponse.next()
}

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      if(!token) {
        return false;
      }
      // Returns user to signin if they try to access an unauthorized route
      if (path.startsWith("/dashboard/api")) {
        if(!token.global_permissions.find(perm => perm.entity === "api") && !token.item_permissions.find(perm => perm.entity === "api")) {
          return false;
        }
      }
      if (path.startsWith("/dashboard/users")) {
        if(!token.global_permissions.find(perm => perm.entity === "users") && !token.item_permissions.find(perm => perm.entity === "users")) {
          return false;
        }
      }
      if (path.startsWith("/dashboard/research")) {
        if(!token.global_permissions.find(perm => perm.entity === "research") && !token.item_permissions.find(perm => perm.entity === "research")) {
          return false;
        }
      }
      if (path.startsWith("/dashboard/mapbox")) {
        if(!token.global_permissions.find(perm => perm.entity === "mapbox") && !token.item_permissions.find(perm => perm.entity === "mapbox")) {
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
