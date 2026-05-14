import { AdminRoute } from "@/components/AdminRoute";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const HomePage = lazy(() => import("@/pages/Home"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const ProductDetailPage = lazy(() => import("@/pages/ProductDetail"));
const CartPage = lazy(() => import("@/pages/Cart"));
const CheckoutPage = lazy(() => import("@/pages/Checkout"));
const OrdersPage = lazy(() => import("@/pages/Orders"));
const ProfilePage = lazy(() => import("@/pages/Profile"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminLogs = lazy(() => import("@/pages/admin/AdminLogs"));

function PageLoader() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-4xl mx-auto mt-8">
      <Skeleton className="h-10 w-72" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-4/5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {Array.from({ length: 6 }, (_, i) => `skeleton-page-${i}`).map(
          (key) => (
            <Skeleton key={key} className="h-48 w-full rounded-xl" />
          ),
        )}
      </div>
    </div>
  );
}

// ── Route tree ────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
  notFoundComponent: () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
      <h1 className="text-6xl font-display font-bold text-primary">404</h1>
      <h2 className="text-2xl font-display font-semibold text-foreground">
        Page Not Found
      </h2>
      <p className="text-muted-foreground max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth"
      >
        Back to Home
      </Link>
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <HomePage />,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: () => <ProductsPage />,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products/$id",
  component: () => <ProductDetailPage />,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => <CartPage />,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

// Admin routes — hidden path, role-protected
const adminBaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/x7k9m-admin",
  component: () => (
    <AdminRoute>
      <Outlet />
    </AdminRoute>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminBaseRoute,
  path: "/",
  component: () => <AdminDashboard />,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => adminBaseRoute,
  path: "/products",
  component: () => <AdminProducts />,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => adminBaseRoute,
  path: "/orders",
  component: () => <AdminOrders />,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminBaseRoute,
  path: "/users",
  component: () => <AdminUsers />,
});

const adminLogsRoute = createRoute({
  getParentRoute: () => adminBaseRoute,
  path: "/logs",
  component: () => <AdminLogs />,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  ordersRoute,
  profileRoute,
  adminBaseRoute.addChildren([
    adminIndexRoute,
    adminProductsRoute,
    adminOrdersRoute,
    adminUsersRoute,
    adminLogsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ThemeProvider>
  );
}
