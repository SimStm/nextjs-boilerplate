import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const unprotectedRoutes = ['/login']
const pathsToIgnore = ['_next', 'favicon', 'image']

export default function middleware(req: NextRequest) {
  // const shouldSkipPath =
  //   pathsToIgnore.filter((txt) => req.nextUrl.pathname.includes(txt)).length >
  //   0;
  // if (!unprotectedRoutes.includes(req.nextUrl.pathname) && !shouldSkipPath) {
  //   const absoluteURL = new URL('/login', req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
}
