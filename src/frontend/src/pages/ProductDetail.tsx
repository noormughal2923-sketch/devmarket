import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useGetProduct } from "@/hooks/useBackend";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Code2,
  Download,
  FileCode2,
  FileDown,
  LayoutTemplate,
  Lock,
  Puzzle,
  Shield,
  ShoppingCart,
  Smartphone,
  Tag,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  WebApp: <Code2 className="h-5 w-5" />,
  MobileApp: <Smartphone className="h-5 w-5" />,
  Script: <FileCode2 className="h-5 w-5" />,
  Template: <LayoutTemplate className="h-5 w-5" />,
  Plugin: <Puzzle className="h-5 w-5" />,
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  WebApp: "from-indigo-500/20 to-violet-500/10",
  MobileApp: "from-sky-500/20 to-cyan-500/10",
  Script: "from-emerald-500/20 to-teal-500/10",
  Template: "from-orange-500/20 to-amber-500/10",
  Plugin: "from-rose-500/20 to-pink-500/10",
};

function formatPrice(priceUsd: bigint): string {
  return `$${Number(priceUsd).toFixed(2)}`;
}

function DetailSkeleton() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <Skeleton className="h-5 w-48 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Skeleton className="aspect-video rounded-xl" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          <Skeleton className="h-12 w-32 mt-4 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams({ from: "/products/$id" });
  const productId = BigInt(id);
  const { data: product, isLoading } = useGetProduct(productId);
  const { addItem, hasItem } = useCart();
  const inCart = product ? hasItem(product.id) : false;

  if (isLoading) {
    return <DetailSkeleton />;
  }

  if (!product) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4"
        data-ocid="product_detail.error_state"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-2">
          <Code2 className="h-7 w-7 text-muted-foreground/50" />
        </div>
        <h2 className="text-2xl font-display font-bold text-foreground">
          Product Not Found
        </h2>
        <p className="text-muted-foreground max-w-xs">
          This product may have been removed or the link is invalid.
        </p>
        <Link to="/products">
          <Button
            variant="outline"
            className="gap-2 mt-2"
            data-ocid="product_detail.back_link"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const gradient =
    CATEGORY_GRADIENTS[product.category] ?? "from-primary/20 to-primary/5";

  return (
    <motion.div
      className="fade-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      data-ocid="product_detail.page"
    >
      {/* Breadcrumb bar */}
      <div className="bg-card border-b border-border py-3">
        <div className="container max-w-5xl mx-auto px-4">
          <nav
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="hover:text-foreground transition-colors"
              data-ocid="product_detail.home_breadcrumb"
            >
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              to="/products"
              className="hover:text-foreground transition-colors"
              data-ocid="product_detail.products_breadcrumb"
            >
              Products
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {/* Preview image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="aspect-video rounded-xl overflow-hidden bg-muted shadow-elevated"
          >
            {product.previewImageBlob ? (
              <img
                src={product.previewImageBlob.getDirectURL()}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient}`}
              >
                <div className="text-foreground/20 scale-[3]">
                  {CATEGORY_ICONS[product.category] ?? (
                    <Code2 className="h-12 w-12" />
                  )}
                </div>
              </div>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex flex-col"
          >
            {/* Category badge */}
            <Badge className="self-start mb-4 bg-primary/10 text-primary border border-primary/20 gap-1.5 px-3 py-1">
              {CATEGORY_ICONS[product.category]}
              {product.category}
            </Badge>

            <h1 className="text-3xl font-display font-bold text-foreground mb-3 leading-tight">
              {product.title}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-4">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="gap-1 text-xs"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span
                className="text-5xl font-bold text-accent leading-none"
                data-ocid="product_detail.price"
              >
                {formatPrice(product.priceUsd)}
              </span>
              <span className="text-muted-foreground text-sm">
                USD · one-time
              </span>
            </div>

            {/* CTA */}
            <div className="flex gap-3 flex-wrap">
              <Button
                type="button"
                size="lg"
                onClick={() =>
                  addItem({
                    productId: product.id,
                    title: product.title,
                    priceUsd: product.priceUsd,
                    category: product.category,
                    previewImageUrl: product.previewImageBlob?.getDirectURL(),
                  })
                }
                disabled={inCart}
                data-ocid="product_detail.add_to_cart_button"
                className="gap-2 flex-1 md:flex-none min-w-[160px]"
              >
                {inCart ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <ShoppingCart className="h-5 w-5" />
                )}
                {inCart ? "In Cart" : "Add to Cart"}
              </Button>
              {inCart && (
                <Link to="/cart">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    data-ocid="product_detail.view_cart_button"
                    className="gap-2"
                  >
                    View Cart
                  </Button>
                </Link>
              )}
            </div>

            {/* Trust indicators */}
            <Separator className="my-6" />
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: <Shield className="h-4 w-4" />,
                  text: "Admin-verified payment",
                },
                {
                  icon: <Lock className="h-4 w-4" />,
                  text: "Secure download link",
                },
                { icon: <Zap className="h-4 w-4" />, text: "Instant delivery" },
                {
                  icon: <Download className="h-4 w-4" />,
                  text: "Lifetime access",
                },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary shrink-0">{badge.icon}</span>
                  {badge.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* About section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Card className="bg-card border-border p-7">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">
              About this product
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </Card>

          {/* Digital Download Info */}
          <Card
            className="bg-card border-border p-7"
            data-ocid="product_detail.download_info"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <FileDown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-1">
                  Digital Download Included
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  After your payment is verified by an admin, you will receive a
                  secure, time-limited download link for this product. All files
                  are delivered digitally — no physical shipment. Downloads are
                  tied to your account and expire after use.
                </p>
                <div className="flex flex-wrap gap-3 mt-4">
                  {[
                    {
                      icon: <Lock className="h-3.5 w-3.5" />,
                      label: "Tokenised link",
                    },
                    {
                      icon: <Shield className="h-3.5 w-3.5" />,
                      label: "Account-bound",
                    },
                    {
                      icon: <Zap className="h-3.5 w-3.5" />,
                      label: "Fast delivery",
                    },
                  ].map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1.5 text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full border border-border"
                    >
                      <span className="text-primary">{item.icon}</span>
                      {item.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
