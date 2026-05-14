import { AdminLayout } from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAdminDashboardStats,
  useAdminListOrders,
  useAdminSeedProducts,
} from "@/hooks/useBackend";
import { OrderStatus } from "@/types/marketplace";
import {
  Activity,
  CheckCircle2,
  Clock,
  Package,
  Sprout,
  Users,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

function StatCard({
  label,
  value,
  icon: Icon,
  highlight,
  ocid,
}: {
  label: string;
  value: bigint | number | undefined;
  icon: React.ElementType;
  highlight?: "primary" | "gold" | "destructive";
  ocid: string;
}) {
  const colorMap = {
    primary: "text-primary",
    gold: "text-accent",
    destructive: "text-destructive",
  };
  const bgMap = {
    primary: "bg-primary/10",
    gold: "bg-accent/10",
    destructive: "bg-destructive/10",
  };
  const iconColor = highlight ? colorMap[highlight] : "text-muted-foreground";
  const iconBg = highlight ? bgMap[highlight] : "bg-muted";

  return (
    <Card className="card-hover" data-ocid={ocid}>
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              {label}
            </p>
            {value === undefined ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-3xl font-display font-bold text-foreground">
                {value.toString()}
              </p>
            )}
          </div>
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
          >
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    [OrderStatus.PendingVerification]: {
      label: "Pending",
      className: "bg-accent/15 text-accent border-accent/30",
    },
    [OrderStatus.Approved]: {
      label: "Approved",
      className: "bg-primary/15 text-primary border-primary/30",
    },
    [OrderStatus.Rejected]: {
      label: "Rejected",
      className: "bg-destructive/15 text-destructive border-destructive/30",
    },
  };
  const { label, className } = map[status] ?? { label: status, className: "" };
  return (
    <Badge variant="outline" className={`text-xs font-medium ${className}`}>
      {label}
    </Badge>
  );
}

function formatDate(ts: bigint) {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncatePrincipal(p: { toString(): string }) {
  const s = p.toString();
  return s.length > 20 ? `${s.slice(0, 10)}\u2026${s.slice(-6)}` : s;
}

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminDashboardStats();
  const { data: orders } = useAdminListOrders();
  const seedProducts = useAdminSeedProducts();

  const recentOrders = (orders ?? [])
    .slice()
    .sort((a, b) => Number(b.createdAt - a.createdAt))
    .slice(0, 5);

  async function handleSeed() {
    try {
      await seedProducts.mutateAsync();
      toast.success("Sample products seeded successfully!");
    } catch (err) {
      toast.error(
        `Seed failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6 fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Platform overview and recent activity
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleSeed}
            disabled={seedProducts.isPending}
            data-ocid="admin.seed_products_button"
          >
            <Sprout className="w-4 h-4" />
            {seedProducts.isPending ? "Seeding\u2026" : "Seed Products"}
          </Button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            label="Total Orders"
            value={statsLoading ? undefined : stats?.totalOrders}
            icon={Activity}
            ocid="admin.stat.total_orders"
          />
          <StatCard
            label="Pending"
            value={statsLoading ? undefined : stats?.pendingOrders}
            icon={Clock}
            highlight="gold"
            ocid="admin.stat.pending_orders"
          />
          <StatCard
            label="Approved"
            value={statsLoading ? undefined : stats?.approvedOrders}
            icon={CheckCircle2}
            highlight="primary"
            ocid="admin.stat.approved_orders"
          />
          <StatCard
            label="Rejected"
            value={
              statsLoading
                ? undefined
                : stats
                  ? stats.totalOrders -
                    stats.approvedOrders -
                    stats.pendingOrders
                  : undefined
            }
            icon={XCircle}
            highlight="destructive"
            ocid="admin.stat.rejected_orders"
          />
          <StatCard
            label="Products"
            value={statsLoading ? undefined : stats?.totalProducts}
            icon={Package}
            ocid="admin.stat.total_products"
          />
          <StatCard
            label="Users"
            value={statsLoading ? undefined : stats?.totalUsers}
            icon={Users}
            ocid="admin.stat.total_users"
          />
        </div>

        {/* Recent Orders */}
        <Card data-ocid="admin.recent_orders_table">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display font-semibold">
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {recentOrders.length === 0 ? (
              <div
                className="py-10 text-center text-muted-foreground text-sm"
                data-ocid="admin.recent_orders.empty_state"
              >
                No orders yet. Orders will appear here once users start
                purchasing.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      {[
                        "Order ID",
                        "Buyer",
                        "Product",
                        "Method",
                        "Status",
                        "Date",
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
                    {recentOrders.map((order, i) => (
                      <tr
                        key={order.id.toString()}
                        className="border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`admin.recent_order.item.${i + 1}`}
                      >
                        <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                          #{order.id.toString()}
                        </td>
                        <td className="px-5 py-3 font-mono text-xs text-foreground">
                          {truncatePrincipal(order.buyerPrincipal)}
                        </td>
                        <td className="px-5 py-3 text-foreground">
                          #{order.productId.toString()}
                        </td>
                        <td className="px-5 py-3 text-foreground">
                          {order.paymentMethod}
                        </td>
                        <td className="px-5 py-3">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3 text-right text-muted-foreground">
                          {formatDate(order.createdAt)}
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
