import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware"
import createMiddleware from 'next-intl/middleware';
import { chain } from "@nimpl/middleware-chain";
import { routing } from '@/i18n/routing';

const intlMiddleware = createMiddleware(routing);

const pathMiddleware = (req) => {
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  headers.set("x-current-lang", routing.defaultLocale);
  routing.locales.forEach(locale => {
    if(req.nextUrl.pathname.indexOf(`/${locale}/`) > -1) {
      headers.set("x-current-lang", locale);
    }
  })
  return NextResponse.next({ headers });
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
        if(!token?.permissions.includes("research")) {
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
  [intlMiddleware, { exclude : /^\/api|_next\/static|_next\/image|favicon.ico(\/.*)?$/ }],
  [authMiddleware, { include : /^\/dashboard(\/.*)?$/ }],
  [pathMiddleware]
], {
  logger : null
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
