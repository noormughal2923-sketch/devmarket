import { AdminLayout } from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAdminApproveOrder,
  useAdminListOrders,
  useAdminRejectOrder,
} from "@/hooks/useBackend";
import type { OrderId, OrderView } from "@/types/marketplace";
import { OrderStatus } from "@/types/marketplace";
import { CheckCircle2, Eye, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FilterTab = "all" | "pending" | "approved" | "rejected";

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
  return new Date(Number(ts / 1_000_000n)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncatePrincipal(p: { toString(): string }) {
  const s = p.toString();
  return s.length > 20 ? `${s.slice(0, 10)}\u2026${s.slice(-6)}` : s;
}

// Modal: view payment proof image
function ProofModal({
  open,
  onClose,
  order,
}: {
  open: boolean;
  onClose: () => void;
  order: OrderView | null;
}) {
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Eagerly load blob when we have a blob reference
  const blobRef = order?.paymentProofBlob ?? null;
  useEffect(() => {
    if (open && blobRef && !proofUrl) {
      setLoading(true);
      blobRef
        .getBytes()
        .then((bytes) => {
          const blob = new Blob([bytes], { type: "image/*" });
          setProofUrl(URL.createObjectURL(blob));
        })
        .catch(() => setProofUrl(null))
        .finally(() => setLoading(false));
    }
    if (!open) setProofUrl(null);
  }, [open, blobRef, proofUrl]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg" data-ocid="admin.proof_dialog">
        <DialogHeader>
          <DialogTitle className="font-display">
            Payment Proof \u2014 Order #{order?.id.toString()}
          </DialogTitle>
        </DialogHeader>
        <div className="min-h-48 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
          {loading && <Skeleton className="w-full h-64" />}
          {!loading && proofUrl && (
            <img
              src={proofUrl}
              alt="Payment proof"
              className="max-w-full max-h-96 object-contain rounded-lg"
            />
          )}
          {!loading && !proofUrl && (
            <p className="text-muted-foreground text-sm">
              No proof image uploaded.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="admin.proof_dialog.close_button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Modal: reject with reason
function RejectModal({
  open,
  onClose,
  onConfirm,
  isPending,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isPending: boolean;
}) {
  const [reason, setReason] = useState("");
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md" data-ocid="admin.reject_dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Reject Order</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Label htmlFor="rejection-reason">Rejection Reason</Label>
          <Input
            id="rejection-reason"
            placeholder="e.g. Payment amount mismatch"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            data-ocid="admin.reject_dialog.reason_input"
          />
        </div>
        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            data-ocid="admin.reject_dialog.cancel_button"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={!reason.trim() || isPending}
            onClick={() => onConfirm(reason.trim())}
            data-ocid="admin.reject_dialog.confirm_button"
          >
            {isPending ? "Rejecting\u2026" : "Reject Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Modal: approve success
function ApproveSuccessModal({
  open,
  onClose,
  token,
  orderId,
}: {
  open: boolean;
  onClose: () => void;
  token: string;
  orderId: OrderId | null;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-md"
        data-ocid="admin.approve_success_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Order Approved
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Order #{orderId?.toString()} has been approved. Download token
            generated:
          </p>
          <code className="block text-xs font-mono bg-muted rounded-lg px-3 py-2.5 text-foreground break-all">
            {token}
          </code>
          <p className="text-xs text-muted-foreground">
            The buyer will now have access to their download link.
          </p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
            data-ocid="admin.approve_success_dialog.close_button"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminOrders() {
  const { data: orders, isLoading } = useAdminListOrders();
  const approveOrder = useAdminApproveOrder();
  const rejectOrder = useAdminRejectOrder();

  const [filter, setFilter] = useState<FilterTab>("all");
  const [proofOrder, setProofOrder] = useState<OrderView | null>(null);
  const [rejectTarget, setRejectTarget] = useState<OrderId | null>(null);
  const [approvedToken, setApprovedToken] = useState<{
    token: string;
    orderId: OrderId;
  } | null>(null);

  const filtered = (orders ?? [])
    .filter((o) => {
      if (filter === "pending")
        return o.status === OrderStatus.PendingVerification;
      if (filter === "approved") return o.status === OrderStatus.Approved;
      if (filter === "rejected") return o.status === OrderStatus.Rejected;
      return true;
    })
    .sort((a, b) => Number(b.createdAt - a.createdAt));

  async function handleApprove(orderId: OrderId) {
    try {
      const token = await approveOrder.mutateAsync(orderId);
      setApprovedToken({ token, orderId });
    } catch (err) {
      toast.error(
        `Approval failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  async function handleReject(reason: string) {
    if (rejectTarget === null) return;
    try {
      await rejectOrder.mutateAsync({ orderId: rejectTarget, reason });
      toast.success("Order rejected.");
      setRejectTarget(null);
    } catch (err) {
      toast.error(
        `Rejection failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-5 fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Orders
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Review, approve, or reject customer payment submissions
          </p>
        </div>

        {/* Filter tabs */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)}>
          <TabsList data-ocid="admin.orders.filter_tabs">
            <TabsTrigger value="all" data-ocid="admin.orders.filter.all_tab">
              All
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              data-ocid="admin.orders.filter.pending_tab"
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              data-ocid="admin.orders.filter.approved_tab"
            >
              Approved
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              data-ocid="admin.orders.filter.rejected_tab"
            >
              Rejected
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Table */}
        <Card data-ocid="admin.orders_table">
          <CardContent className="p-0">
            {isLoading ? (
              <div
                className="p-6 space-y-3"
                data-ocid="admin.orders.loading_state"
              >
                {[1, 2, 3].map((n) => (
                  <Skeleton key={n} className="h-12 w-full" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div
                className="py-12 text-center text-muted-foreground text-sm"
                data-ocid="admin.orders.empty_state"
              >
                No orders match this filter.
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
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order, i) => (
                      <tr
                        key={order.id.toString()}
                        className="border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors"
                        data-ocid={`admin.order.item.${i + 1}`}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap">
                          #{order.id.toString()}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-foreground max-w-[140px] truncate">
                          {truncatePrincipal(order.buyerPrincipal)}
                        </td>
                        <td className="px-4 py-3 text-foreground whitespace-nowrap">
                          #{order.productId.toString()}
                        </td>
                        <td className="px-4 py-3 text-foreground whitespace-nowrap">
                          {order.paymentMethod}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <OrderStatusBadge status={order.status} />
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {order.paymentProofBlob && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs gap-1"
                                onClick={() => setProofOrder(order)}
                                data-ocid={`admin.order.view_proof_button.${i + 1}`}
                              >
                                <Eye className="w-3.5 h-3.5" /> Proof
                              </Button>
                            )}
                            {order.status ===
                              OrderStatus.PendingVerification && (
                              <>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-xs gap-1 bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30"
                                  disabled={approveOrder.isPending}
                                  onClick={() => handleApprove(order.id)}
                                  data-ocid={`admin.order.approve_button.${i + 1}`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                                  Approve
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 px-2 text-xs gap-1 bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/25"
                                  onClick={() => setRejectTarget(order.id)}
                                  data-ocid={`admin.order.reject_button.${i + 1}`}
                                >
                                  <XCircle className="w-3.5 h-3.5" /> Reject
                                </Button>
                              </>
                            )}
                          </div>
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

      {/* Modals */}
      <ProofModal
        open={proofOrder !== null}
        onClose={() => setProofOrder(null)}
        order={proofOrder}
      />
      <RejectModal
        open={rejectTarget !== null}
        onClose={() => setRejectTarget(null)}
        onConfirm={handleReject}
        isPending={rejectOrder.isPending}
      />
      <ApproveSuccessModal
        open={approvedToken !== null}
        onClose={() => setApprovedToken(null)}
        token={approvedToken?.token ?? ""}
        orderId={approvedToken?.orderId ?? null}
      />
    </AdminLayout>
  );
}
