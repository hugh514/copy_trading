"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Save, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "@/src/contexts/auth-context";
import { useToast } from "@/components/ui/use-toast";
import {
  useRiskSettings,
  useUpdateRiskSettings,
} from "@/src/hooks/useRiskSettings";

const riskFormSchema = z.object({
  multiplier: z
    .number({ message: "Deve ser um número válido." })
    .min(0.01, { message: "O multiplicador mínimo é 0.01x." })
    .max(100, { message: "O multiplicador máximo é 100.00x." }),
  dailyLossLimit: z
    .number({ message: "Deve ser um número válido." })
    .min(0, { message: "O limite de perda mínimo é 0." }),
});

type RiskFormValues = z.infer<typeof riskFormSchema>;

export function RiskForm() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: remoteSettings, isLoading: isFetching } = useRiskSettings();
  const updateSettings = useUpdateRiskSettings();

  const form = useForm<RiskFormValues>({
    resolver: zodResolver(riskFormSchema),
    defaultValues: {
      multiplier: 1.0,
      dailyLossLimit: 150.0,
    },
  });

  useEffect(() => {
    const settings = remoteSettings || user?.riskSettings;
    if (settings) {
      form.reset({
        multiplier: settings.multiplier,
        dailyLossLimit: settings.dailyLossLimit,
      });
    }
  }, [remoteSettings, user, form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(data: RiskFormValues) {
    try {
      await updateSettings.mutateAsync({
        multiplier: data.multiplier,
        dailyLossLimit: data.dailyLossLimit,
        isActive: user?.riskSettings?.isActive ?? true,
      });

      toast({
        title: "Sucesso!",
        description: "Configurações de risco atualizadas.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description:
          error.response?.data?.message || "Falha na comunicação com o API.",
      });
    }
  }

  const isSaving = updateSettings.isPending;

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow max-w-2xl">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">
          Configurações de Risco
        </h3>
        <p className="text-sm text-muted-foreground">
          Ajuste seus parâmetros de risco para proteger seu capital.
        </p>
      </div>

      <div className="p-6 pt-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Multiplicador de Lote (x)
            </label>
            <input
              type="number"
              step="0.01"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ex: 1.0"
              {...register("multiplier", { valueAsNumber: true })}
            />
            {errors.multiplier && (
              <p className="text-sm font-medium text-destructive">
                {errors.multiplier.message}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Define o volume das suas operações em relação às do trader
              original.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Limite de Perda Diária Global ($)
            </label>
            <input
              type="number"
              step="0.1"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Ex: 150.0"
              {...register("dailyLossLimit", { valueAsNumber: true })}
            />
            {errors.dailyLossLimit && (
              <p className="text-sm font-medium text-destructive">
                {errors.dailyLossLimit.message}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              O copy trading será pausado se a perda consolidada atingir este
              valor financeiro em um único dia.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSaving ? "Salvando..." : "Salvar Configurações"}
          </button>
        </form>
      </div>
    </div>
  );
}
