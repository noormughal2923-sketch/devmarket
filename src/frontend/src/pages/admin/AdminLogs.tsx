import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminListAuditLogs } from "@/hooks/useBackend";
import { RefreshCw, ShieldCheck } from "lucide-react";

function truncatePrincipal(p: { toString(): string }) {
  const s = p.toString();
  return s.length > 20 ? `${s.slice(0, 10)}\u2026${s.slice(-6)}` : s;
}

function formatTimestamp(ts: bigint) {
  return new Date(Number(ts / 1_000_000n)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function AdminLogs() {
  const {
    data: logs,
    isLoading,
    refetch,
    isFetching,
  } = useAdminListAuditLogs();

  const sorted = (logs ?? [])
    .slice()
    .sort((a, b) => Number(b.timestamp - a.timestamp));

  return (
    <AdminLayout>
      <div className="space-y-5 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Audit Logs
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              All administrative actions recorded in chronological order
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => refetch()}
            disabled={isFetching}
            data-ocid="admin.logs.refresh_button"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        {/* Logs Table */}
        <Card data-ocid="admin.logs_table">
          <CardContent className="p-0">
            {isLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="admin.logs.loading_state"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <Skeleton key={n} className="h-12 w-full" />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div
                className="py-16 flex flex-col items-center gap-3 text-muted-foreground"
                data-ocid="admin.logs.empty_state"
              >
                <ShieldCheck className="w-10 h-10 opacity-30" />
                <p className="text-sm">No audit logs recorded yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {[
                        "Timestamp",
                        "Admin",
                        "Action",
                        "Target",
                        "Details",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((log, i) => (
                      <tr
                        key={log.id.toString()}
                        className="border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`admin.log.item.${i + 1}`}
                      >
                        <td className="px-5 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(log.timestamp)}
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-foreground max-w-[140px] truncate">
                          {truncatePrincipal(log.adminPrincipal)}
                        </td>
                        <td className="px-5 py-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                            {log.action}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                          {log.targetId ?? "\u2014"}
                        </td>
                        <td className="px-5 py-3 text-foreground text-xs max-w-xs truncate">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
