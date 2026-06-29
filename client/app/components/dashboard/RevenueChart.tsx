import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { getAllInvoices } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function RevenueChart() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-invoices"],
    queryFn: () => getAllInvoices(),
  });

  const chartData = useMemo(() => {
    // 1. Check if res exists and is an array
    const invoices = data?.res || [];

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyTotals = monthNames.reduce(
      (acc, month) => {
        acc[month] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    invoices.forEach((inv) => {
      if (inv.status === "paid") {
        // 2. SAFETY CHECK: Get date from invoice, or fallback to user date, or current date
        const rawDate =
          inv.createdAt || inv.user?.createdAt || new Date().toISOString();
        const date = new Date(rawDate);

        const monthIndex = date.getMonth();
        const monthName = monthNames[monthIndex];

        // 3. Convert cents to dollars (15000 -> 150)
        const amount = (Number(inv.totalAmount) || 0) / 100;

        if (monthName) {
          monthlyTotals[monthName] += amount;
        }
      }
    });

    return monthNames.map((name) => ({
      name,
      total: monthlyTotals[name],
    }));
  }, [data]);

  if (isLoading)
    return (
      <div className="h-72 w-full flex items-center justify-center">
        <Skeleton className="w-full h-full rounded-xl" />
      </div>
    );
  if (isError)
    return (
      <div className="h-72 w-full flex items-center justify-center text-destructive bg-destructive/10 rounded-xl border border-destructive/20">
        <p className="font-medium text-sm">Error loading revenue data</p>
      </div>
    );

  return (
    <div className="h-72 w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={1} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="var(--border)"
            opacity={0.5}
          />
          <XAxis
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)" }}
            dy={10}
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)" }}
            tickFormatter={(value) => `$${value}`}
            dx={-10}
          />
          <Tooltip
            cursor={{ fill: "var(--muted)", opacity: 0.2 }}
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-xl border border-border bg-card/80 backdrop-blur-md p-3 shadow-xl">
                    <p className="text-[10px] uppercase font-semibold text-muted-foreground mb-1">
                      {label}
                    </p>
                    <p className="text-xl font-heading font-bold text-foreground">
                      ${Number(payload[0].value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="total"
            fill="url(#colorTotal)"
            radius={[6, 6, 0, 0]}
            barSize={28}
            animationDuration={1500}
            animationEasing="ease-out"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} className="transition-all duration-300 hover:opacity-80" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}