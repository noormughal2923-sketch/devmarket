import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useListProducts } from "@/hooks/useBackend";
import { ProductCategory } from "@/types/marketplace";
import type { ProductView } from "@/types/marketplace";
import { Link } from "@tanstack/react-router";
import {
  Code2,
  FileCode2,
  LayoutTemplate,
  PackageSearch,
  Puzzle,
  Search,
  SlidersHorizontal,
  Smartphone,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: ProductCategory.WebApp, label: "Web Apps" },
  { value: ProductCategory.MobileApp, label: "Mobile" },
  { value: ProductCategory.Script, label: "Scripts" },
  { value: ProductCategory.Template, label: "Templates" },
  { value: ProductCategory.Plugin, label: "Plugins" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  [ProductCategory.WebApp]: <Code2 className="h-4 w-4" />,
  [ProductCategory.MobileApp]: <Smartphone className="h-4 w-4" />,
  [ProductCategory.Script]: <FileCode2 className="h-4 w-4" />,
  [ProductCategory.Template]: <LayoutTemplate className="h-4 w-4" />,
  [ProductCategory.Plugin]: <Puzzle className="h-4 w-4" />,
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  [ProductCategory.WebApp]: "from-indigo-500/20 to-violet-500/10",
  [ProductCategory.MobileApp]: "from-sky-500/20 to-cyan-500/10",
  [ProductCategory.Script]: "from-emerald-500/20 to-teal-500/10",
  [ProductCategory.Template]: "from-orange-500/20 to-amber-500/10",
  [ProductCategory.Plugin]: "from-rose-500/20 to-pink-500/10",
};

function formatPrice(priceUsd: bigint): string {
  return `$${Number(priceUsd).toFixed(2)}`;
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <Skeleton className="aspect-video w-full" />
      <div className="p-5 flex flex-col gap-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  index,
}: { product: ProductView; index: number }) {
  const gradient =
    CATEGORY_GRADIENTS[product.category] ?? "from-primary/20 to-primary/5";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="h-full"
    >
      <Card
        className="card-hover overflow-hidden bg-card border-border group h-full flex flex-col"
        data-ocid={`products.item.${index + 1}`}
      >
        {/* Thumbnail */}
        <div className="aspect-video bg-muted relative overflow-hidden shrink-0">
          {product.previewImageBlob ? (
            <img
              src={product.previewImageBlob.getDirectURL()}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}
            >
              <div className="text-foreground/30 scale-[2.5]">
                {CATEGORY_ICONS[product.category] ?? (
                  <Code2 className="h-10 w-10" />
                )}
              </div>
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground border border-border text-xs gap-1.5 shadow-subtle">
            {CATEGORY_ICONS[product.category]}
            {product.category}
          </Badge>
        </div>

        <CardContent className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1 text-base">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1 leading-relaxed">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 py-0"
                >
                  {tag}
                </Badge>
              ))}
              {product.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0">
                  +{product.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="text-xl font-bold text-accent">
              {formatPrice(product.priceUsd)}
            </span>
            <Link
              to="/products/$id"
              params={{ id: product.id.toString() }}
              data-ocid={`products.view_details_link.${index + 1}`}
            >
              <Button
                variant="default"
                size="sm"
                className="h-9 text-xs px-4 gap-1.5 transition-smooth"
              >
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProductsPage() {
  const { data: products, isLoading } = useListProducts();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (!products) return [];
    return products
      .filter((p) => p.isActive)
      .filter((p) =>
        activeCategory === "all" ? true : p.category === activeCategory,
      )
      .filter((p) =>
        search.trim() === ""
          ? true
          : p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
      );
  }, [products, search, activeCategory]);

  const activeCount = products?.filter((p) => p.isActive).length ?? 0;

  return (
    <div className="fade-in" data-ocid="products.page">
      {/* Header banner */}
      <div className="bg-card border-b border-border py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              All Projects
            </h1>
            <p className="text-muted-foreground">
              {isLoading
                ? "Loading products..."
                : `${activeCount} premium digital product${activeCount !== 1 ? "s" : ""} available`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by title, description or tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="products.search_input"
              className="pl-10 h-11 bg-background"
            />
          </div>
          <div className="flex items-center gap-1 overflow-x-auto pb-1 shrink-0">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
            {CATEGORIES.map((cat) => (
              <Button
                key={cat.value}
                type="button"
                variant={activeCategory === cat.value ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(cat.value)}
                data-ocid={`products.filter.${cat.value}`}
                className="h-9 shrink-0"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }, (_, i) => `skel-product-${i}`).map(
              (key) => (
                <ProductCardSkeleton key={key} />
              ),
            )}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            className="text-center py-24 flex flex-col items-center gap-4"
            data-ocid="products.empty_state"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <PackageSearch className="h-9 w-9 text-muted-foreground/50" />
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                No products found
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {search
                  ? `No results for "${search}". Try different keywords.`
                  : "No products in this category yet. Check back soon!"}
              </p>
            </div>
            {(search || activeCategory !== "all") && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
                className="mt-2"
                data-ocid="products.clear_filters_button"
              >
                Clear filters
              </Button>
            )}
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="products.list"
          >
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
