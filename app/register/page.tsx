"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, ArrowRight, UserPlus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import api from "@/src/services/api";
import { useAuth } from "@/src/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro no registro",
        description: "As senhas não coincidem.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });

      const registrationData = response.data?.data;
      const token = registrationData?.access_token || response.data?.token;

      if (token) {
        await login(token);
        toast({
          title: "Conta criada!",
          description: "Seja bem-vindo à plataforma.",
        });
        router.push("/");
      } else {
        toast({
          title: "Conta criada!",
          description: "Por favor, faça login para continuar.",
        });
        router.push("/login");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro ao criar conta. Tente novamente.";
      toast({
        variant: "destructive",
        title: "Erro no registro",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
            <UserPlus className="h-6 w-6" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-neutral-900 tracking-tight">
          Crie sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Junte-se à nossa plataforma de Copy Trading hoje.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Registrar
            </CardTitle>
            <CardDescription className="text-neutral-500">
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-neutral-700">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="João Silva"
                  className="bg-white border-neutral-200 focus:border-primary focus:ring-primary shadow-sm h-11 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-neutral-700">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemplo.com"
                  className="bg-white border-neutral-200 focus:border-primary focus:ring-primary shadow-sm h-11 transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-neutral-700">
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••••••"
                  required
                  className="bg-white border-neutral-200 focus:border-primary focus:ring-primary shadow-sm h-11 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-neutral-700">
                  Confirmar Senha
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••••••••••"
                  required
                  className="bg-white border-neutral-200 focus:border-primary focus:ring-primary shadow-sm h-11 transition-all"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 text-base font-medium shadow-md transition-transform active:scale-[0.98]"
              >
                {isLoading ? "Criando..." : "Criar conta"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
              <div className="text-center text-sm text-neutral-500">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Entrar
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
