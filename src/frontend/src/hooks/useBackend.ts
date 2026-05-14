import { createActor } from "@/backend";
import type {
  AdminAuditLog,
  DashboardStats,
  DownloadTokenView,
  ExternalBlob,
  OrderId,
  OrderView,
  ProductId,
  ProductView,
  UserProfile,
} from "@/types/marketplace";
import { PaymentMethod, ProductCategory, UserRole } from "@/types/marketplace";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export { PaymentMethod, ProductCategory, UserRole };

// ── Core actor hook ──────────────────────────────────────────────────────────
export function useBackendActor() {
  return useActor(createActor);
}

// ── Products ─────────────────────────────────────────────────────────────────
export function useListProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProductView[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useGetProduct(id: ProductId | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProductView | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
    staleTime: 60_000,
  });
}

// ── User Profile ─────────────────────────────────────────────────────────────
export function useCallerProfile() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  const query = useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    retry: false,
  });
  return {
    ...query,
    isLoading: isFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerProfile() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, UserProfile>({
    mutationFn: async (profile) => {
      if (!actor) throw new Error("Actor not available");
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["callerProfile"] }),
  });
}

// ── Orders ────────────────────────────────────────────────────────────────────
export function useListMyOrders() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<OrderView[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyOrders();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 30_000,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    OrderId,
    Error,
    {
      productId: ProductId;
      paymentMethod: PaymentMethod;
      paymentProofBlob: ExternalBlob | null;
    }
  >({
    mutationFn: async ({ productId, paymentMethod, paymentProofBlob }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.placeOrder(productId, paymentMethod, paymentProofBlob);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myOrders"] }),
  });
}

export function useSubmitPaymentProof() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { orderId: OrderId; paymentProofBlob: ExternalBlob }
  >({
    mutationFn: async ({ orderId, paymentProofBlob }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitPaymentProof(orderId, paymentProofBlob);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myOrders"] }),
  });
}

// ── Download tokens ──────────────────────────────────────────────────────────
export function useListMyDownloadTokens() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<DownloadTokenView[]>({
    queryKey: ["myDownloadTokens"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyDownloadTokens();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 30_000,
  });
}

export function useRedeemDownloadToken() {
  const { actor } = useActor(createActor);
  return useMutation<ExternalBlob | null, Error, string>({
    mutationFn: async (token) => {
      if (!actor) throw new Error("Actor not available");
      return actor.redeemDownloadToken(token);
    },
  });
}

// ── Admin ──────────────────────────────────────────────────────────────────
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
    staleTime: 120_000,
    retry: false,
  });
}

export function useAdminDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats>({
    queryKey: ["adminStats"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.adminDashboardStats();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAdminListOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<OrderView[]>({
    queryKey: ["adminOrders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListOrders();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAdminApproveOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<string, Error, OrderId>({
    mutationFn: async (orderId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.adminApproveOrder(orderId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminOrders"] });
      qc.invalidateQueries({ queryKey: ["adminStats"] });
    },
  });
}

export function useAdminRejectOrder() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { orderId: OrderId; reason: string }>({
    mutationFn: async ({ orderId, reason }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.adminRejectOrder(orderId, reason);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["adminOrders"] });
      qc.invalidateQueries({ queryKey: ["adminStats"] });
    },
  });
}

export function useAdminListAuditLogs() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<AdminAuditLog[]>({
    queryKey: ["auditLogs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.adminListAuditLogs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useAdminSetProductActive() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, { id: ProductId; isActive: boolean }>({
    mutationFn: async ({ id, isActive }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.adminSetProductActive(id, isActive);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useAdminCreateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    ProductId,
    Error,
    {
      title: string;
      description: string;
      priceUsd: bigint;
      category: ProductCategory;
      tags: string[];
      previewImageBlob: ExternalBlob | null;
      fileStorageBlob: ExternalBlob | null;
    }
  >({
    mutationFn: async ({
      title,
      description,
      priceUsd,
      category,
      tags,
      previewImageBlob,
      fileStorageBlob,
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.adminCreateProduct(
        title,
        description,
        priceUsd,
        category,
        tags,
        previewImageBlob,
        fileStorageBlob,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useAdminUpdateProduct() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    {
      id: ProductId;
      title: string;
      description: string;
      priceUsd: bigint;
      category: ProductCategory;
      tags: string[];
      previewImageBlob: ExternalBlob | null;
      fileStorageBlob: ExternalBlob | null;
    }
  >({
    mutationFn: async ({
      id,
      title,
      description,
      priceUsd,
      category,
      tags,
      previewImageBlob,
      fileStorageBlob,
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.adminUpdateProduct(
        id,
        title,
        description,
        priceUsd,
        category,
        tags,
        previewImageBlob,
        fileStorageBlob,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useAdminSetUserBlocked() {
  const { actor } = useActor(createActor);
  return useMutation<void, Error, { user: Principal; blocked: boolean }>({
    mutationFn: async ({ user, blocked }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.adminSetUserBlocked(user, blocked);
    },
  });
}

export function useAdminSeedProducts() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      await actor.adminSeedProducts();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}
