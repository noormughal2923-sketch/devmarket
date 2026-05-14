import { Skeleton } from "@/components/ui/skeleton";
import { useIsCallerAdmin } from "@/hooks/useBackend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import { ShieldX } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();

  if (isInitializing || adminLoading) {
    return (
      <div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto mt-20">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <ShieldX className="w-16 h-16 text-destructive opacity-60" />
        <h2 className="text-2xl font-display font-bold text-foreground">
          Access Denied
        </h2>
        <p className="text-muted-foreground max-w-sm">
          You do not have permission to access the admin panel.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
