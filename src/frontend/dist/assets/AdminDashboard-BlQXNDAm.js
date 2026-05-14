import { c as createLucideIcon, v as useAdminDashboardStats, w as useAdminListOrders, x as useAdminSeedProducts, j as jsxRuntimeExports, a as Button, g as Package, S as Skeleton, O as OrderStatus, B as Badge } from "./index-REj_Qory.js";
import { A as AdminLayout } from "./AdminLayout-CENapWJP.js";
import { C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./card-BRsK_EN0.js";
import { u as ue } from "./index-BXafDmMA.js";
import { C as Clock } from "./clock-BQNDPLre.js";
import { C as CircleCheck } from "./circle-check-BKLBpzMw.js";
import { C as CircleX } from "./circle-x-BrRAZfWI.js";
import { U as Users } from "./users-ChOwTIeK.js";
import "./separator-DFFkqXKi.js";
import "./arrow-left-B77sWEmj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 20h10", key: "e6iznv" }],
  ["path", { d: "M10 20c5.5-2.5.8-6.4 3-10", key: "161w41" }],
  [
    "path",
    {
      d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",
      key: "9gtqwd"
    }
  ],
  [
    "path",
    {
      d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",
      key: "bkxnd2"
    }
  ]
];
const Sprout = createLucideIcon("sprout", __iconNode);
function StatCard({
  label,
  value,
  icon: Icon,
  highlight,
  ocid
}) {
  const colorMap = {
    primary: "text-primary",
    gold: "text-accent",
    destructive: "text-destructive"
  };
  const bgMap = {
    primary: "bg-primary/10",
    gold: "bg-accent/10",
    destructive: "bg-destructive/10"
  };
  const iconColor = highlight ? colorMap[highlight] : "text-muted-foreground";
  const iconBg = highlight ? bgMap[highlight] : "bg-muted";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "card-hover", "data-ocid": ocid, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-5 pb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1", children: label }),
      value === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-display font-bold text-foreground", children: value.toString() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 ${iconColor}` })
      }
    )
  ] }) }) });
}
function OrderStatusBadge({ status }) {
  const map = {
    [OrderStatus.PendingVerification]: {
      label: "Pending",
      className: "bg-accent/15 text-accent border-accent/30"
    },
    [OrderStatus.Approved]: {
      label: "Approved",
      className: "bg-primary/15 text-primary border-primary/30"
    },
    [OrderStatus.Rejected]: {
      label: "Rejected",
      className: "bg-destructive/15 text-destructive border-destructive/30"
    }
  };
  const { label, className } = map[status] ?? { label: status, className: "" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: `text-xs font-medium ${className}`, children: label });
}
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function truncatePrincipal(p) {
  const s = p.toString();
  return s.length > 20 ? `${s.slice(0, 10)}…${s.slice(-6)}` : s;
}
function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useAdminDashboardStats();
  const { data: orders } = useAdminListOrders();
  const seedProducts = useAdminSeedProducts();
  const recentOrders = (orders ?? []).slice().sort((a, b) => Number(b.createdAt - a.createdAt)).slice(0, 5);
  async function handleSeed() {
    try {
      await seedProducts.mutateAsync();
      ue.success("Sample products seeded successfully!");
    } catch (err) {
      ue.error(
        `Seed failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Platform overview and recent activity" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2",
          onClick: handleSeed,
          disabled: seedProducts.isPending,
          "data-ocid": "admin.seed_products_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "w-4 h-4" }),
            seedProducts.isPending ? "Seeding…" : "Seed Products"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Total Orders",
          value: statsLoading ? void 0 : stats == null ? void 0 : stats.totalOrders,
          icon: Activity,
          ocid: "admin.stat.total_orders"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Pending",
          value: statsLoading ? void 0 : stats == null ? void 0 : stats.pendingOrders,
          icon: Clock,
          highlight: "gold",
          ocid: "admin.stat.pending_orders"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Approved",
          value: statsLoading ? void 0 : stats == null ? void 0 : stats.approvedOrders,
          icon: CircleCheck,
          highlight: "primary",
          ocid: "admin.stat.approved_orders"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Rejected",
          value: statsLoading ? void 0 : stats ? stats.totalOrders - stats.approvedOrders - stats.pendingOrders : void 0,
          icon: CircleX,
          highlight: "destructive",
          ocid: "admin.stat.rejected_orders"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Products",
          value: statsLoading ? void 0 : stats == null ? void 0 : stats.totalProducts,
          icon: Package,
          ocid: "admin.stat.total_products"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        StatCard,
        {
          label: "Users",
          value: statsLoading ? void 0 : stats == null ? void 0 : stats.totalUsers,
          icon: Users,
          ocid: "admin.stat.total_users"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "admin.recent_orders_table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base font-display font-semibold", children: "Recent Orders" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: recentOrders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "py-10 text-center text-muted-foreground text-sm",
          "data-ocid": "admin.recent_orders.empty_state",
          children: "No orders yet. Orders will appear here once users start purchasing."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
          "Order ID",
          "Buyer",
          "Product",
          "Method",
          "Status",
          "Date"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recentOrders.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors",
            "data-ocid": `admin.recent_order.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-mono text-xs text-muted-foreground", children: [
                "#",
                order.id.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-mono text-xs text-foreground", children: truncatePrincipal(order.buyerPrincipal) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 text-foreground", children: [
                "#",
                order.productId.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-foreground", children: order.paymentMethod }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-right text-muted-foreground", children: formatDate(order.createdAt) })
            ]
          },
          order.id.toString()
        )) })
      ] }) }) })
    ] })
  ] }) });
}
export {
  AdminDashboard as default
};
