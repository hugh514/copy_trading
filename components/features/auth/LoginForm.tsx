"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";

import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { loginAction } from "@/lib/actions/auth";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    async function onSubmit(data: LoginInput) {
        setIsLoading(true);
        try {
            const result = await loginAction(data);
            if (result?.error) {
                toast({
                    variant: "destructive",
                    title: "Falha na autenticação",
                    description: result.error,
                });
            } else if (result?.success) {
                toast({
                    title: "Bem-vindo!",
                    description: "Login realizado com sucesso.",
                });
                router.push("/dashboard");
                router.refresh(); // forces middleware token validation on next load
            }
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Erro Crítico",
                description: "Falha na comunicação com o servidor.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-semibold tracking-tight">Login</CardTitle>
                <CardDescription className="text-neutral-500">
                    Insira seu e-mail e senha para acessar a conta
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-neutral-700">E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="m@exemplo.com"
                                            className="bg-white border-neutral-200 focus:border-primary focus:ring-primary shadow-sm h-11 transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-neutral-700">Senha</FormLabel>
                                        <Link
                                            href="/forgot-password"
                                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                        >
                                            Esqueceu a senha?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="bg-white border-neutral-200 focus:border-primary focus:ring-primary shadow-sm h-11 transition-all"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-11 text-base font-medium shadow-md transition-transform active:scale-[0.98] mt-8"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Entrando...
                                </>
                            ) : (
                                <>
                                    Entrar na conta
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                        <div className="text-center text-sm text-neutral-500">
                            Não tem uma conta?{" "}
                            <Link
                                href="/register"
                                className="font-semibold text-primary hover:text-primary/80 transition-colors"
                            >
                                Criar conta
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    );
}
