import { c as createLucideIcon, al as useRouterState, j as jsxRuntimeExports, B as Badge, d as ShoppingCart, g as Package, L as Link, h as cn, a as Button } from "./index-REj_Qory.js";
import { S as Separator } from "./separator-DFFkqXKi.js";
import { A as ArrowLeft } from "./arrow-left-B77sWEmj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
];
const FileText = createLucideIcon("file-text", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode);
const navItems = [
  {
    label: "Dashboard",
    href: "/x7k9m-admin",
    icon: LayoutDashboard,
    exact: true
  },
  {
    label: "Orders",
    href: "/x7k9m-admin/orders",
    icon: ShoppingCart,
    exact: false
  },
  {
    label: "Products",
    href: "/x7k9m-admin/products",
    icon: Package,
    exact: false
  },
  {
    label: "Audit Logs",
    href: "/x7k9m-admin/logs",
    icon: FileText,
    exact: false
  }
];
function AdminLayout({ children }) {
  var _a;
  const { location } = useRouterState();
  const pathname = location.pathname;
  const isActive = (href, exact) => exact ? pathname === href : pathname.startsWith(href);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 shrink-0 border-r border-border bg-sidebar flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-6 pb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "w-4 h-4 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-sidebar-foreground text-base", children: "Admin Panel" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs border-destructive/40 text-destructive bg-destructive/5 mt-1",
            children: "Restricted Access"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-sidebar-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "nav",
        {
          className: "flex-1 py-4 px-3 space-y-0.5",
          "aria-label": "Admin navigation",
          children: navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.href,
                "data-ocid": `admin.nav.${item.label.toLowerCase().replace(" ", "_")}`,
                className: cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  active ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                ),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 shrink-0" }),
                  item.label
                ]
              },
              item.href
            );
          })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-sidebar-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          className: "w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent",
          "data-ocid": "admin.back_to_site_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            "Back to Site"
          ]
        }
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-14 border-b border-border bg-card flex items-center px-6 gap-3 shadow-subtle shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs font-mono", children: "Admin Zone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: ((_a = navItems.find((n) => isActive(n.href, n.exact))) == null ? void 0 : _a.label) ?? "Panel" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-6 overflow-auto", children })
    ] })
  ] });
}
export {
  AdminLayout as A
};
