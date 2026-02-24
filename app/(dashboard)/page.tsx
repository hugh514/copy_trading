import { MetricCard } from "@/components/dashboard/metric-card";
import { OpenTradesTable } from "@/components/dashboard/open-trades-table";
import { DollarSign, Percent, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do seu desempenho de copy trading e resumo da conta.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Saldo Atual"
          value="$12,450.80"
          description="+$1,250 este mês"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Lucro Diário"
          value="+$254.30"
          description="+2.1% no dia"
          icon={TrendingUp}
          trend="up"
        />
        <MetricCard
          title="Win Rate"
          value="68.5%"
          description="-1.5% do recorde"
          icon={Percent}
          trend="down"
        />
      </div>

      <div className="pt-4">
        <OpenTradesTable />
      </div>
    </div>
  );
}
