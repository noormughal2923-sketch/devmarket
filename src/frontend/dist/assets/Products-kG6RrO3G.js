import { c as createLucideIcon, u as useListProducts, r as reactExports, j as jsxRuntimeExports, P as ProductCategory, a as Button, S as Skeleton, B as Badge, L as Link } from "./index-REj_Qory.js";
import { C as Card, a as CardContent } from "./card-BRsK_EN0.js";
import { I as Input } from "./input-C9nypxBK.js";
import { m as motion } from "./proxy-Bt9ftd_9.js";
import { S as Search } from "./search-AF05vaOo.js";
import { C as CodeXml, P as Puzzle, F as FileCode2 } from "./puzzle-CglZ_pzD.js";
import { L as LayoutTemplate } from "./layout-template-BIPhdyIU.js";
import { S as Smartphone } from "./smartphone-mG7cAPCh.js";
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
      d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
      key: "e7tb2h"
    }
  ],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["line", { x1: "12", x2: "12", y1: "22", y2: "12", key: "a4e8g8" }],
  ["circle", { cx: "18.5", cy: "15.5", r: "2.5", key: "b5zd12" }],
  ["path", { d: "M20.27 17.27 22 19", key: "1l4muz" }]
];
const PackageSearch = createLucideIcon("package-search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
];
const SlidersHorizontal = createLucideIcon("sliders-horizontal", __iconNode);
const CATEGORIES = [
  { value: "all", label: "All" },
  { value: ProductCategory.WebApp, label: "Web Apps" },
  { value: ProductCategory.MobileApp, label: "Mobile" },
  { value: ProductCategory.Script, label: "Scripts" },
  { value: ProductCategory.Template, label: "Templates" },
  { value: ProductCategory.Plugin, label: "Plugins" }
];
const CATEGORY_ICONS = {
  [ProductCategory.WebApp]: /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-4 w-4" }),
  [ProductCategory.MobileApp]: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4" }),
  [ProductCategory.Script]: /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode2, { className: "h-4 w-4" }),
  [ProductCategory.Template]: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutTemplate, { className: "h-4 w-4" }),
  [ProductCategory.Plugin]: /* @__PURE__ */ jsxRuntimeExports.jsx(Puzzle, { className: "h-4 w-4" })
};
const CATEGORY_GRADIENTS = {
  [ProductCategory.WebApp]: "from-indigo-500/20 to-violet-500/10",
  [ProductCategory.MobileApp]: "from-sky-500/20 to-cyan-500/10",
  [ProductCategory.Script]: "from-emerald-500/20 to-teal-500/10",
  [ProductCategory.Template]: "from-orange-500/20 to-amber-500/10",
  [ProductCategory.Plugin]: "from-rose-500/20 to-pink-500/10"
};
function formatPrice(priceUsd) {
  return `$${Number(priceUsd).toFixed(2)}`;
}
function ProductCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-video w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28 rounded-lg" })
      ] })
    ] })
  ] });
}
function ProductCard({
  product,
  index
}) {
  const gradient = CATEGORY_GRADIENTS[product.category] ?? "from-primary/20 to-primary/5";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.35 },
      className: "h-full",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "card-hover overflow-hidden bg-card border-border group h-full flex flex-col",
          "data-ocid": `products.item.${index + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-video bg-muted relative overflow-hidden shrink-0", children: [
              product.previewImageBlob ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: product.previewImageBlob.getDirectURL(),
                  alt: product.title,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground/30 scale-[2.5]", children: CATEGORY_ICONS[product.category] ?? /* @__PURE__ */ jsxRuntimeExports.jsx(CodeXml, { className: "h-10 w-10" }) })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground border border-border text-xs gap-1.5 shadow-subtle", children: [
                CATEGORY_ICONS[product.category],
                product.category
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex flex-col flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1 text-base", children: product.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-3 flex-1 leading-relaxed", children: product.description }),
              product.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 mb-4", children: [
                product.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-xs px-2 py-0",
                    children: tag
                  },
                  tag
                )),
                product.tags.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs px-2 py-0", children: [
                  "+",
                  product.tags.length - 3
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-accent", children: formatPrice(product.priceUsd) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/products/$id",
                    params: { id: product.id.toString() },
                    "data-ocid": `products.view_details_link.${index + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "default",
                        size: "sm",
                        className: "h-9 text-xs px-4 gap-1.5 transition-smooth",
                        children: "View Details"
                      }
                    )
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function ProductsPage() {
  const { data: products, isLoading } = useListProducts();
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const filtered = reactExports.useMemo(() => {
    if (!products) return [];
    return products.filter((p) => p.isActive).filter(
      (p) => activeCategory === "all" ? true : p.category === activeCategory
    ).filter(
      (p) => search.trim() === "" ? true : p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    );
  }, [products, search, activeCategory]);
  const activeCount = (products == null ? void 0 : products.filter((p) => p.isActive).length) ?? 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fade-in", "data-ocid": "products.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-display font-bold text-foreground mb-2", children: "All Projects" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: isLoading ? "Loading products..." : `${activeCount} premium digital product${activeCount !== 1 ? "s" : ""} available` })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-7xl mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search by title, description or tag…",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              "data-ocid": "products.search_input",
              className: "pl-10 h-11 bg-background"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 overflow-x-auto pb-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4 text-muted-foreground mr-2 shrink-0" }),
          CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: activeCategory === cat.value ? "default" : "ghost",
              size: "sm",
              onClick: () => setActiveCategory(cat.value),
              "data-ocid": `products.filter.${cat.value}`,
              className: "h-9 shrink-0",
              children: cat.label
            },
            cat.value
          ))
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: Array.from({ length: 6 }, (_, i) => `skel-product-${i}`).map(
        (key) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCardSkeleton, {}, key)
      ) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "text-center py-24 flex flex-col items-center gap-4",
          "data-ocid": "products.empty_state",
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.3 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "h-9 w-9 text-muted-foreground/50" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-semibold text-foreground mb-1", children: "No products found" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: search ? `No results for "${search}". Try different keywords.` : "No products in this category yet. Check back soon!" })
            ] }),
            (search || activeCategory !== "all") && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => {
                  setSearch("");
                  setActiveCategory("all");
                },
                className: "mt-2",
                "data-ocid": "products.clear_filters_button",
                children: "Clear filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
          "data-ocid": "products.list",
          children: filtered.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProductCard,
            {
              product,
              index: i
            },
            product.id.toString()
          ))
        }
      )
    ] })
  ] });
}
export {
  ProductsPage as default
};
