import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, KeyRound, MailCheck } from "lucide-react";

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

export const metadata: Metadata = {
  title: "Recuperar Senha | CopyTrade MVP",
  description: "Recupere o acesso à sua conta.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner border border-blue-100">
            <KeyRound className="h-6 w-6" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-neutral-900 tracking-tight">
          Esqueceu sua senha?
        </h2>
        <p className="mt-2 text-center text-sm text-neutral-600">
          Não se preocupe, nós enviaremos instruções de redefinição para você.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card className="border-none shadow-xl bg-white/90 backdrop-blur-xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-xl font-semibold tracking-tight">
              Recuperar acesso
            </CardTitle>
            <CardDescription className="text-neutral-500">
              Digite o e-mail cadastrado na sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 mt-2">
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
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pb-8">
            <Button className="w-full h-11 text-base font-medium shadow-md transition-transform active:scale-[0.98]">
              <MailCheck className="mr-2 h-4 w-4" />
              Enviar instruções
            </Button>
            <div className="mt-4 text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
