import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log(`[MIDDLEWARE] Processing: ${pathname}`);

  // Check if the route requires admin access
  if (pathname.startsWith("/Manage")) {
    try {
      // Get the JWT token
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      console.log(`[MIDDLEWARE] Token found:`, !!token);
      console.log(`[MIDDLEWARE] User role:`, token?.role);

      // If no token, redirect to sign-in
      if (!token) {
        console.log(`[MIDDLEWARE] No token, redirecting to sign-in`);
        const signInUrl = new URL("/auth/signin", request.url);
        signInUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(signInUrl);
      }

      // Check if user has admin role
      if (token.role !== "ADMIN") {
        console.log(
          `[MIDDLEWARE] User role '${token.role}' is not ADMIN, redirecting to unauthorized`
        );
        // Redirect to unauthorized page
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }

      console.log(`[MIDDLEWARE] Admin access granted for: ${pathname}`);
    } catch (error) {
      console.error(`[MIDDLEWARE] Error getting token:`, error);
      // On token error, redirect to sign-in
      const signInUrl = new URL("/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
