"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

import { loginSchema, LoginInput } from "@/lib/validations/auth";
import api from "@/src/services/api";
import { useAuth } from "@/src/contexts/auth-context";
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
  const { login } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      console.log("Tentando login com:", { email: data.email });
      const response = await api.post("/api/auth/login", data);
      console.log("Resposta do login:", response.data);

      const loginData = response.data.data;
      const token =
        loginData?.access_token || response.data?.token || loginData?.token;

      if (token) {
        await login(token);
        toast({
          title: "Bem-vindo!",
          description: (
            <div className="flex items-center gap-2 mt-1">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Login realizado com sucesso.</span>
            </div>
          ),
        });
        router.push("/");
      } else {
        console.error("Token não encontrado na resposta:", response.data);
        toast({
          variant: "destructive",
          title: "Falha na autenticação",
          description: "Token não recebido.",
        });
      }
    } catch (error: any) {
      console.error("Erro no login:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        "Associe-se à nossa rede e comece a lucrar.";

      toast({
        variant: "destructive",
        title: "Ops! Algo deu errado",
        description: (
          <div className="flex items-center gap-3 mt-1">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span className="font-medium text-[13px] leading-tight mt-0.5">
              {errorMessage}
            </span>
          </div>
        ),
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Login
        </CardTitle>
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
                      placeholder="••••••••••••••••"
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
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
