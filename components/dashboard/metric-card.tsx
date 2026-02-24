import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border-none bg-white shadow-sm ring-1 ring-neutral-200 overflow-hidden relative group hover:shadow-md transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/5 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
      <div className="p-6 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="tracking-tight text-sm font-medium text-neutral-500">
            {title}
          </h3>
          <div className="p-2 bg-neutral-50 rounded-lg text-neutral-400">
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold text-neutral-900">{value}</div>
          {description && (
            <p
              className={cn(
                "text-sm pt-2 font-medium flex items-center gap-1",
                trend === "up" && "text-emerald-600",
                trend === "down" && "text-red-500",
                trend === "neutral" && "text-neutral-500",
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full inline-block",
                  trend === "up" && "bg-emerald-500",
                  trend === "down" && "bg-red-500",
                  trend === "neutral" && "bg-neutral-400",
                )}
              ></span>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
