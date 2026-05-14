// Re-export backend types for convenience
export type {
  ProductView,
  OrderView,
  DownloadTokenView,
  UserProfile,
  AdminAuditLog,
  ExternalBlob,
  ProductId,
  OrderId,
  DownloadTokenId,
  Timestamp,
  AuditLogId,
} from "@/backend";

export {
  OrderStatus,
  PaymentMethod,
  ProductCategory,
  UserRole,
} from "@/backend";

// UI-layer helper types
export interface CartItem {
  productId: bigint;
  title: string;
  priceUsd: bigint;
  quantity: number;
  previewImageUrl?: string;
  category: string;
}

export interface CartState {
  items: CartItem[];
  totalCount: number;
  totalAmount: bigint;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: number) => void;
  clearCart: () => void;
  hasItem: (productId: bigint) => boolean;
}

export type ThemeMode = "light" | "dark";

export interface ThemeState {
  theme: ThemeMode;
  toggleTheme: () => void;
}

// Dashboard stats shape
export interface DashboardStats {
  totalProducts: bigint;
  totalOrders: bigint;
  pendingOrders: bigint;
  approvedOrders: bigint;
  totalUsers: bigint;
}
