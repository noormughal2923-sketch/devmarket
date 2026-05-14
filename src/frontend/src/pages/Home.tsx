import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useListProducts } from "@/hooks/useBackend";
import { ProductCategory } from "@/types/marketplace";
import type { ProductView } from "@/types/marketplace";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Code2,
  Download,
  FileCode2,
  Github,
  Globe,
  Layout,
  Mail,
  MessageCircle,
  Puzzle,
  Search,
  Shield,
  ShoppingCart,
  Smartphone,
  Star,
  TrendingUp,
  Twitter,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

// ── Category helpers ──────────────────────────────────────────────────────────
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  [ProductCategory.WebApp]: <Code2 className="h-4 w-4" />,
  [ProductCategory.MobileApp]: <Smartphone className="h-4 w-4" />,
  [ProductCategory.Script]: <FileCode2 className="h-4 w-4" />,
  [ProductCategory.Template]: <Layout className="h-4 w-4" />,
  [ProductCategory.Plugin]: <Puzzle className="h-4 w-4" />,
};

// ── Static data ───────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Verified Products",
    description:
      "Every product is reviewed by our team for quality and security before listing.",
  },
  {
    icon: <Download className="h-6 w-6" />,
    title: "Secure Downloads",
    description:
      "Tokenized, expiring download links released only after payment approval.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Fast Support",
    description:
      "Dedicated support team responds within hours. We're here when you need us.",
  },
];

const TESTIMONIALS = [
  {
    name: "Hamza Raza",
    role: "Full Stack Developer",
    text: "Incredible quality projects. The checkout process is smooth and payment verification is fast. Got my download link within hours!",
    rating: 5,
  },
  {
    name: "Ayesha Malik",
    role: "Frontend Engineer",
    text: "DevMarket has the best collection of React templates I've seen. Premium code, clean architecture, worth every rupee.",
    rating: 5,
  },
  {
    name: "Usman Khan",
    role: "Startup Founder",
    text: "Saved weeks of development time with their mobile app template. Admin panel is rock solid and the support is excellent.",
    rating: 5,
  },
];

const FAQS = [
  {
    q: "How does payment verification work?",
    a: "Place your order, upload a screenshot of your JazzCash or ABL transfer, and our team manually verifies within 24 hours. You'll receive a secure download link once approved.",
  },
  {
    q: "Are download links permanent?",
    a: "Download links are tokenized and expire after a set time for security. You can always generate a new link from your Orders page.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept JazzCash mobile wallet transfers and Allied Bank Limited (ABL) account transfers. Payment details are shown at checkout.",
  },
  {
    q: "Can I get a refund?",
    a: "Due to the digital nature of products, refunds are only considered if the file is corrupt or doesn't match the description. Contact support within 48 hours of purchase.",
  },
  {
    q: "Is my account information secure?",
    a: "Yes. We use Internet Identity for authentication — no passwords stored. All sessions are cryptographically secured and your data never leaves our encrypted canister.",
  },
];

const FOOTER_LINKS = [
  { label: "Products", to: "/products" },
  { label: "Cart", to: "/cart" },
  { label: "Orders", to: "/orders" },
];

// ── Sub-components ────────────────────────────────────────────────────────────
function ProductCard({
  product,
  index,
  compact = false,
}: {
  product: ProductView;
  index: number;
  compact?: boolean;
}) {
  const { addItem, hasItem } = useCart();
  const inCart = hasItem(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={compact ? "w-64 shrink-0" : ""}
    >
      <Card
        className="card-hover overflow-hidden border-border bg-card group h-full"
        data-ocid={`product.card.${index + 1}`}
      >
        <div
          className={`${compact ? "aspect-[4/3]" : "aspect-video"} bg-muted relative overflow-hidden`}
        >
          {product.previewImageBlob ? (
            <img
              src={product.previewImageBlob.getDirectURL()}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
              <div className="text-primary/40 scale-150">
                {CATEGORY_ICONS[product.category] ?? (
                  <Code2 className="h-10 w-10" />
                )}
              </div>
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm text-foreground border border-border text-xs">
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-display font-semibold text-foreground mb-1.5 line-clamp-1 group-hover:text-primary transition-colors text-sm">
            {product.title}
          </h3>
          {!compact && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-base font-bold text-accent">
              ${Number(product.priceUsd)}
            </span>
            <div className="flex gap-1.5">
              <Link to="/products/$id" params={{ id: product.id.toString() }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-7 px-2"
                  data-ocid={`product.view_button.${index + 1}`}
                >
                  Details
                </Button>
              </Link>
              <Button
                size="sm"
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
                data-ocid={`product.add_to_cart_button.${index + 1}`}
                className="text-xs h-7 px-2 gap-1"
              >
                <ShoppingCart className="h-3 w-3" />
                {inCart ? "Added" : "Add"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function AvatarInitials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  // Deterministic hue from name
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  return (
    <div
      className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground shrink-0"
      style={{ background: `oklch(0.55 0.18 ${hue})` }}
    >
      {initials}
    </div>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
    >
      <Card
        className="bg-card border-border overflow-hidden cursor-pointer hover:border-primary/30 transition-smooth"
        onClick={() => setOpen((v) => !v)}
        data-ocid={`faq.item.${index + 1}`}
      >
        <div className="flex items-center justify-between gap-4 p-5">
          <h3 className="font-display font-semibold text-foreground text-sm md:text-base">
            {q}
          </h3>
          <div
            className={`shrink-0 h-6 w-6 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-transform duration-300 ${
              open ? "rotate-180 border-primary text-primary" : ""
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 4l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {open && (
          <div className="px-5 pb-5">
            <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { data: products, isLoading } = useListProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);

  const activeProducts = products?.filter((p) => p.isActive) ?? [];
  const featured = activeProducts.slice(0, 6);
  const trending = activeProducts.slice(0, 10);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  return (
    <div className="fade-in">
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden min-h-[90vh] flex items-center"
        data-ocid="hero.section"
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/generated/hero-marketplace.dim_1400x700.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30 dark:opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/50 to-primary/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-24 right-1/4 w-96 h-96 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-24 left-1/3 w-64 h-64 rounded-full bg-accent/6 blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 relative z-10 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 px-4 py-1.5 text-sm bg-primary/15 text-primary border border-primary/30 gap-2">
                <Zap className="h-3.5 w-3.5" fill="currentColor" />
                Premium Digital Marketplace
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              Discover <span className="text-primary">Premium</span>
              <br />
              Digital Projects
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Browse curated web apps, mobile templates, scripts and plugins.
              Buy, verify payment via JazzCash &amp; ABL, and download securely.
            </motion.p>

            {/* Search bar */}
            <motion.form
              onSubmit={handleSearch}
              className="flex gap-2 mb-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects, templates, scripts…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-card/80 backdrop-blur-sm border-border text-sm"
                  data-ocid="hero.search_input"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 px-6 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shrink-0"
                data-ocid="hero.search_button"
              >
                Search
              </Button>
            </motion.form>

            <motion.div
              className="flex flex-wrap gap-3 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <Link to="/products">
                <Button
                  size="lg"
                  data-ocid="hero.browse_products_button"
                  className="h-12 px-8 text-base font-semibold gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                >
                  Browse Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/orders">
                <Button
                  variant="outline"
                  size="lg"
                  data-ocid="hero.my_orders_button"
                  className="h-12 px-8 text-base font-semibold rounded-xl border-border hover:bg-muted transition-smooth"
                >
                  My Orders
                </Button>
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-border/40 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              {[
                { value: "50+", label: "Premium Products" },
                { value: "99%", label: "Satisfaction Rate" },
                { value: "<24h", label: "Avg. Approval Time" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-display font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section
        className="bg-muted/30 py-20 border-y border-border"
        data-ocid="featured.section"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Featured Projects
              </h2>
              <p className="text-muted-foreground">
                Handpicked premium digital products
              </p>
            </div>
            <Link to="/products">
              <Button
                variant="ghost"
                className="gap-2 text-primary"
                data-ocid="featured.view_all_link"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(
                { length: 6 },
                (_, i) => `skeleton-featured-${i}`,
              ).map((key) => (
                <Skeleton key={key} className="h-72 rounded-xl" />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="featured.empty_state"
            >
              No products available yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Trending ── */}
      <section className="bg-background py-20" data-ocid="trending.section">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Trending Now
              </h2>
              <p className="text-muted-foreground">Most popular this week</p>
            </div>
            <Link to="/products">
              <Button
                variant="ghost"
                className="gap-2 text-primary"
                data-ocid="trending.view_all_link"
              >
                See more <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {Array.from(
                { length: 5 },
                (_, i) => `skeleton-trending-${i}`,
              ).map((key) => (
                <Skeleton key={key} className="h-56 w-64 shrink-0 rounded-xl" />
              ))}
            </div>
          ) : trending.length === 0 ? (
            <div
              className="text-center py-12 text-muted-foreground"
              data-ocid="trending.empty_state"
            >
              No trending products yet.
            </div>
          ) : (
            <div
              className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none" }}
            >
              {trending.map((product, i) => (
                <div key={product.id.toString()} className="snap-start">
                  <ProductCard product={product} index={i} compact />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Why Us / Features ── */}
      <section
        className="bg-muted/30 py-20 border-y border-border"
        data-ocid="features.section"
      >
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Why Choose DevMarket?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for developers who need secure, reliable digital product
              delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Card className="bg-card border-border p-6 h-full hover:border-primary/30 transition-smooth group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:bg-primary/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-background py-20" data-ocid="testimonials.section">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              What Developers Say
            </h2>
            <p className="text-muted-foreground">
              Trusted by developers across Pakistan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: i === 1 ? 0 : i === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
              >
                <Card
                  className="bg-card border-border p-6 h-full"
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from(
                      { length: t.rating },
                      (_, j) => `star-${t.name}-${j}`,
                    ).map((key) => (
                      <Star
                        key={key}
                        className="h-4 w-4 text-accent fill-accent"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <AvatarInitials name={t.name} />
                    <div>
                      <div className="font-semibold text-sm text-foreground">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="bg-muted/30 py-20 border-y border-border"
        data-ocid="faq.section"
      >
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">
              FAQs
            </h2>
            <p className="text-muted-foreground">
              Common questions about purchasing and downloads
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((item, i) => (
              <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="bg-background py-20"
        data-ocid="contact.section"
      >
        <div className="container max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-bold text-foreground mb-3">
              Get In Touch
            </h2>
            <p className="text-muted-foreground">
              Have a question or need help? We respond within a few hours.
            </p>
          </div>

          {contactSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
              data-ocid="contact.success_state"
            >
              <div className="h-16 w-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Message Sent!
              </h3>
              <p className="text-muted-foreground text-sm">
                Thanks for reaching out. We'll get back to you soon.
              </p>
              <Button
                variant="ghost"
                className="mt-6 text-primary"
                onClick={() => {
                  setContactSent(false);
                  setContactForm({ name: "", email: "", message: "" });
                }}
                data-ocid="contact.send_another_button"
              >
                Send another message
              </Button>
            </motion.div>
          ) : (
            <Card
              className="bg-card border-border p-6 md:p-8"
              data-ocid="contact.card"
            >
              <form onSubmit={handleContact} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-foreground"
                    >
                      Your Name
                    </label>
                    <Input
                      id="contact-name"
                      placeholder="Hamza Raza"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                      className="h-11"
                      data-ocid="contact.name_input"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, email: e.target.value }))
                      }
                      required
                      className="h-11"
                      data-ocid="contact.email_input"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder="Tell us how we can help…"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, message: e.target.value }))
                    }
                    required
                    rows={5}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    data-ocid="contact.message_textarea"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 gap-2 font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                  data-ocid="contact.submit_button"
                >
                  <Mail className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="bg-card border-t border-border"
        data-ocid="footer.section"
      >
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap
                    className="h-4 w-4 text-primary-foreground"
                    fill="currentColor"
                  />
                </div>
                <span className="font-display font-bold text-xl text-foreground">
                  Dev<span className="text-primary">Market</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-5">
                Premium digital marketplace for developers. Browse, purchase,
                and download professional projects with secure manual payment
                verification.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                  data-ocid="footer.twitter_link"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                  data-ocid="footer.github_link"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href="mailto:support@devmarket.pk"
                  aria-label="Email"
                  className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                  data-ocid="footer.email_link"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href="https://devmarket.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Website"
                  className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth"
                  data-ocid="footer.website_link"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">
                Marketplace
              </h4>
              <ul className="flex flex-col gap-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-semibold text-foreground mb-4">
                Legal
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                  { label: "Refund Policy", href: "#" },
                  { label: "Contact Us", href: "#contact" },
                ].map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} DevMarket. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
