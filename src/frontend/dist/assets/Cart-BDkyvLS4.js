import { c as createLucideIcon, b as useCart, j as jsxRuntimeExports, L as Link, a as Button, g as Package, B as Badge } from "./index-REj_Qory.js";
import { C as Card, a as CardContent, b as CardHeader, c as CardTitle, d as CardFooter } from "./card-BRsK_EN0.js";
import { S as Separator } from "./separator-DFFkqXKi.js";
import { m as motion } from "./proxy-Bt9ftd_9.js";
import { S as ShoppingBag } from "./shopping-bag-BdtiP6Hs.js";
import { A as ArrowRight } from "./arrow-right-C0k4KogH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function formatUsd(cents) {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}
function Cart() {
  const { items, totalAmount, removeItem } = useCart();
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4",
        "data-ocid": "cart.empty_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "flex flex-col items-center gap-4 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-12 h-12 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: "Your cart is empty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm", children: "Discover our premium digital projects and add them to your cart." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", "data-ocid": "cart.browse_products_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "default", size: "lg", className: "mt-2 gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                "Browse Products"
              ] }) })
            ]
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-2", children: "Shopping Cart" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-8", children: [
            items.length,
            " ",
            items.length === 1 ? "item" : "items",
            " in your cart"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "lg:col-span-2 flex flex-col gap-3",
          "data-ocid": "cart.list",
          children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -12 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.3, delay: index * 0.07 },
              "data-ocid": `cart.item.${index + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden border border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0", children: item.previewImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: item.previewImageUrl,
                    alt: item.title,
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-6 h-6 text-muted-foreground" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground truncate", children: item.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "mt-1 text-xs", children: item.category })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-accent-foreground bg-accent/20 px-2 py-0.5 rounded-md flex-shrink-0", children: formatUsd(item.priceUsd * BigInt(item.quantity)) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                      formatUsd(item.priceUsd),
                      " × ",
                      item.quantity
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        className: "text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 -mr-1",
                        onClick: () => removeItem(item.productId),
                        "data-ocid": `cart.delete_button.${index + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                          "Remove"
                        ]
                      }
                    )
                  ] })
                ] })
              ] }) })
            },
            item.productId.toString()
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, delay: 0.15 },
          "data-ocid": "cart.summary_panel",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border border-border shadow-elevated sticky top-24", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-display text-lg", children: "Order Summary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex justify-between text-sm",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate mr-2 max-w-[180px]", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground flex-shrink-0", children: formatUsd(item.priceUsd * BigInt(item.quantity)) })
                  ]
                },
                item.productId.toString()
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display font-bold text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subtotal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-foreground", children: formatUsd(totalAmount) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All prices in USD. Payment via JazzCash or Allied Bank." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "pt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/checkout",
                className: "w-full",
                "data-ocid": "cart.checkout_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    className: "w-full gap-2 font-semibold",
                    size: "lg",
                    children: [
                      "Proceed to Checkout",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                    ]
                  }
                )
              }
            ) })
          ] })
        }
      )
    ] })
  ] });
}
export {
  Cart as default
};
