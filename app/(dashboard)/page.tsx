"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { OpenTradesTable } from "@/components/dashboard/open-trades-table";
import { DollarSign, Percent, TrendingUp } from "lucide-react";
import { useAuth } from "@/src/contexts/auth-context";
import { useDashboardSummary } from "@/src/hooks/useDashboard";

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { data: summary, isLoading: isSummaryLoading } = useDashboardSummary();

  const isLoading = isAuthLoading || isSummaryLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        Carregando dados...
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo, {user?.name || "Trader"}. Aqui está o resumo da sua conta.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Saldo Atual"
          value={
            summary?.balance !== undefined
              ? `$${summary.balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}`
              : "$0.00"
          }
          description="Patrimônio Líquido"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Equity (Capital)"
          value={
            summary?.equity !== undefined
              ? `$${summary.equity.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}`
              : "$0.00"
          }
          description="Patrimônio em tempo real"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Lucro Diário"
          value={
            summary?.dailyProfit !== undefined
              ? `$${summary.dailyProfit.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}`
              : "$0.00"
          }
          description="Ganhos nas últimas 24h"
          icon={TrendingUp}
          trend={
            summary &&
            summary.dailyProfit !== undefined &&
            summary.dailyProfit >= 0
              ? "up"
              : "down"
          }
        />
        <MetricCard
          title="Taxa de Acerto"
          value={
            summary?.winRate !== undefined
              ? `${summary.winRate.toFixed(1)}%`
              : "0%"
          }
          description="Percentual de trades ganhos"
          icon={Percent}
          trend="up"
        />
      </div>

      <div className="pt-4">
        <OpenTradesTable />
      </div>
    </div>
  );
}
