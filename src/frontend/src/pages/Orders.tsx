import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useListMyDownloadTokens,
  useListMyOrders,
  useRedeemDownloadToken,
} from "@/hooks/useBackend";
import { useListProducts } from "@/hooks/useBackend";
import { OrderStatus } from "@/types/marketplace";
import type { DownloadTokenView, OrderView } from "@/types/marketplace";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  Package,
  RefreshCw,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── helpers ─────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: React.ReactNode; className: string }
> = {
  [OrderStatus.PendingVerification]: {
    label: "Pending Verification",
    icon: <Clock className="h-3.5 w-3.5" />,
    className: "bg-accent/15 text-accent border-accent/30",
  },
  [OrderStatus.Approved]: {
    label: "Approved",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className:
      "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30",
  },
  [OrderStatus.Rejected]: {
    label: "Rejected",
    icon: <XCircle className="h-3.5 w-3.5" />,
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

const PAYMENT_LABEL: Record<string, string> = {
  JazzCash: "JazzCash",
  ABL: "Allied Bank",
};

function isTokenExpired(token: DownloadTokenView) {
  return Number(token.expiresAt) / 1_000_000 < Date.now();
}

// ─── OrderCard ────────────────────────────────────────────────────────────────
function OrderCard({
  order,
  productTitle,
  index,
  tokens,
}: {
  order: OrderView;
  productTitle: string;
  index: number;
  tokens: DownloadTokenView[] | undefined;
}) {
  const redeemToken = useRedeemDownloadToken();
  const [downloading, setDownloading] = useState(false);

  // Find a token matching this order — prefer non-used, non-expired
  const orderToken = tokens?.find(
    (t) => t.orderId === order.id && !t.isUsed && !isTokenExpired(t),
  );
  // Check if there's any token at all (even expired/used)
  const anyToken = tokens?.find((t) => t.orderId === order.id);
  const tokenExpired = anyToken && !orderToken;

  const handleDownload = async () => {
    if (!orderToken) return;
    setDownloading(true);
    try {
      toast.loading("Preparing download…", { id: "dl" });
      const blob = await redeemToken.mutateAsync(orderToken.token);
      if (!blob) {
        toast.error("Download link is no longer valid.", { id: "dl" });
        return;
      }
      const url = blob.getDirectURL();
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${productTitle.replace(/\s+/g, "-")}.zip`;
      anchor.click();
      toast.success("Download started!", { id: "dl" });
    } catch {
      toast.error("Download failed. Please try again.", { id: "dl" });
    } finally {
      setDownloading(false);
    }
  };

  const statusCfg = STATUS_CONFIG[order.status];
  const createdDate = new Date(
    Number(order.createdAt) / 1_000_000,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <Card
        className="bg-card border-border p-5 sm:p-6 transition-smooth hover:shadow-elevated"
        data-ocid={`orders.item.${index + 1}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          {/* Left: info */}
          <div className="flex items-start gap-4 min-w-0">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Package className="h-6 w-6 text-primary" />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-foreground mb-0.5 truncate">
                {productTitle}
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                Order #{order.id.toString()} &middot;{" "}
                {PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod}{" "}
                &middot; {createdDate}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  className={`gap-1.5 text-xs border ${statusCfg.className}`}
                >
                  {statusCfg.icon}
                  {statusCfg.label}
                </Badge>

                {/* Download count when approved */}
                {order.status === OrderStatus.Approved && orderToken && (
                  <span className="text-xs text-muted-foreground">
                    Downloads: {orderToken.downloadCount.toString()}
                  </span>
                )}
              </div>

              {/* Rejection reason */}
              {order.status === OrderStatus.Rejected &&
                order.rejectionReason && (
                  <p className="text-xs text-destructive mt-2 flex items-start gap-1">
                    <XCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    {order.rejectionReason}
                  </p>
                )}

              {/* Expired token notice */}
              {order.status === OrderStatus.Approved && tokenExpired && (
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Download link has expired. Contact support.
                </p>
              )}
            </div>
          </div>

          {/* Right: actions */}
          {order.status === OrderStatus.Approved && (
            <Button
              size="sm"
              onClick={handleDownload}
              disabled={!orderToken || downloading}
              variant={orderToken ? "default" : "outline"}
              data-ocid={`orders.download_button.${index + 1}`}
              className="gap-2 shrink-0 self-start"
            >
              {downloading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              {tokenExpired
                ? "Link Expired"
                : downloading
                  ? "Downloading…"
                  : "Download"}
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const { data: orders, isLoading } = useListMyOrders();
  const { data: products } = useListProducts();
  const { data: tokens } = useListMyDownloadTokens();

  const getProductTitle = (productId: bigint) =>
    products?.find((p) => p.id === productId)?.title ?? `Product #${productId}`;

  // Sort newest first
  const sortedOrders = orders
    ? [...orders].sort((a, b) => Number(b.createdAt - a.createdAt))
    : [];

  return (
    <div className="fade-in" data-ocid="orders.page">
      {/* Page header */}
      <div className="bg-card border-b border-border py-12">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            My Orders
          </h1>
          <p className="text-muted-foreground">
            Track purchases and download your approved files
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-3xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col gap-4" data-ocid="orders.loading_state">
            {Array.from({ length: 3 }, (_, i) => `skeleton-order-${i}`).map(
              (key) => (
                <Skeleton key={key} className="h-28 rounded-xl" />
              ),
            )}
          </div>
        ) : sortedOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
            data-ocid="orders.empty_state"
          >
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-muted mx-auto mb-5">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">
              No orders yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xs mx-auto">
              Browse our marketplace and make your first purchase to see it
              here.
            </p>
            <Button asChild data-ocid="orders.browse_button">
              <Link to="/products">
                Browse Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4" data-ocid="orders.list">
            {sortedOrders.map((order, i) => (
              <OrderCard
                key={order.id.toString()}
                order={order}
                productTitle={getProductTitle(order.productId)}
                index={i}
                tokens={tokens}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
