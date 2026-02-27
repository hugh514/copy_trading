import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    const isPublicRoute = pathname === "/login" || pathname === "/register";
    const isAdminRoute = pathname.startsWith("/admin");
    const isProtectedRoute = pathname.startsWith("/dashboard");

    // Redireciona usuários logados para o dashboard se tentarem acessar rotas públicas
    if (isPublicRoute && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Bloqueia acesso a rotas protegidas se não houver token
    if ((isProtectedRoute || isAdminRoute) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Validação específica para rotas de ADMIN
    if (isAdminRoute && token) {
        try {
            // Decode JWT no formato header.payload.signature
            const payloadBase64 = token.split(".")[1];
            const decodedJson = Buffer.from(payloadBase64, "base64").toString("utf-8");
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
