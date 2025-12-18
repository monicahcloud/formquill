// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";

// const SESSION_COOKIE = "fq_session";

// // Paths that must be signed in (add more as your app grows)
// const PROTECTED_MATCHERS = ["/app"];

// export function middleware(req: NextRequest) {
//   const { pathname, search } = req.nextUrl;
//   const isProtected = PROTECTED_MATCHERS.some(
//     (p) => pathname === p || pathname.startsWith(p + "/")
//   );

//   // If user is trying to access auth pages while signed in, push to /app
//   const isAuthPage = pathname === "/signin" || pathname === "/signup";
//   const hasSession = Boolean(req.cookies.get(SESSION_COOKIE)?.value);

//   if (isAuthPage && hasSession) {
//     const url = new URL("/app", req.url);
//     return NextResponse.redirect(url);
//   }

//   if (!isProtected) return NextResponse.next();

//   // Protected route: require cookie (quick check)
//   if (!hasSession) {
//     const url = new URL("/signin", req.url);
//     // Preserve the original destination so we can return after signin
//     url.searchParams.set("next", pathname + (search || ""));
//     return NextResponse.redirect(url);
//   }

//   // Cookie present → let the request proceed.
//   // (Your page’s requireUser() still does the DB-verified check.)
//   return NextResponse.next();
// }

// export const config = {
//   // Only run on these matchers to keep it cheap
//   matcher: [
//     "/app/:path*", // dashboard + nested routes
//     "/signin", // redirect signed-in users away from auth pages
//     "/signup",
//   ],
// };
// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED = ["/app"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = Boolean(req.cookies.get("sid")?.value);

  // Allow static & public routes
  if (pathname.startsWith("/_next") || pathname.startsWith("/public")) {
    return NextResponse.next();
  }

  // Don’t guard the auth pages
  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    // Optional: if signed in already, send to /app
    if (hasSession) {
      return NextResponse.redirect(new URL("/app", req.url));
    }
    return NextResponse.next();
  }

  // Guard protected routes
  if (PROTECTED.some((p) => pathname.startsWith(p))) {
    if (!hasSession) {
      const url = new URL("/signin", req.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
