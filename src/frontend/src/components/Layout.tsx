import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useCallerProfile } from "@/hooks/useBackend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useLocation } from "@tanstack/react-router";
import {
  LogOut,
  Menu,
  Moon,
  Package,
  ShoppingCart,
  Sun,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-ocid="theme.toggle"
      className="h-9 w-9 rounded-lg transition-smooth hover:bg-muted"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4 text-accent" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

function CartButton() {
  const { totalCount } = useCart();
  return (
    <Link to="/cart" data-ocid="nav.cart_link" className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Cart (${totalCount} items)`}
        className="h-9 w-9 rounded-lg transition-smooth hover:bg-muted"
      >
        <ShoppingCart className="h-4 w-4" />
        {totalCount > 0 && (
          <Badge
            className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground"
            data-ocid="cart.count_badge"
          >
            {totalCount > 9 ? "9+" : totalCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
}

function UserMenu() {
  const { login, clear, isAuthenticated, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const { data: profile } = useCallerProfile();
  const qc = useQueryClient();

  const handleLogout = () => {
    clear();
    qc.clear();
  };

  if (!isAuthenticated) {
    return (
      <Button
        onClick={login}
        disabled={isInitializing || isLoggingIn}
        size="sm"
        data-ocid="auth.sign_in_button"
        className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth rounded-lg"
      >
        {isInitializing
          ? "Loading..."
          : isLoggingIn
            ? "Signing in..."
            : "Sign In"}
      </Button>
    );
  }

  const displayName = profile?.displayName ?? "My Account";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          data-ocid="auth.user_menu_trigger"
          className="gap-2 rounded-lg hover:bg-muted transition-smooth"
        >
          <div className="h-7 w-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
            <span className="text-xs font-bold text-primary">
              {initials || <User className="h-3 w-3" />}
            </span>
          </div>
          <span className="hidden sm:inline text-sm font-medium max-w-24 truncate">
            {displayName}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52"
        data-ocid="auth.user_dropdown"
      >
        <div className="px-3 py-2 border-b border-border">
          <p className="text-sm font-semibold truncate">{displayName}</p>
        </div>
        <DropdownMenuItem asChild>
          <Link
            to="/orders"
            data-ocid="nav.my_orders_link"
            className="flex items-center gap-2 cursor-pointer"
          >
            <Package className="h-4 w-4" />
            My Orders
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to="/profile"
            data-ocid="nav.profile_link"
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          data-ocid="auth.sign_out_button"
          className="text-destructive focus:text-destructive cursor-pointer flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-50 bg-card border-b border-border shadow-subtle"
        data-ocid="header"
      >
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            data-ocid="nav.logo_link"
            className="flex items-center gap-2 font-display font-bold text-xl hover:opacity-90 transition-smooth shrink-0"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap
                className="h-4 w-4 text-primary-foreground"
                fill="currentColor"
              />
            </div>
            <span className="text-foreground">
              Dev<span className="text-primary">Market</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`nav.${link.label.toLowerCase()}_link`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <CartButton />
            <ThemeToggle />
            <div className="hidden md:block">
              <UserMenu />
            </div>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9"
                  aria-label="Open menu"
                  data-ocid="nav.mobile_menu_button"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72"
                data-ocid="nav.mobile_sheet"
              >
                <div className="flex flex-col gap-2 mt-8">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      data-ocid={`nav.mobile_${link.label.toLowerCase()}_link`}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                        location.pathname === link.to
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t border-border pt-4 mt-2">
                    <UserMenu />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border" data-ocid="footer">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
                  <Zap
                    className="h-3.5 w-3.5 text-primary-foreground"
                    fill="currentColor"
                  />
                </div>
                <span className="font-display font-bold text-foreground">
                  Dev<span className="text-primary">Market</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium digital marketplace for developers. Browse, purchase,
                and download professional projects securely.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">
                Marketplace
              </h4>
              <div className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground mb-3">
                Account
              </h4>
              <div className="flex flex-col gap-2">
                <Link
                  to="/orders"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  My Orders
                </Link>
                <Link
                  to="/profile"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Profile
                </Link>
                <Link
                  to="/cart"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cart
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()}. Built with love using{" "}
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
