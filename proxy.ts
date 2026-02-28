import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPublicRoute = pathname === "/login";
  const isRegisterRoute = pathname === "/register";
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname === "/dashboard/usuarios";
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (isRegisterRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if ((isProtectedRoute || isAdminRoute) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminRoute && token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedJson = Buffer.from(payloadBase64, "base64").toString(
        "utf-8",
      );
      const payload = JSON.parse(decodedJson);

      if (payload.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    } catch (e) {
      // Token inválido/malformado
      request.cookies.delete("token");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
