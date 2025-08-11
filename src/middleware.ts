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
    console.log(`[MIDDLEWARE] Checking admin access for: ${pathname}`);

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
