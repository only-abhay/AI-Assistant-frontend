
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request) {
  const token = request.cookies.get("jwt")?.value;
  const { pathname } = request.nextUrl;

  // =========================
  // USER PROTECTED ROUTES
  // =========================
  const userRoutes = ["/resume", "/blog", "/profile", "/history"];

  const isUserRoute = userRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // =========================
  // ADMIN PROTECTED ROUTES
  // =========================
  const isAdminRoute = pathname.startsWith("/admin");

  // =========================
  // USER ROUTE PROTECTION
  // =========================
  if (isUserRoute && !token) {
    const authUrl = new URL("/auth", request.url);

    // Save the page user wanted to visit
    authUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(authUrl);
  }

  // =========================
  // ADMIN ROUTE PROTECTION
  // =========================
  if (isAdminRoute) {
    // Token nahi hai
    if (!token) {
      return NextResponse.redirect(
        new URL("/auth", request.url)
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY_FOR_ENCRPT
      );

      // Only admin allowed
      if (decoded.role !== "admin") {
        return NextResponse.redirect(
          new URL("/auth", request.url)
        );
      }
    } catch (error) {
      console.log("JWT VERIFY ERROR:", error.message);

      return NextResponse.redirect(
        new URL("/auth", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/checkout/:path*",
    "/profile/:path*",
    "/resume/:path*",
    "/blog/:path*",
    "/history/:path*",
    "/admin/:path*",
  ],
};
