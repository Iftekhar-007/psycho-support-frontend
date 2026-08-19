import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routePermissions } from "@/constants/roles";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL ||
  "https://psychology-support-backend.vercel.app";
const authUrl =
  process.env.AUTH_URL || `${backendUrl}/api/auth`;

interface SessionUser {
  id?: string;
  userId?: string;
  name?: string;
  email?: string;
  role?: string;
}

// Extract and verify user session from cookies or Authorization header
async function getUserFromRequest(req: NextRequest): Promise<SessionUser | null> {
  const token =
    req.cookies.get("better-auth.session_token")?.value ||
    req.cookies.get("__Secure-better-auth.session_token")?.value;

  const authHeader = req.headers.get("authorization");

  if (!token && !authHeader) {
    return null;
  }

  try {
    const cookieHeader = req.headers.get("cookie") || (token ? `better-auth.session_token=${token}` : "");
    const headers: Record<string, string> = {};
    if (cookieHeader) headers["Cookie"] = cookieHeader;
    if (authHeader) headers["Authorization"] = authHeader;

    const res = await fetch(`${authUrl}/get-session`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    if (!data || !data.user) return null;

    return data.user as SessionUser;
  } catch (error) {
    console.error("Proxy session verification error:", error);
    return null;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/auth/sign-in") ||
    pathname.startsWith("/auth/sign-up");

  // Determine if this route requires authentication
  const matchedRoute = Object.keys(routePermissions).find(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isProtectedRoute = Boolean(matchedRoute);

  // If not an auth route and not a protected route, pass through immediately
  if (!isAuthRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  const user = await getUserFromRequest(req);

  // If already authenticated and trying to access sign-in / sign-up, redirect to dashboard
  if (isAuthRoute) {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // If route is protected and user is not authenticated
  if (isProtectedRoute && !user) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized access. Please log in." },
        { status: 401 }
      );
    }
    const signInUrl = new URL("/auth/sign-in", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If route requires specific role permissions
  if (isProtectedRoute && user && matchedRoute) {
    const allowedRoles = routePermissions[matchedRoute] || [];
    const userRoleNormalized = (user.role || "").toUpperCase();

    if (
      allowedRoles.length > 0 &&
      !allowedRoles.map((r) => r.toUpperCase()).includes(userRoleNormalized)
    ) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Forbidden. Insufficient permissions." },
          { status: 403 }
        );
      }
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Forward authorized request with custom user headers
  const requestHeaders = new Headers(req.headers);
  if (user) {
    if (user.id || user.userId) {
      requestHeaders.set("x-user-id", user.id || user.userId || "");
    }
    if (user.role) {
      requestHeaders.set("x-user-role", user.role);
    }
    if (user.email) {
      requestHeaders.set("x-user-email", user.email);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
