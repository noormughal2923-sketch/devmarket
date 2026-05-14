import { n as useListMyOrders, u as useListProducts, o as useListMyDownloadTokens, j as jsxRuntimeExports, S as Skeleton, a as Button, L as Link, p as useRedeemDownloadToken, r as reactExports, g as Package, B as Badge, O as OrderStatus } from "./index-REj_Qory.js";
import { C as Card } from "./card-BRsK_EN0.js";
import { u as ue } from "./index-BXafDmMA.js";
import { m as motion } from "./proxy-Bt9ftd_9.js";
import { S as ShoppingBag } from "./shopping-bag-BdtiP6Hs.js";
import { A as ArrowRight } from "./arrow-right-C0k4KogH.js";
import { C as CircleX } from "./circle-x-BrRAZfWI.js";
import { C as Clock } from "./clock-BQNDPLre.js";
import { R as RefreshCw } from "./refresh-cw-D3N7wGgk.js";
import { D as Download } from "./download-CFFuZjHH.js";
import { C as CircleCheck } from "./circle-check-BKLBpzMw.js";
const STATUS_CONFIG = {
  [OrderStatus.PendingVerification]: {
    label: "Pending Verification",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
    className: "bg-accent/15 text-accent border-accent/30"
  },
  [OrderStatus.Approved]: {
    label: "Approved",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-3.5 w-3.5" }),
    className: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30"
  },
  [OrderStatus.Rejected]: {
    label: "Rejected",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5" }),
    className: "bg-destructive/15 text-destructive border-destructive/30"
  }
};
const PAYMENT_LABEL = {
  JazzCash: "JazzCash",
  ABL: "Allied Bank"
};
function isTokenExpired(token) {
  return Number(token.expiresAt) / 1e6 < Date.now();
}
function OrderCard({
  order,
  productTitle,
  index,
  tokens
}) {
  const redeemToken = useRedeemDownloadToken();
  const [downloading, setDownloading] = reactExports.useState(false);
  const orderToken = tokens == null ? void 0 : tokens.find(
    (t) => t.orderId === order.id && !t.isUsed && !isTokenExpired(t)
  );
  const anyToken = tokens == null ? void 0 : tokens.find((t) => t.orderId === order.id);
  const tokenExpired = anyToken && !orderToken;
  const handleDownload = async () => {
    if (!orderToken) return;
    setDownloading(true);
    try {
      ue.loading("Preparing download…", { id: "dl" });
      const blob = await redeemToken.mutateAsync(orderToken.token);
      if (!blob) {
        ue.error("Download link is no longer valid.", { id: "dl" });
        return;
      }
      const url = blob.getDirectURL();
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${productTitle.replace(/\s+/g, "-")}.zip`;
      anchor.click();
      ue.success("Download started!", { id: "dl" });
    } catch {
      ue.error("Download failed. Please try again.", { id: "dl" });
    } finally {
      setDownloading(false);
    }
  };
  const statusCfg = STATUS_CONFIG[order.status];
  const createdDate = new Date(
    Number(order.createdAt) / 1e6
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.06, duration: 0.35 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Card,
        {
          className: "bg-card border-border p-5 sm:p-6 transition-smooth hover:shadow-elevated",
          "data-ocid": `orders.item.${index + 1}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-6 w-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-0.5 truncate", children: productTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-2", children: [
                  "Order #",
                  order.id.toString(),
                  " ·",
                  " ",
                  PAYMENT_LABEL[order.paymentMethod] ?? order.paymentMethod,
                  " ",
                  "· ",
                  createdDate
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: `gap-1.5 text-xs border ${statusCfg.className}`,
                      children: [
                        statusCfg.icon,
                        statusCfg.label
                      ]
                    }
                  ),
                  order.status === OrderStatus.Approved && orderToken && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Downloads: ",
                    orderToken.downloadCount.toString()
                  ] })
                ] }),
                order.status === OrderStatus.Rejected && order.rejectionReason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive mt-2 flex items-start gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-3.5 w-3.5 mt-0.5 shrink-0" }),
                  order.rejectionReason
                ] }),
                order.status === OrderStatus.Approved && tokenExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
                  "Download link has expired. Contact support."
                ] })
              ] })
            ] }),
            order.status === OrderStatus.Approved && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleDownload,
                disabled: !orderToken || downloading,
                variant: orderToken ? "default" : "outline",
                "data-ocid": `orders.download_button.${index + 1}`,
                className: "gap-2 shrink-0 self-start",
                children: [
                  downloading ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                  tokenExpired ? "Link Expired" : downloading ? "Downloading…" : "Download"
                ]
              }
            )
          ] })
        }
      )
    }
  );
}
function OrdersPage() {
  const { data: orders, isLoading } = useListMyOrders();
  const { data: products } = useListProducts();
  const { data: tokens } = useListMyDownloadTokens();
  const getProductTitle = (productId) => {
    var _a;
    return ((_a = products == null ? void 0 : products.find((p) => p.id === productId)) == null ? void 0 : _a.title) ?? `Product #${productId}`;
  };
  const sortedOrders = orders ? [...orders].sort((a, b) => Number(b.createdAt - a.createdAt)) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-in", "data-ocid": "orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-3xl mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-1", children: "My Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Track purchases and download your approved files" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-3xl mx-auto px-4 py-8", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "orders.loading_state", children: Array.from({ length: 3 }, (_, i) => `skeleton-order-${i}`).map(
      (key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" }, key)
    ) }) : sortedOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        className: "text-center py-24",
        "data-ocid": "orders.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-muted mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-10 w-10 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground mb-2", children: "No orders yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-xs mx-auto", children: "Browse our marketplace and make your first purchase to see it here." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "orders.browse_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/products", children: [
            "Browse Products",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 ml-2" })
          ] }) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "orders.list", children: sortedOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      OrderCard,
      {
        order,
        productTitle: getProductTitle(order.productId),
        index: i,
        tokens
      },
      order.id.toString()
    )) }) })
  ] });
}
export {
  OrdersPage as default
};
