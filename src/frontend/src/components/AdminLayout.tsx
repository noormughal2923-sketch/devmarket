import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart2,
  FileText,
  LayoutDashboard,
  Package,
  ShoppingCart,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/x7k9m-admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Orders",
    href: "/x7k9m-admin/orders",
    icon: ShoppingCart,
    exact: false,
  },
  {
    label: "Products",
    href: "/x7k9m-admin/products",
    icon: Package,
    exact: false,
  },
  {
    label: "Audit Logs",
    href: "/x7k9m-admin/logs",
    icon: FileText,
    exact: false,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const { location } = useRouterState();
  const pathname = location.pathname;

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-border bg-sidebar flex flex-col">
        {/* Brand */}
        <div className="px-5 pt-6 pb-5">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BarChart2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-sidebar-foreground text-base">
              Admin Panel
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-xs border-destructive/40 text-destructive bg-destructive/5 mt-1"
          >
            Restricted Access
          </Badge>
        </div>

        <Separator className="bg-sidebar-border" />

        {/* Nav */}
        <nav
          className="flex-1 py-4 px-3 space-y-0.5"
          aria-label="Admin navigation"
        >
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                to={item.href}
                data-ocid={`admin.nav.${item.label.toLowerCase().replace(" ", "_")}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Separator className="bg-sidebar-border" />

        {/* Back link */}
        <div className="p-3">
          <Link to="/">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-sidebar-foreground hover:bg-sidebar-accent"
              data-ocid="admin.back_to_site_button"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center px-6 gap-3 shadow-subtle shrink-0">
          <Badge variant="secondary" className="text-xs font-mono">
            Admin Zone
          </Badge>
          <span className="text-muted-foreground text-sm">/</span>
          <span className="text-sm font-medium text-foreground">
            {navItems.find((n) => isActive(n.href, n.exact))?.label ?? "Panel"}
          </span>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
