import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate, useLocation } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isInitializing } = useInternetIdentity();
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="flex flex-col gap-4 p-8 max-w-2xl mx-auto mt-20">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" search={{ redirect: location.pathname }} />;
  }

  return <>{children}</>;
}
