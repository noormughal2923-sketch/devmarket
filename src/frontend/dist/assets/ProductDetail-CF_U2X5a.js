import { c as createLucideIcon, e as useParams, f as useGetProduct, b as useCart, j as jsxRuntimeExports, L as Link, a as Button, B as Badge, d as ShoppingCart, Z as Zap, S as Skeleton } from "./index-REj_Qory.js";
import { C as Card } from "./card-BRsK_EN0.js";
import { S as Separator } from "./separator-DFFkqXKi.js";
import { C as CodeXml, P as Puzzle, F as FileCode2 } from "./puzzle-CglZ_pzD.js";
import { A as ArrowLeft } from "./arrow-left-B77sWEmj.js";
import { m as motion } from "./proxy-Bt9ftd_9.js";
import { C as Check } from "./check-BgJm3Sbk.js";
import { S as Shield } from "./shield-iRWk5xBy.js";
import { D as Download } from "./download-CFFuZjHH.js";
import { L as LayoutTemplate } from "./layout-template-BIPhdyIU.js";
import { S as Smartphone } from "./smartphone-mG7cAPCh.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
];
const FileDown = createLucideIcon("file-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const CATEGORY_ICONS = {
  WebApp: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-5 w-5" }),
  MobileApp: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-5 w-5" }),
  Script: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode2, { className: "h-5 w-5" }),
  Template: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "h-5 w-5" }),
  Plugin: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "h-5 w-5" })
};
const CATEGORY_GRADIENTS = {
  WebApp: "from-indigo-500/20 to-violet-500/10",
  MobileApp: "from-sky-500/20 to-cyan-500/10",
  Script: "from-emerald-500/20 to-teal-500/10",
  Template: "from-orange-500/20 to-amber-500/10",
  Plugin: "from-rose-500/20 to-pink-500/10"
};
function formatPrice(priceUsd) {
  return `$${Number(priceUsd).toFixed(2)}`;
}
function DetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-48 mb-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-24 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-14 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-32 mt-4 rounded-lg" })
      ] })
    ] })
  ] });
}
function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const productId = BigInt(id);
  const { data: product, isLoading } = useGetProduct(productId);
  const { addItem, hasItem } = useCart();
  const inCart = product ? hasItem(product.id) : false;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DetailSkeleton, {});
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4",
        "data-ocid": "product_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-7 w-7 text-muted-foreground/50" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground", children: "Product Not Found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs", children: "This product may have been removed or the link is invalid." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              className: "gap-2 mt-2",
              "data-ocid": "product_detail.back_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                " Back to Products"
              ]
            }
          ) })
        ]
      }
    );
  }
  const gradient = CATEGORY_GRADIENTS[product.category] ?? "from-primary/20 to-primary/5";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fade-in",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.4 },
      "data-ocid": "product_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-5xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "nav",
          {
            className: "flex items-center gap-1.5 text-sm text-muted-foreground",
            "aria-label": "Breadcrumb",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/",
                  className: "hover:text-foreground transition-colors",
                  "data-ocid": "product_detail.home_breadcrumb",
                  children: "Home"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/products",
                  className: "hover:text-foreground transition-colors",
                  "data-ocid": "product_detail.products_breadcrumb",
                  children: "Products"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium truncate max-w-[200px]", children: product.title })
            ]
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-5xl mx-auto px-4 py-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10 mb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.1, duration: 0.4 },
                className: "aspect-video rounded-xl overflow-hidden bg-muted shadow-elevated",
                children: product.previewImageBlob ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.previewImageBlob.getDirectURL(),
                    alt: product.title,
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/20 scale-[3]", children: CATEGORY_ICONS[product.category] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-12 w-12" }) })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: 20 },
                animate: { opacity: 1, x: 0 },
                transition: { delay: 0.15, duration: 0.4 },
                className: "flex flex-col",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "self-start mb-4 bg-primary/10 text-primary border border-primary/20 gap-1.5 px-3 py-1", children: [
                    CATEGORY_ICONS[product.category],
                    product.category
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-display font-bold text-foreground mb-3 leading-tight", children: product.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-5 line-clamp-4", children: product.description }),
                  product.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: product.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "secondary",
                      className: "gap-1 text-xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
                        tag
                      ]
                    },
                    tag
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mb-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-5xl font-bold text-accent leading-none",
                        "data-ocid": "product_detail.price",
                        children: formatPrice(product.priceUsd)
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "USD · one-time" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "button",
                        size: "lg",
                        onClick: () => {
                          var _a;
                          return addItem({
                            productId: product.id,
                            title: product.title,
                            priceUsd: product.priceUsd,
                            category: product.category,
                            previewImageUrl: (_a = product.previewImageBlob) == null ? void 0 : _a.getDirectURL()
                          });
                        },
                        disabled: inCart,
                        "data-ocid": "product_detail.add_to_cart_button",
                        className: "gap-2 flex-1 md:flex-none min-w-[160px]",
                        children: [
                          inCart ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-5 w-5" }),
                          inCart ? "In Cart" : "Add to Cart"
                        ]
                      }
                    ),
                    inCart && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "outline",
                        size: "lg",
                        "data-ocid": "product_detail.view_cart_button",
                        className: "gap-2",
                        children: "View Cart"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-6" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
                      text: "Admin-verified payment"
                    },
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4" }),
                      text: "Secure download link"
                    },
                    { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4" }), text: "Instant delivery" },
                    {
                      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                      text: "Lifetime access"
                    }
                  ].map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 text-sm text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary shrink-0", children: badge.icon }),
                        badge.text
                      ]
                    },
                    badge.text
                  )) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.4 },
              className: "space-y-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "bg-card border-border p-7", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-4", children: "About this product" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed whitespace-pre-line", children: product.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Card,
                  {
                    className: "bg-card border-border p-7",
                    "data-ocid": "product_detail.download_info",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "h-6 w-6 text-primary" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-semibold text-foreground mb-1", children: "Digital Download Included" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "After your payment is verified by an admin, you will receive a secure, time-limited download link for this product. All files are delivered digitally — no physical shipment. Downloads are tied to your account and expire after use." }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 mt-4", children: [
                          {
                            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5" }),
                            label: "Tokenised link"
                          },
                          {
                            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
                            label: "Account-bound"
                          },
                          {
                            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5" }),
                            label: "Fast delivery"
                          }
                        ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "inline-flex items-center gap-1.5 text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: item.icon }),
                              item.label
                            ]
                          },
                          item.label
                        )) })
                      ] })
                    ] })
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  ProductDetailPage as default
};
