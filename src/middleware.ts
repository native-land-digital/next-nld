import { NextRequest, NextResponse } from 'next/server'
import NextAuth from 'next-auth';

const PUBLIC_FILE = /\.(.*)$/

// export async function middleware(req: NextRequest) {
//   if (
//     req.nextUrl.pathname.startsWith('/_next') ||
//     req.nextUrl.pathname.includes('/api/') ||
//     PUBLIC_FILE.test(req.nextUrl.pathname)
//   ) {
//     return
//   }
//
//   if (req.nextUrl.locale === 'default') {
//     const locale = req.cookies.get('NEXT_LOCALE')?.value || 'en'
//
//     return NextResponse.redirect(
//       new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
//     )
//   }
// }

// Blocking admin non-logged in
export { default } from "next-auth/middleware"
export const config = {
  matcher: ["/admin"]
}
