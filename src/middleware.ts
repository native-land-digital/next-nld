import { withAuth } from "next-auth/middleware"

export default withAuth({
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
      return token !== null;
    }
  }
})

// Blocking admin non-logged in
export const config = {
  matcher: [
    "/dashboard/:path*"
  ]
}
