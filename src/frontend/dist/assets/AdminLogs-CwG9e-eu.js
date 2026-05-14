import { ak as useAdminListAuditLogs, j as jsxRuntimeExports, a as Button, S as Skeleton } from "./index-REj_Qory.js";
import { A as AdminLayout } from "./AdminLayout-CENapWJP.js";
import { C as Card, a as CardContent } from "./card-BRsK_EN0.js";
import { R as RefreshCw } from "./refresh-cw-D3N7wGgk.js";
import { S as ShieldCheck } from "./shield-check-PPiVwMu9.js";
import "./separator-DFFkqXKi.js";
import "./arrow-left-B77sWEmj.js";
function truncatePrincipal(p) {
  const s = p.toString();
  return s.length > 20 ? `${s.slice(0, 10)}…${s.slice(-6)}` : s;
}
function formatTimestamp(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}
function AdminLogs() {
  const {
    data: logs,
    isLoading,
    refetch,
    isFetching
  } = useAdminListAuditLogs();
  const sorted = (logs ?? []).slice().sort((a, b) => Number(b.timestamp - a.timestamp));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Audit Logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "All administrative actions recorded in chronological order" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          className: "gap-2",
          onClick: () => refetch(),
          disabled: isFetching,
          "data-ocid": "admin.logs.refresh_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `w-4 h-4 ${isFetching ? "animate-spin" : ""}`
              }
            ),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "admin.logs_table", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-6 space-y-3",
        "data-ocid": "admin.logs.loading_state",
        children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, n))
      }
    ) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "py-16 flex flex-col items-center gap-3 text-muted-foreground",
        "data-ocid": "admin.logs.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 opacity-30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "No audit logs recorded yet." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
        "Timestamp",
        "Admin",
        "Action",
        "Target",
        "Details"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((log, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors",
          "data-ocid": `admin.log.item.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap", children: formatTimestamp(log.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-mono text-xs text-foreground max-w-[140px] truncate", children: truncatePrincipal(log.adminPrincipal) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20", children: log.action }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-mono text-xs text-muted-foreground", children: log.targetId ?? "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-foreground text-xs max-w-xs truncate", children: log.details })
          ]
        },
        log.id.toString()
      )) })
    ] }) }) }) })
  ] }) });
}
export {
  AdminLogs as default
};
