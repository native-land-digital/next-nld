import { withAuth } from "next-auth/middleware"
import { chain } from "@nimpl/middleware-chain";

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
  [authMiddleware, { include : /^\/dashboard(\/.*)?$/ }]
], {
  logger : null
});

export const config = {
    matcher: ["/dashboard/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
