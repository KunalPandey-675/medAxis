import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getActivityLogs } from "@/lib/api";
import CustomPagination from "@/components/global/CustomPagination";
import Loader from "@/components/global/Loader";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import GlobalSearch from "@/components/global/GlobalSearch";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function meta() {
    return [{ title: "System Activities" }];
}

const ActivitiesLog = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const limit = 10;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["activities-log", page],
        queryFn: () => getActivityLogs({ page, limit }),
        placeholderData: (previousData) => previousData,
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader label="Fetching logs..." />
            </div>
        );

    if (isError) {
        return (
            <div className="p-8 text-center text-destructive font-medium bg-destructive/5 rounded-2xl border border-destructive/20 mt-6">
                Error loading activity logs.
            </div>
        );
    }

    const logs = data?.res || [];
    const pagination = data?.pagination;

    const filteredLogs = logs?.filter((log) =>
        log?.action.toLowerCase().includes(search.toLowerCase()),
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 w-full"
        >
            <Card className="premium-shadow border border-border/50 bg-card/80 backdrop-blur-xl rounded-2xl overflow-hidden">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border/40">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                            <Activity className="size-5" />
                        </div>
                        <div>
                            <CardTitle className="font-heading font-bold text-2xl tracking-tight text-foreground">System Activities</CardTitle>
                            <CardDescription className="text-muted-foreground mt-1 text-sm">
                                A complete history of actions across the platform.
                            </CardDescription>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto min-w-[280px]">
                        <GlobalSearch
                            search={search}
                            setSearch={setSearch}
                            title="Search activities..."
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow className="hover:bg-transparent border-border/40">
                                    <TableHead className="font-semibold text-muted-foreground">User</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">Role</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">Action</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground">Details</TableHead>
                                    <TableHead className="font-semibold text-muted-foreground text-right pr-6">Date & Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredLogs.length === 0 ? (
                                    <TableRow className="hover:bg-transparent">
                                        <TableCell
                                            colSpan={5}
                                            className="text-center h-32 text-muted-foreground font-medium"
                                        >
                                            No activity logs found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredLogs.map((log) => (
                                        <TableRow key={log._id} className="group border-border/40 hover:bg-muted/20 transition-colors">
                                            <TableCell className="font-medium py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 border border-border/50 shadow-sm">
                                                        <AvatarImage src={log.user?.image || ""} />
                                                        <AvatarFallback className="bg-primary/5 text-primary font-bold">
                                                            {log.user?.name?.charAt(0) || "U"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-foreground">
                                                            {log.user?.name}
                                                        </span>
                                                        <span className="text-[11px] text-muted-foreground font-medium">
                                                            {log.user?.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className="capitalize text-[10px] tracking-wider font-semibold bg-background border-border/50 text-foreground"
                                                >
                                                    {log.user?.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                                                    {log.action}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-muted-foreground/80 truncate max-w-[200px] md:max-w-[300px] block font-medium">
                                                    {log.details || "---"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground font-medium text-right pr-6">
                                                {format(
                                                    new Date(log.createdAt),
                                                    "MMM dd, yyyy · hh:mm a",
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="p-4 border-t border-border/40 bg-muted/10">
                        <CustomPagination
                            loading={isLoading}
                            totalPages={pagination?.totalPages || 0}
                            currentPage={pagination?.currentPage || 0}
                            setPage={setPage}
                        />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ActivitiesLog;