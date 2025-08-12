import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  apiRateLimiter,
  authRateLimiter,
  strictApiRateLimiter,
} from "@/lib/rate-limit";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Debug logging
  console.log(`[MIDDLEWARE] Processing: ${pathname}`);

  // Apply different rate limiting based on route
  let rateLimitResult = null;

  if (pathname.startsWith("/api/auth/")) {
    // Stricter rate limiting for auth routes
    rateLimitResult = await authRateLimiter.middleware(request);
  } else if (
    pathname.startsWith("/api/") &&
    (pathname.includes("/delete") ||
      pathname.includes("/admin") ||
      pathname.includes("/upload"))
  ) {
    // Very strict rate limiting for sensitive operations
    rateLimitResult = await strictApiRateLimiter.middleware(request);
  } else if (pathname.startsWith("/api/")) {
    // General API rate limiting
    rateLimitResult = await apiRateLimiter.middleware(request);
  }

  if (rateLimitResult) {
    return rateLimitResult; // Rate limit exceeded
  }

  // Check if the route requires admin access
  if (pathname.startsWith("/Manage")) {
    // console.log(`[MIDDLEWARE] Checking admin access for: ${pathname}`);

    try {
      // console.log(`[MIDDLEWARE] Environment:`, process.env.NODE_ENV);
      // console.log(`[MIDDLEWARE] All cookies:`, request.cookies.getAll().map(c => c.name));

      // Try different cookie names
      let token = null;

      // Try production cookie name first
      if (process.env.NODE_ENV === "production") {
        token = await getToken({
          req: request,
          secret: process.env.NEXTAUTH_SECRET,
          cookieName: "__Secure-next-auth.session-token",
          secureCookie: true,
        });
        // console.log(`[MIDDLEWARE] Tried __Secure-next-auth.session-token:`, !!token);
      }

      // If no token found, try development cookie name
      if (!token) {
        token = await getToken({
          req: request,
          secret: process.env.NEXTAUTH_SECRET,
          cookieName: "next-auth.session-token",
          secureCookie: false,
        });
        // console.log(`[MIDDLEWARE] Tried next-auth.session-token:`, !!token);
      }

      // If still no token, try without specifying cookie name (auto-detect)
      if (!token) {
        token = await getToken({
          req: request,
          secret: process.env.NEXTAUTH_SECRET,
        });
        // console.log(`[MIDDLEWARE] Tried auto-detect:`, !!token);
      }

      // console.log(`[MIDDLEWARE] Final token found:`, !!token);
      // console.log(`[MIDDLEWARE] User role:`, token?.role);
      // console.log(`[MIDDLEWARE] Token data:`, token ? { uid: token.uid, email: token.email, role: token.role } : null);

      // If no token, redirect to sign-in
      if (!token) {
        // console.log(`[MIDDLEWARE] No token, redirecting to sign-in`);
        const signInUrl = new URL("/auth/signin", request.url);
        signInUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(signInUrl);
      }

      // Check if user has admin role
      if (token.role !== "ADMIN") {
        // console.log(
        //   `[MIDDLEWARE] User role '${token.role}' is not ADMIN, redirecting to unauthorized`
        // );
        // Redirect to unauthorized page
        const unauthorizedUrl = new URL("/unauthorized", request.url);
        return NextResponse.redirect(unauthorizedUrl);
      }

      // console.log(`[MIDDLEWARE] Admin access granted for: ${pathname}`);
    } catch (error) {
      // console.error(`[MIDDLEWARE] Error getting token:`, error);
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
