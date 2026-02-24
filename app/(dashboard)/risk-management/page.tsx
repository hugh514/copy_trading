import { RiskForm } from "@/components/risk-management/risk-form";

export default function RiskManagementPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gerenciamento de Risco
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure os limites e multiplicadores para proteger o seu capital.
        </p>
      </div>

      <RiskForm />
    </div>
  );
}
