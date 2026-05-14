import { c as createLucideIcon, r as reactExports, z as useDirection, A as useControllableState, j as jsxRuntimeExports, y as Primitive, C as useId, a5 as Root, a6 as Item, G as composeEventHandlers, a7 as createRovingFocusGroupScope, Y as createContextScope, a8 as Presence, h as cn, w as useAdminListOrders, a9 as useAdminApproveOrder, aa as useAdminRejectOrder, O as OrderStatus, S as Skeleton, a as Button, B as Badge } from "./index-REj_Qory.js";
import { A as AdminLayout } from "./AdminLayout-CENapWJP.js";
import { C as Card, a as CardContent } from "./card-BRsK_EN0.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogFooter } from "./dialog-TYPV-URU.js";
import { I as Input } from "./input-C9nypxBK.js";
import { L as Label } from "./label-Bg8WZHQ0.js";
import { u as ue } from "./index-BXafDmMA.js";
import { C as CircleCheck } from "./circle-check-BKLBpzMw.js";
import { C as CircleX } from "./circle-x-BrRAZfWI.js";
import "./separator-DFFkqXKi.js";
import "./arrow-left-B77sWEmj.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode);
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
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
  return new Date(Number(ts / 1000000n)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function truncatePrincipal(p) {
  const s = p.toString();
  return s.length > 20 ? `${s.slice(0, 10)}…${s.slice(-6)}` : s;
}
function ProofModal({
  open,
  onClose,
  order
}) {
  const [proofUrl, setProofUrl] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const blobRef = (order == null ? void 0 : order.paymentProofBlob) ?? null;
  reactExports.useEffect(() => {
    if (open && blobRef && !proofUrl) {
      setLoading(true);
      blobRef.getBytes().then((bytes) => {
        const blob = new Blob([bytes], { type: "image/*" });
        setProofUrl(URL.createObjectURL(blob));
      }).catch(() => setProofUrl(null)).finally(() => setLoading(false));
    }
    if (!open) setProofUrl(null);
  }, [open, blobRef, proofUrl]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", "data-ocid": "admin.proof_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display", children: [
      "Payment Proof \\u2014 Order #",
      order == null ? void 0 : order.id.toString()
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-48 flex items-center justify-center bg-muted rounded-lg overflow-hidden", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-full h-64" }),
      !loading && proofUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: proofUrl,
          alt: "Payment proof",
          className: "max-w-full max-h-96 object-contain rounded-lg"
        }
      ),
      !loading && !proofUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No proof image uploaded." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "outline",
        onClick: onClose,
        "data-ocid": "admin.proof_dialog.close_button",
        children: "Close"
      }
    ) })
  ] }) });
}
function RejectModal({
  open,
  onClose,
  onConfirm,
  isPending
}) {
  const [reason, setReason] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", "data-ocid": "admin.reject_dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Reject Order" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rejection-reason", children: "Rejection Reason" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "rejection-reason",
          placeholder: "e.g. Payment amount mismatch",
          value: reason,
          onChange: (e) => setReason(e.target.value),
          "data-ocid": "admin.reject_dialog.reason_input"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          "data-ocid": "admin.reject_dialog.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "destructive",
          disabled: !reason.trim() || isPending,
          onClick: () => onConfirm(reason.trim()),
          "data-ocid": "admin.reject_dialog.confirm_button",
          children: isPending ? "Rejecting…" : "Reject Order"
        }
      )
    ] })
  ] }) });
}
function ApproveSuccessModal({
  open,
  onClose,
  token,
  orderId
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-md",
      "data-ocid": "admin.approve_success_dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary" }),
          "Order Approved"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "Order #",
            orderId == null ? void 0 : orderId.toString(),
            " has been approved. Download token generated:"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "block text-xs font-mono bg-muted rounded-lg px-3 py-2.5 text-foreground break-all", children: token }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The buyer will now have access to their download link." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: onClose,
            "data-ocid": "admin.approve_success_dialog.close_button",
            children: "Done"
          }
        ) })
      ]
    }
  ) });
}
function AdminOrders() {
  const { data: orders, isLoading } = useAdminListOrders();
  const approveOrder = useAdminApproveOrder();
  const rejectOrder = useAdminRejectOrder();
  const [filter, setFilter] = reactExports.useState("all");
  const [proofOrder, setProofOrder] = reactExports.useState(null);
  const [rejectTarget, setRejectTarget] = reactExports.useState(null);
  const [approvedToken, setApprovedToken] = reactExports.useState(null);
  const filtered = (orders ?? []).filter((o) => {
    if (filter === "pending")
      return o.status === OrderStatus.PendingVerification;
    if (filter === "approved") return o.status === OrderStatus.Approved;
    if (filter === "rejected") return o.status === OrderStatus.Rejected;
    return true;
  }).sort((a, b) => Number(b.createdAt - a.createdAt));
  async function handleApprove(orderId) {
    try {
      const token = await approveOrder.mutateAsync(orderId);
      setApprovedToken({ token, orderId });
    } catch (err) {
      ue.error(
        `Approval failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  }
  async function handleReject(reason) {
    if (rejectTarget === null) return;
    try {
      await rejectOrder.mutateAsync({ orderId: rejectTarget, reason });
      ue.success("Order rejected.");
      setRejectTarget(null);
    } catch (err) {
      ue.error(
        `Rejection failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AdminLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Review, approve, or reject customer payment submissions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { value: filter, onValueChange: (v) => setFilter(v), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { "data-ocid": "admin.orders.filter_tabs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "admin.orders.filter.all_tab", children: "All" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "pending",
            "data-ocid": "admin.orders.filter.pending_tab",
            children: "Pending"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "approved",
            "data-ocid": "admin.orders.filter.approved_tab",
            children: "Approved"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsTrigger,
          {
            value: "rejected",
            "data-ocid": "admin.orders.filter.rejected_tab",
            children: "Rejected"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "admin.orders_table", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "p-6 space-y-3",
          "data-ocid": "admin.orders.loading_state",
          children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" }, n))
        }
      ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "py-12 text-center text-muted-foreground text-sm",
          "data-ocid": "admin.orders.empty_state",
          children: "No orders match this filter."
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border bg-muted/30", children: [
          "Order ID",
          "Buyer",
          "Product",
          "Method",
          "Status",
          "Date",
          "Actions"
        ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wide whitespace-nowrap",
            children: h
          },
          h
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((order, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors",
            "data-ocid": `admin.order.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs text-muted-foreground whitespace-nowrap", children: [
                "#",
                order.id.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-mono text-xs text-foreground max-w-[140px] truncate", children: truncatePrincipal(order.buyerPrincipal) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-foreground whitespace-nowrap", children: [
                "#",
                order.productId.toString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-foreground whitespace-nowrap", children: order.paymentMethod }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrderStatusBadge, { status: order.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground whitespace-nowrap", children: formatDate(order.createdAt) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                order.paymentProofBlob && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 px-2 text-xs gap-1",
                    onClick: () => setProofOrder(order),
                    "data-ocid": `admin.order.view_proof_button.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
                      " Proof"
                    ]
                  }
                ),
                order.status === OrderStatus.PendingVerification && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 px-2 text-xs gap-1 bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30",
                      disabled: approveOrder.isPending,
                      onClick: () => handleApprove(order.id),
                      "data-ocid": `admin.order.approve_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                        " ",
                        "Approve"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "ghost",
                      className: "h-7 px-2 text-xs gap-1 bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/25",
                      onClick: () => setRejectTarget(order.id),
                      "data-ocid": `admin.order.reject_button.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3.5 h-3.5" }),
                        " Reject"
                      ]
                    }
                  )
                ] })
              ] }) })
            ]
          },
          order.id.toString()
        )) })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProofModal,
      {
        open: proofOrder !== null,
        onClose: () => setProofOrder(null),
        order: proofOrder
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RejectModal,
      {
        open: rejectTarget !== null,
        onClose: () => setRejectTarget(null),
        onConfirm: handleReject,
        isPending: rejectOrder.isPending
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ApproveSuccessModal,
      {
        open: approvedToken !== null,
        onClose: () => setApprovedToken(null),
        token: (approvedToken == null ? void 0 : approvedToken.token) ?? "",
        orderId: (approvedToken == null ? void 0 : approvedToken.orderId) ?? null
      }
    )
  ] });
}
export {
  AdminOrders as default
};
