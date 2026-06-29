import { Users, Activity, UserPlus, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { User } from "@/types";
import { motion } from "framer-motion";

// Helper function to format trend percentage
const formatTrend = (current: number, previous: number) => {
    if (previous === 0) {
        return { value: current > 0 ? "+100%" : "0%", isUp: current > 0 };
    }
    const percentage = ((current - previous) / previous) * 100;
    const isUp = percentage >= 0;
    return {
        value: `${isUp ? "+" : ""}${percentage.toFixed(1)}%`,
        isUp,
    };
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const StatsCards = ({ data }: { data: User[] }) => {
    // --- TIME PERIODS ---
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

    // --- 1. TOTAL USERS ---
    const totalCurrent = data.length;
    const totalPrevious = data.filter(
        (u) => new Date(u.createdAt) < thirtyDaysAgo,
    ).length;
    const totalTrend = formatTrend(totalCurrent, totalPrevious);

    // --- 2. ACTIVE TREATMENTS / STAFF ---
    const activeStatuses = ["admitted", "in_treatment", "observation", "active"];
    const activeCurrent = data.filter((u) =>
        activeStatuses.includes(u.status?.toLowerCase() || ""),
    ).length;

    // Estimate previous active by filtering out those created in the last 30 days
    const activePrevious = data.filter(
        (u) =>
            activeStatuses.includes(u.status?.toLowerCase() || "") &&
            new Date(u.createdAt) < thirtyDaysAgo,
    ).length;

    const activeTrend = formatTrend(activeCurrent, activePrevious);

    // --- 3. NEW THIS MONTH ---
    const newCurrent = data.filter(
        (u) => new Date(u.createdAt) >= thirtyDaysAgo,
    ).length;

    const newPrevious = data.filter((u) => {
        const date = new Date(u.createdAt);
        return date >= sixtyDaysAgo && date < thirtyDaysAgo;
    }).length;

    const newTrend = formatTrend(newCurrent, newPrevious);

    // --- 4. RATE / SATISFACTION ---
    const isPatient = data[0]?.role === "patient";
    const dischargedCurrent = data.filter(
        (u) => u.status?.toLowerCase() === "discharged",
    ).length;

    const dischargedPrevious = data.filter(
        (u) =>
            u.status?.toLowerCase() === "discharged" &&
            new Date(u.createdAt) < thirtyDaysAgo,
    ).length;

    let rateValue = "0%";
    let rateLabel = "Satisfied Patients";
    let rateTrend = { value: "+0%", isUp: true };

    if (totalCurrent > 0) {
        if (isPatient) {
            rateLabel = "Discharged Rate";
            rateValue = `${Math.round((dischargedCurrent / totalCurrent) * 100)}%`;

            // Calculate trend based on absolute numbers of discharged
            rateTrend = formatTrend(dischargedCurrent, dischargedPrevious);
        } else {
            rateLabel = "Active Staff Rate";
            rateValue = `${Math.round((activeCurrent / totalCurrent) * 100)}%`;
            rateTrend = activeTrend;
        }
    }

    // --- MAP TO CARD RENDER DATA ---
    const statsData = [
        {
            label: isPatient ? "Total Patients" : "Total Staff",
            value: totalCurrent.toLocaleString(),
            trend: totalTrend.value,
            trendUp: totalTrend.isUp,
            icon: Users,
            iconColor: "text-blue-500",
            iconBg: "bg-blue-500/10",
        },
        {
            label: isPatient ? "Active Treatments" : "Active Duty",
            value: activeCurrent.toLocaleString(),
            trend: activeTrend.value,
            trendUp: activeTrend.isUp,
            icon: Activity,
            iconColor: "text-teal-500",
            iconBg: "bg-teal-500/10",
        },
        {
            label: "New This Month",
            value: newCurrent.toLocaleString(),
            trend: newTrend.value,
            trendUp: newTrend.isUp,
            icon: UserPlus,
            iconColor: "text-purple-500",
            iconBg: "bg-purple-500/10",
        },
        {
            label: rateLabel,
            value: rateValue,
            trend: rateTrend.value,
            trendUp: rateTrend.isUp,
            icon: UserCheck,
            iconColor: "text-green-500",
            iconBg: "bg-green-500/10",
        },
    ];

    return (
        <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
        >
            {statsData.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <Card className="border-border shadow-sm rounded-2xl bg-card overflow-hidden interactive-hover premium-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                {/* Icon Box */}
                                <div className={cn("p-3 rounded-xl", stat.iconBg)}>
                                    <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
                                </div>

                                {/* Trend Badge */}
                                <div
                                    className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-bold tracking-wide",
                                        stat.trendUp
                                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                                            : "bg-destructive/10 text-destructive",
                                    )}
                                >
                                    {stat.trend}
                                </div>
                            </div>

                            {/* Label & Value */}
                            <div className="space-y-1.5">
                                <p className="text-sm font-medium text-muted-foreground">
                                    {stat.label}
                                </p>
                                <h3 className="text-3xl font-heading font-bold text-foreground tracking-tight">
                                    {stat.value}
                                </h3>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default StatsCards;