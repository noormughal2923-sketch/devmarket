import { AdminLayout } from "@/components/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

// Users list requires knowing registered principals which is
// not directly exposed via a listAllUsers endpoint in the current backend.
// This page provides a placeholder with clear UI and will be wired
// when the backend exposes a listUsers method.
export default function AdminUsers() {
  return (
    <AdminLayout>
      <div className="fade-in" data-ocid="admin.users.page">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">
            Users
          </h1>
        </div>
        <Card
          className="bg-card border-border p-12 text-center"
          data-ocid="admin.users.empty_state"
        >
          <Users className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            User Management
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            User records are stored on-chain. To look up a specific user, enter
            their Principal ID via the order management view or through the
            backend admin interface.
          </p>
        </Card>
      </div>
    </AdminLayout>
  );
}
