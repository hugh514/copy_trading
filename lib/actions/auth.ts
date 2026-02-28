"use server";

import { cookies } from "next/headers";
import { loginSchema, LoginInput } from "../validations/auth";

export async function loginAction(data: LoginInput) {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
        return { error: "Dados preenchidos incorretamente." };
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(`${apiUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result.data),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            return { error: errorData?.message || "Credenciais inválidas ou erro no servidor." };
        }

        const json = await res.json();
        const token = json.token || json.access_token;

        if (!token) {
            return { error: "Token JWT não foi retornado pela API." };
        }

        // Stores token in secure HTTP-only cookie
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return { success: true };
    } catch (err: any) {
        return { error: "Ocorreu um erro interno de conexão com a API." };
    }
}
